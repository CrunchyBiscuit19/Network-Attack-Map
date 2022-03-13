# Import 3rd Party Libraries
import asyncio
import time
import requests
import json
from math import ceil
import csv
# Loading Country Name and Coordinate Pairs
countries = {row[3].lower(): [float(row[1]), float(row[2])]
             for row in csv.reader(open('Countries.csv'), delimiter=',')}


def elasticsearch_information(request, time_result):
    # Obtain information of logs from Elasticsearch
    try:
        if time_result['all_logs']:
            # Count All Logs in Elasticsearch
            log_info = requests.get('http://elasticsearch:9200/_count')
        else:
            # Count All Logs by time in Elasticsearch
            time_filter = {"query": {"range": {"timestamp": {
                "gte": time_result['start_time'], "lte": time_result['end_time']}}}}
            log_info = requests.get('http://elasticsearch:9200/_count', headers={
                'Content-Type': 'application/json',
            }, data=json.dumps(time_filter))
        log_data_amount = json.loads(log_info.text)["count"]
    except:
        return {"message": "error obtaining log information"}
    # Push obtained information to request session
    if log_data_amount == 0:
        return {"message": "no logs to be animated"}
    else:
        logs_per_request = 10
        request.session['start_time'] = time_result['start_time']
        request.session['end_time'] = time_result['end_time']
        request.session['logs_per_request'] = logs_per_request
        request.session['total_logs'] = log_data_amount
        request.session['total_pages'] = ceil(log_data_amount/logs_per_request)
        request.session['log_data'] = []
        request.session['current_page'] = 1
        request.session['terminate'] = False


async def elasticsearch_request(log_filter, default_coords, default_country):
    # Request Elasticsearch and Format Logs
    log_request = requests.get('http://elasticsearch:9200/_search', headers={
        'Content-Type': 'application/json',
    }, data=json.dumps(log_filter))
    log_data = json.loads(log_request.text)["hits"]["hits"]
    log_data = [entry['_source'] for entry in log_data]
    # Map Country Name to Coordinates
    for entry in log_data:
        try:
            entry["sourceCoordinates"] = countries[entry["sourceCountry"].lower()]
        except:
            entry["sourceCountry"] = default_country
            entry["sourceCoordinates"] = default_coords
        try:
            entry["destCoordinates"] = countries[entry["destCountry"].lower()]
        except:
            entry["destCountry"] = default_country
            entry["destCoordinates"] = default_coords
    return log_data


async def run_async(request):
    # Gather tasks into list and run all tasks asynchronously
    task_list = []
    logs_per_iteration = 50
    # Determine Filtering Method
    if request.session['start_time'] is not None and request.session['end_time'] is not None:
        log_filter = {"from": 0, "size": logs_per_iteration, "query": {"range": {"timestamp": {
            "gte": request.session['start_time'], "lte": request.session['end_time']}}}, "sort": {
            "timestamp": "asc"
        }}
    else:
        log_filter = {"from": 0, "size": logs_per_iteration, "sort": {
            "timestamp": "asc"
        }}
    # Determine Default Country to Map
    try:
        default_coords = countries[request.session["default_country"].lower()]
        default_country = request.session["default_country"]
    # Except No Default Country
    except KeyError:
        default_coords = countries["singapore"]
        default_country = "Singapore"
    # Country Unable to be Mapped
    except:
        default_coords = countries["singapore"]
        default_country = "Singapore"
    # Create tasks based on logs per page to retrieve from elasticsearch
    for index in range(1, request.session['total_logs'], logs_per_iteration):
        log_filter.update({"from": index-1})
        task_list.append(elasticsearch_request(
            log_filter=log_filter.copy(),
            default_coords=default_coords,
            default_country=default_country))
    return await asyncio.gather(*task_list)


def jit_log_fetch(request):
    #Just In Time fetching of logs (Unused Alternate Option)
    logs_per_iteration = request.session['logs_per_request']
    # Determine Filtering Method
    if request.session['start_time'] is not None and request.session['end_time'] is not None:
        log_filter = {"from": 0, "size": logs_per_iteration, "query": {"range": {"timestamp": {
            "gte": request.session['start_time'], "lte": request.session['end_time']}}}, "sort": {
            "timestamp": "asc"
        }}
    else:
        log_filter = {"from": 0, "size": logs_per_iteration, "sort": {
            "timestamp": "asc"
        }}
    # Set the correct indexes
    current_index = (request.session['current_page']-1)*logs_per_iteration-1
    log_filter.update({"from": current_index})
    log_request = requests.get('http://elasticsearch:9200/_search', headers={
        'Content-Type': 'application/json',
    }, data=json.dumps(log_filter))
    # Retrieve Log Data
    log_data = json.loads(log_request.text)["hits"]["hits"]
    log_data = [entry['_source'] for entry in log_data]


def log_fetching_handler(request):
    '''
    Handle the starting of async functions
    '''
    try:
        s = time.perf_counter()
        log_array_2d = asyncio.run(run_async(request))
        for log_array in log_array_2d:
            request.session['log_data'] += log_array
        request.session["time_taken"] = time.perf_counter() - s
    except:
        return {"message": "error retrieving logs"}

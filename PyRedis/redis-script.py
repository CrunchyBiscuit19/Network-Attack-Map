import csv
import redis
import json
from datetime import datetime

r = redis.Redis(host="redis", port=6379, db=0)

print("exporting traffic log(s) to Redis")

with open('/home/network-attack-map/Redis-script/Sample_Threat_Logs.csv') as file:
    readCSV = csv.DictReader(file, delimiter=',')
    for row in readCSV:
        row['Generate Time'] = datetime.strptime(row['Generate Time'], '%Y-%m-%d  %H:%M:%S')
        row['Generate Time'] = row['Generate Time'].isoformat()
        row['protocol'] = row.pop('IP Protocol')
        row['application'] = row.pop('Application')
        row['srcCtry'] = row.pop('Source Country')
        row['sourceIP'] = row.pop('NAT Source IP')
        row['sourcePort'] = row.pop('Source Port')
        row['dstCtry'] = row.pop('Destination Country')
        row['destIP'] = row.pop('NAT Destination IP')
        row['destPort'] = row.pop('Destination Port')

        r.rpush("list", json.dumps(row))
        print(row)


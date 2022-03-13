// React & Defined Components
import React, { ReactElement } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { attackMapActions } from "../../slices/attackMapSlice";
// Axios
import axios from "axios";
import cookieParser from "cookie";
// Material UI
import { Grid, Slider, Switch, Typography, TextField } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { Autocomplete, AutocompleteRenderInputParams } from "@material-ui/lab";
import { CountryInfo } from "../../types/reusable/CountryInfo";
import DateFnsUtils from "@date-io/date-fns";
import { useDrawerSettingsStyles } from "../../styles/drawer/drawerSettingsStyles";
// React Color
import { SketchPicker, ColorResult } from "react-color";

interface Props {}
/**
 * 2 timepickers for users to define a time period to filter from the network logs data.
 * @returns {ReactElement} A component to represent the time filter setting for the Network Attack Map.
 */
const TimeFilter: React.FC<Props> = (): ReactElement => {
    const dispatch = useDispatch();
    const classes = useDrawerSettingsStyles();

    const timeFilterStart: MaterialUiPickersDate = useSelector(
        (state: RootState): MaterialUiPickersDate => state.attackMap.options.timeFilterStart
    );
    const timeFilterEnd: MaterialUiPickersDate = useSelector(
        (state: RootState): MaterialUiPickersDate => state.attackMap.options.timeFilterEnd
    );

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <KeyboardDateTimePicker
                        className={classes.timeFilter}
                        variant="inline" // Prevents dialog popup.
                        clearable
                        ampm={false} // 24hr format.
                        format="yyyy-MM-dd HH:mm:ss"
                        label="Between"
                        value={timeFilterStart}
                        onChange={(time: MaterialUiPickersDate) => dispatch(attackMapActions.setTimeFilterStart(time))}
                    />
                </Grid>
                <Grid item xs={12}>
                    <KeyboardDateTimePicker
                        className={classes.timeFilter}
                        variant="inline" // Prevents dialog popup.
                        clearable
                        ampm={false} // 24hr format.
                        format="yyyy-MM-dd HH:mm:ss"
                        label="And"
                        value={timeFilterEnd}
                        onChange={(time: MaterialUiPickersDate) => dispatch(attackMapActions.setTimeFilterEnd(time))}
                    />
                </Grid>
            </Grid>
        </MuiPickersUtilsProvider>
    );
};

/**
 * A dropdown menu for users to select the default country.
 * @returns {ReactElement} A component to represent the dropdown menu for the Network Attack Map.
 */
const DefaultCountryMenu: React.FC<Props> = (): ReactElement => {
    const countriesInfo: CountryInfo[] = [
        { code: "AF", name: "Afghanistan" },
        { code: "AL", name: "Albania" },
        { code: "DZ", name: "Algeria" },
        { code: "AX", name: "Alland Islands" },
        { code: "AS", name: "American Samoa" },
        { code: "AD", name: "Andorra" },
        { code: "AO", name: "Angola" },
        { code: "AI", name: "Anguilla" },
        { code: "AQ", name: "Antarctica" },
        { code: "AG", name: "Antigua and Barbuda" },
        { code: "AR", name: "Argentina" },
        { code: "AM", name: "Armenia" },
        { code: "AW", name: "Aruba" },
        { code: "AU", name: "Australia" },
        { code: "AT", name: "Austria" },
        { code: "AZ", name: "Azerbaijan" },
        { code: "BS", name: "Bahamas" },
        { code: "BH", name: "Bahrain" },
        { code: "BD", name: "Bangladesh" },
        { code: "BB", name: "Barbados" },
        { code: "BY", name: "Belarus" },
        { code: "BE", name: "Belgium" },
        { code: "BZ", name: "Belize" },
        { code: "BJ", name: "Benin" },
        { code: "BM", name: "Bermuda" },
        { code: "BT", name: "Bhutan" },
        { code: "BO", name: "Bolivia" },
        { code: "BA", name: "Bosnia and Herzegovina" },
        { code: "BW", name: "Botswana" },
        { code: "BV", name: "Bouvet Island" },
        { code: "BR", name: "Brazil" },
        { code: "IO", name: "British Indian Ocean Territory" },
        { code: "VG", name: "British Virgin Islands" },
        { code: "BN", name: "Brunei Darussalam" },
        { code: "BG", name: "Bulgaria" },
        { code: "BF", name: "Burkina Faso" },
        { code: "BI", name: "Burundi" },
        { code: "KH", name: "Cambodia" },
        { code: "CM", name: "Cameroon" },
        { code: "CA", name: "Canada" },
        { code: "CV", name: "Cape Verde" },
        { code: "KY", name: "Cayman Islands" },
        { code: "CF", name: "Central African Republic" },
        { code: "TD", name: "Chad" },
        { code: "CL", name: "Chile" },
        { code: "CN", name: "China" },
        { code: "CX", name: "Christmas Island" },
        { code: "CC", name: "Cocos (Keeling) Islands" },
        { code: "CO", name: "Colombia" },
        { code: "KM", name: "Comoros" },
        { code: "CD", name: "Congo, Democratic Republic of the" },
        { code: "CG", name: "Congo, Republic of the" },
        { code: "CK", name: "Cook Islands" },
        { code: "CR", name: "Costa Rica" },
        { code: "CI", name: "Cote d'Ivoire" },
        { code: "HR", name: "Croatia" },
        { code: "CU", name: "Cuba" },
        { code: "CW", name: "Curacao" },
        { code: "CY", name: "Cyprus" },
        { code: "CZ", name: "Czech Republic" },
        { code: "DK", name: "Denmark" },
        { code: "DJ", name: "Djibouti" },
        { code: "DM", name: "Dominica" },
        { code: "DO", name: "Dominican Republic" },
        { code: "EC", name: "Ecuador" },
        { code: "EG", name: "Egypt" },
        { code: "SV", name: "El Salvador" },
        { code: "GQ", name: "Equatorial Guinea" },
        { code: "ER", name: "Eritrea" },
        { code: "EE", name: "Estonia" },
        { code: "ET", name: "Ethiopia" },
        { code: "FK", name: "Falkland Islands (Malvinas)" },
        { code: "FO", name: "Faroe Islands" },
        { code: "FJ", name: "Fiji" },
        { code: "FI", name: "Finland" },
        { code: "FR", name: "France" },
        { code: "GF", name: "French Guiana" },
        { code: "PF", name: "French Polynesia" },
        { code: "TF", name: "French Southern Territories" },
        { code: "GA", name: "Gabon" },
        { code: "GM", name: "Gambia" },
        { code: "GE", name: "Georgia" },
        { code: "DE", name: "Germany" },
        { code: "GH", name: "Ghana" },
        { code: "GI", name: "Gibraltar" },
        { code: "GR", name: "Greece" },
        { code: "GL", name: "Greenland" },
        { code: "GD", name: "Grenada" },
        { code: "GP", name: "Guadeloupe" },
        { code: "GU", name: "Guam" },
        { code: "GT", name: "Guatemala" },
        { code: "GG", name: "Guernsey" },
        { code: "GN", name: "Guinea" },
        { code: "GW", name: "Guinea-Bissau" },
        { code: "GY", name: "Guyana" },
        { code: "HT", name: "Haiti" },
        { code: "HM", name: "Heard Island and McDonald Islands" },
        { code: "VA", name: "Holy See (Vatican City State)" },
        { code: "HN", name: "Honduras" },
        { code: "HK", name: "Hong Kong" },
        { code: "HU", name: "Hungary" },
        { code: "IS", name: "Iceland" },
        { code: "IN", name: "India" },
        { code: "ID", name: "Indonesia" },
        { code: "IR", name: "Iran, Islamic Republic of" },
        { code: "IQ", name: "Iraq" },
        { code: "IE", name: "Ireland" },
        { code: "IM", name: "Isle of Man" },
        { code: "IL", name: "Israel" },
        { code: "IT", name: "Italy" },
        { code: "JM", name: "Jamaica" },
        { code: "JP", name: "Japan" },
        { code: "JE", name: "Jersey" },
        { code: "JO", name: "Jordan" },
        { code: "KZ", name: "Kazakhstan" },
        { code: "KE", name: "Kenya" },
        { code: "KI", name: "Kiribati" },
        { code: "KP", name: "Korea, Democratic People's Republic of" },
        { code: "KR", name: "Korea, Republic of" },
        { code: "XK", name: "Kosovo" },
        { code: "KW", name: "Kuwait" },
        { code: "KG", name: "Kyrgyzstan" },
        { code: "LA", name: "Lao People's Democratic Republic" },
        { code: "LV", name: "Latvia" },
        { code: "LB", name: "Lebanon" },
        { code: "LS", name: "Lesotho" },
        { code: "LR", name: "Liberia" },
        { code: "LY", name: "Libya" },
        { code: "LI", name: "Liechtenstein" },
        { code: "LT", name: "Lithuania" },
        { code: "LU", name: "Luxembourg" },
        { code: "MO", name: "Macao" },
        { code: "MK", name: "Macedonia, the Former Yugoslav Republic of" },
        { code: "MG", name: "Madagascar" },
        { code: "MW", name: "Malawi" },
        { code: "MY", name: "Malaysia" },
        { code: "MV", name: "Maldives" },
        { code: "ML", name: "Mali" },
        { code: "MT", name: "Malta" },
        { code: "MH", name: "Marshall Islands" },
        { code: "MQ", name: "Martinique" },
        { code: "MR", name: "Mauritania" },
        { code: "MU", name: "Mauritius" },
        { code: "YT", name: "Mayotte" },
        { code: "MX", name: "Mexico" },
        { code: "FM", name: "Micronesia, Federated States of" },
        { code: "MD", name: "Moldova, Republic of" },
        { code: "MC", name: "Monaco" },
        { code: "MN", name: "Mongolia" },
        { code: "ME", name: "Montenegro" },
        { code: "MS", name: "Montserrat" },
        { code: "MA", name: "Morocco" },
        { code: "MZ", name: "Mozambique" },
        { code: "MM", name: "Myanmar" },
        { code: "NA", name: "Namibia" },
        { code: "NR", name: "Nauru" },
        { code: "NP", name: "Nepal" },
        { code: "NL", name: "Netherlands" },
        { code: "NC", name: "New Caledonia" },
        { code: "NZ", name: "New Zealand" },
        { code: "NI", name: "Nicaragua" },
        { code: "NE", name: "Niger" },
        { code: "NG", name: "Nigeria" },
        { code: "NU", name: "Niue" },
        { code: "NF", name: "Norfolk Island" },
        { code: "MP", name: "Northern Mariana Islands" },
        { code: "NO", name: "Norway" },
        { code: "OM", name: "Oman" },
        { code: "PK", name: "Pakistan" },
        { code: "PW", name: "Palau" },
        { code: "PS", name: "Palestine, State of" },
        { code: "PA", name: "Panama" },
        { code: "PG", name: "Papua New Guinea" },
        { code: "PY", name: "Paraguay" },
        { code: "PE", name: "Peru" },
        { code: "PH", name: "Philippines" },
        { code: "PN", name: "Pitcairn" },
        { code: "PL", name: "Poland" },
        { code: "PT", name: "Portugal" },
        { code: "PR", name: "Puerto Rico" },
        { code: "QA", name: "Qatar" },
        { code: "RE", name: "Reunion" },
        { code: "RO", name: "Romania" },
        { code: "RU", name: "Russian Federation" },
        { code: "RW", name: "Rwanda" },
        { code: "BL", name: "Saint Barthelemy" },
        { code: "SH", name: "Saint Helena" },
        { code: "KN", name: "Saint Kitts and Nevis" },
        { code: "LC", name: "Saint Lucia" },
        { code: "MF", name: "Saint Martin (French part)" },
        { code: "PM", name: "Saint Pierre and Miquelon" },
        { code: "VC", name: "Saint Vincent and the Grenadines" },
        { code: "WS", name: "Samoa" },
        { code: "SM", name: "San Marino" },
        { code: "ST", name: "Sao Tome and Principe" },
        { code: "SA", name: "Saudi Arabia" },
        { code: "SN", name: "Senegal" },
        { code: "RS", name: "Serbia" },
        { code: "SC", name: "Seychelles" },
        { code: "SL", name: "Sierra Leone" },
        { code: "SG", name: "Singapore" },
        { code: "SX", name: "Sint Maarten (Dutch part)" },
        { code: "SK", name: "Slovakia" },
        { code: "SI", name: "Slovenia" },
        { code: "SB", name: "Solomon Islands" },
        { code: "SO", name: "Somalia" },
        { code: "ZA", name: "South Africa" },
        { code: "GS", name: "South Georgia and the South Sandwich Islands" },
        { code: "SS", name: "South Sudan" },
        { code: "ES", name: "Spain" },
        { code: "LK", name: "Sri Lanka" },
        { code: "SD", name: "Sudan" },
        { code: "SR", name: "Suriname" },
        { code: "SJ", name: "Svalbard and Jan Mayen" },
        { code: "SZ", name: "Swaziland" },
        { code: "SE", name: "Sweden" },
        { code: "CH", name: "Switzerland" },
        { code: "SY", name: "Syrian Arab Republic" },
        { code: "TW", name: "Taiwan, Province of China" },
        { code: "TJ", name: "Tajikistan" },
        { code: "TH", name: "Thailand" },
        { code: "TL", name: "Timor-Leste" },
        { code: "TG", name: "Togo" },
        { code: "TK", name: "Tokelau" },
        { code: "TO", name: "Tonga" },
        { code: "TT", name: "Trinidad and Tobago" },
        { code: "TN", name: "Tunisia" },
        { code: "TR", name: "Turkey" },
        { code: "TM", name: "Turkmenistan" },
        { code: "TC", name: "Turks and Caicos Islands" },
        { code: "TV", name: "Tuvalu" },
        { code: "VI", name: "US Virgin Islands" },
        { code: "UG", name: "Uganda" },
        { code: "UA", name: "Ukraine" },
        { code: "AE", name: "United Arab Emirates" },
        { code: "GB", name: "United Kingdom" },
        { code: "TZ", name: "United Republic of Tanzania" },
        { code: "US", name: "United States" },
        { code: "UY", name: "Uruguay" },
        { code: "UZ", name: "Uzbekistan" },
        { code: "VU", name: "Vanuatu" },
        { code: "VE", name: "Venezuela" },
        { code: "VN", name: "Vietnam" },
        { code: "WF", name: "Wallis and Futuna" },
        { code: "EH", name: "Western Sahara" },
        { code: "YE", name: "Yemen" },
        { code: "ZM", name: "Zambia" },
        { code: "ZW", name: "Zimbabwe" },
    ];

    return (
        <Autocomplete
            fullWidth
            autoComplete
            autoSelect
            clearOnEscape
            defaultValue={{ code: "SG", name: "Singapore" }}
            getOptionLabel={(countryInfo: CountryInfo) => `${countryInfo.name} (${countryInfo.code})`}
            getOptionSelected={(countryOption: CountryInfo, countryValue: CountryInfo) =>
                countryOption.name === countryValue.name
            }
            onChange={(e: React.ChangeEvent<{}>, newDefaultCountry: CountryInfo | null) => {
                axios
                    .post(
                        "http://localhost:8000/api/files/defaultCty/",
                        {
                            default_country: newDefaultCountry === null ? "Singapore" : newDefaultCountry.name,
                        },
                        {
                            headers: {
                                "X-CSRFToken": cookieParser.parse(document.cookie).csrftoken,
                            },
                        }
                    )
                    .then((res) => {})
                    .catch((err) => {});
            }}
            renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField {...params} label="Choose Default Country" variant="outlined" />
            )}
            renderOption={(countryInfo: CountryInfo) => (
                <React.Fragment>
                    {countryInfo.name} ({countryInfo.code})
                </React.Fragment>
            )}
            options={countriesInfo}
        />
    );
};

/**
 * A slider for users to control the animation speed of the lines on the Network Attack Map.
 * @returns {ReactElement} A component to represent the speed setting for the Network Attack Map.
 */
const SpeedSlider: React.FC<Props> = (): ReactElement => {
    const dispatch = useDispatch();

    const speed: number = useSelector((state: RootState): number => state.attackMap.options.speed);

    return (
        <Slider
            marks
            min={1}
            max={50}
            value={speed}
            valueLabelDisplay="auto" // Marker displays speed when slider is adjusted.
            onChange={(event: React.ChangeEvent<{}>, speed: number | number[]) =>
                dispatch(attackMapActions.setSpeed(speed as number))
            }
        />
    );
};

/**
 * A color picker for users to control the color of the lines on the Network Attack Map.
 * @returns {ReactElement} A component to represent the color setting for the Network Attack Map.
 */
const ColorPicker: React.FC<Props> = (): ReactElement => {
    const dispatch = useDispatch();
    const classes = useDrawerSettingsStyles();

    const rgbColor = useSelector((state: RootState) => state.attackMap.options.color.rgb);

    return (
        <SketchPicker
            className={classes.colorPicker}
            color={rgbColor}
            onChange={(color: ColorResult) => dispatch(attackMapActions.setColor(color))}
        />
    );
};

/**
 * A toggle that shows or hides the tooltips in an attack map animation.
 * @returns {ReactElement} A component to toggle tooltips display.
 */
const TooltipsToggle: React.FC<Props> = (): ReactElement => {
    const dispatch = useDispatch();
    const classes = useDrawerSettingsStyles();

    const showTooltips: boolean = useSelector((state: RootState): boolean => state.attackMap.options.showTooltips);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography className={classes.textSize} variant="body1" display="inline" align="left">
                    Display Annotations
                </Typography>
                <Switch
                    color="primary"
                    checked={showTooltips}
                    onChange={() => dispatch(attackMapActions.setShowTooltips(!showTooltips))}
                />
            </Grid>
        </Grid>
    );
};

export { TimeFilter, DefaultCountryMenu, SpeedSlider, ColorPicker, TooltipsToggle };

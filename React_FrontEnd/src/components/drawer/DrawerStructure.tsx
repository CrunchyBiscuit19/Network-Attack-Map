// React & Defined Components
import React, { ReactElement } from "react";
import { TimeFilter, DefaultCountryMenu, SpeedSlider, ColorPicker, TooltipsToggle } from "./DrawerSettings";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { attackMapActions } from "../../slices/attackMapSlice";
// Material UI
import { Grid, Typography, Accordion, AccordionSummary, AccordionActions, Button } from "@material-ui/core";
import { DrawerSetting } from "../../types/reusable/DrawerSetting";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import { useDrawerStructureStyles } from "../../styles/drawer/drawerStructureStyles";

// Settings to configure Network Attack Map options to be included in drawer.
const drawerSettings: DrawerSetting[] = [
    {
        name: "Time Filter",
        configuration: <TimeFilter />,
    },
    {
        name: "Default Country",
        configuration: <DefaultCountryMenu />,
    },
    {
        name: "Speed",
        configuration: <SpeedSlider />,
    },
    {
        name: "Colour",
        configuration: <ColorPicker />,
    },
    {
        name: "Annotations",
        configuration: <TooltipsToggle />,
    },
];

interface Props {}
/**
 * The main UI elements that allows the user to control the Network Attack Map.
 * @returns {ReactElement} A single component that is to be included inside Material UI's drawer component representing its content.
 */
const DrawerStructure: React.FC<Props> = (): ReactElement => {
    const dispatch = useDispatch();
    const classes = useDrawerStructureStyles();

    const loggedIn: boolean = useSelector((state: RootState): boolean => state.accountInformation.loggedIn);
    const animationStarted: boolean = useSelector(
        (state: RootState): boolean => state.attackMap.animationStatus.animationStarted
    );

    return (
        <Grid className={classes.drawerStructure} container>
            {/* Button to start the Network Attack Map lines animation. */}
            <Grid className={classes.buttonGridItem} item container justify="center" xs={12}>
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disabled={!loggedIn}
                    onClick={(): void => {
                        dispatch(attackMapActions.setAnimationStarted(!animationStarted));
                    }}
                >
                    <Typography variant="h6" color="textPrimary">
                        {!animationStarted ? "START" : "END"}
                    </Typography>
                </Button>
            </Grid>
            {/* Network Attack Map settings included programmatically (from drawerSettings) to avoid repetitive boilerplate code. */}
            {drawerSettings.map(
                (drawerSetting): ReactElement => (
                    <Grid item xs={12} key={drawerSetting.name}>
                        <Accordion
                            className={classes.accordion}
                            classes={{ root: classes.accordion }}
                            defaultExpanded={true}
                            elevation={0}
                        >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">{drawerSetting.name}</Typography>
                            </AccordionSummary>
                            <AccordionActions>{drawerSetting.configuration}</AccordionActions>
                        </Accordion>
                    </Grid>
                )
            )}
        </Grid>
    );
};

export { DrawerStructure };

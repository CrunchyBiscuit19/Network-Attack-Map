// React & Defined Components
import React, { ReactElement } from "react";
// React Router
import { Link } from "react-router-dom";
// Material UI
import { Grid, Typography } from "@material-ui/core";
import { usePageNotFoundStyles } from "../../styles/error/pageNotFoundStyles";

interface Props {}
/**
 * Tells users the page they are on does not exist.
 * @returns {ReactElement} A component displayed separately from the main web application page in error code 404 cases.
 */
const PageNotFound: React.FC<Props> = (): ReactElement => {
    const classes = usePageNotFoundStyles();
    return (
        <Grid className={classes.errorMessage} container>
            <Grid item xs={12} container justify="center">
                <Typography variant="h4">404</Typography>
            </Grid>
            <Grid item xs={12} container justify="center">
                <Typography variant="h6">This page does not exist. Please check the URL.</Typography>
            </Grid>
            <Grid item xs={12} container justify="center">
                <Typography variant="h6">
                    <Link className={classes.mainPageLink} to="/">
                        Return to main page.
                    </Link>
                </Typography>
            </Grid>
        </Grid>
    );
};

export { PageNotFound };

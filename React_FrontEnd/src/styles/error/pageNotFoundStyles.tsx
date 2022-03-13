// Material UI
import { makeStyles, Theme } from "@material-ui/core";

// CSS constants.
const ERROR_MESSAGE_PADDING_TOP: number = 5;
const WHITE = "#FFFFFF";

// Styling options to use for elements within PageNotFound component.
const usePageNotFoundStyles = makeStyles((theme: Theme) => ({
    errorMessage: {
        paddingTop: theme.spacing(ERROR_MESSAGE_PADDING_TOP),
    },
    mainPageLink: {
        color: WHITE,
    },
}));

export { usePageNotFoundStyles };

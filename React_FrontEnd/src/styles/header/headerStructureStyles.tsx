// Material UI
import { makeStyles, Theme } from "@material-ui/core";

// Styling options to use for elements within HeaderStructure component.
const useHeaderStructureStyles = makeStyles((theme: Theme) => ({
    header: {
        zIndex: theme.zIndex.drawer + 1,
    },
}));

export { useHeaderStructureStyles };

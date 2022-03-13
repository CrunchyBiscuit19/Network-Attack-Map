// React
import { ReactElement } from "react";

// For objects representing the tab panel data Material UI's tab-related components need.
interface TabPanelContent {
    name: string;
    title: string;
    component: ReactElement;
}

export type { TabPanelContent };

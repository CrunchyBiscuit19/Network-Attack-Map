// React
import { ReactElement } from "react";

// For objects representing the settings in the drawer to configure the Network Attack Map.
interface DrawerSetting {
    name: string;
    configuration: ReactElement;
}

export type { DrawerSetting };

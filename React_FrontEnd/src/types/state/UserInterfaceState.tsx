interface ThemeOptions {
    darkMode: boolean;
    primaryColor: string;
    secondaryColor: string;
}

interface DrawerOptions {
    open: boolean;
}

interface DialogOptions {
    open: boolean;
    tab: string | null;
}

interface UserInterfaceState {
    themeOptions: ThemeOptions;
    drawerOptions: DrawerOptions;
    accountDialogOptions: DialogOptions;
}

export type { UserInterfaceState };

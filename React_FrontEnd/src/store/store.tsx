// Redux
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { userInterfaceReducer } from "../slices/userInterfaceSlice";
import { attackMapReducer } from "../slices/attackMapSlice";
import { attackTableReducer } from "../slices/attackTableSlice";
import { accountInformationReducer } from "../slices/accountInformationSlice";

// Creates Redux store for state management, using the reducers created in the files in the slices folder.
const store = configureStore({
    reducer: {
        userInterface: userInterfaceReducer,
        attackMap: attackMapReducer,
        accountInformation: accountInformationReducer,
        attackTable: attackTableReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
    }),
});

// Create RootState type to enforce selectors to use store's shape.
type RootState = ReturnType<typeof store.getState>;

export { store };
export type { RootState };

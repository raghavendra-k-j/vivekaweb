import { createContext, useContext, type ReactNode } from "react";
import { SubmitPageStore } from "./submitStore";

const SubmitPageContext = createContext<SubmitPageStore | null>(null);

function SubmitPageProvider({ children }: { children: ReactNode }) {
    const store = new SubmitPageStore();

    return (
        <SubmitPageContext.Provider value={store}>
            {children}
        </SubmitPageContext.Provider>
    );
}

export default SubmitPageProvider;

export const useSubmitPageStore = () => {
    const context = useContext(SubmitPageContext);
    if (!context) {
        throw new Error("useSubmitPageStore must be used within a SubmitPageProvider");
    }
    return context;
};
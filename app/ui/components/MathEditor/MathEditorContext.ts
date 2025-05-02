import { createContext, useContext } from "react";
import type { MathEditorStore } from "./store";
import { Logger } from "~/core/utils/logger";

export const meLogger = new Logger("me");

export const MathEditorContext = createContext<MathEditorStore | null>(null);

export const useMathEditorStore = () => {
    const context = useContext(MathEditorContext);
    if (!context) {
        throw new Error("useMathEditorStore must be used within a MathEditorProvider");
    }
    return context;
};

import { useCallback, useMemo, type ReactNode } from "react";
import { MathInputField } from "./MathInputField";
import { KeyboardView } from "./KeyboardView";
import styles from "./style.module.css";
import type { MathfieldElement } from "mathlive";
import { MathEditorContext, meLogger, useMathEditorStore } from "./MathEditorContext";
import { MathEditorStore } from "./store";


export const MathEditorProvider = ({ children }: { children: ReactNode }) => {
    meLogger.debug('Compoenent: MathEditorProvider');
    const store = useMemo(() => new MathEditorStore(), []);
    return (
        <MathEditorContext.Provider value={store}>
            {children}
        </MathEditorContext.Provider>
    );
};

type MathEditorProps = {
    latexExpr?: LaTeXExpr;
    onSubmit: (value: LaTeXExpr) => void;
};

export function MathEditor(props: MathEditorProps) {
    return (
        <MathEditorProvider>
            <Body />
        </MathEditorProvider>
    );
}


function Body() {
    const store = useMathEditorStore();

    const onReady = useCallback((mf: MathfieldElement) => {
        return store.onMfReady(mf);
    }, [store]);

    return (
        <div className={styles.mathEeditor}>
            <MathInputField onReady={onReady} />
            <KeyboardView />
        </div>
    );
}



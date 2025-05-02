import { Check, ChevronLeft, ChevronRight, Delete } from "lucide-react";
import styles from "./style.module.css";
import type { ReactNode } from "react";
import clsx from "clsx";
import { useMathEditorStore } from "./MathEditorContext";

export function KeyboardFooter() {
    const store = useMathEditorStore();
    return (
        <div className={styles.keyboardFooter}>
            <div className={styles.actions}>
                <ActionButton icon={<ChevronLeft />} onClick={() => store.navigateLeft()} />
                <ActionButton icon={<ChevronRight />} onClick={() => store.navigateRight()} />
                <ActionButton icon={<Delete />} onClick={() => store.backspace()} />
                <DoneButton />
            </div>
        </div>
    );
}


type ActionButtonProps = {
    icon: ReactNode;
    onClick: () => void;
}

function ActionButton(props: ActionButtonProps) {
    return (
        <button className={styles.actionButton} onClick={props.onClick}>
            {props.icon}
        </button>
    );
}

function DoneButton() {
    return (
        <button className={clsx(styles.actionButton, styles.actionDone)} onClick={() => { }}>
            {<Check size={16} />}
            <span>Done</span>
        </button>
    );
}



import KatexRenderer from "~/ui/widgets/katex/KatexRenderer";
import type { KeyItemVm } from "../models/KeyItemVm";
import { useMathEditorStore } from "../MathEditorContext";
import styles from "./../style.module.css";

type KeyItemPropsView = {
    item: KeyItemVm;
}

export function KeyItemView(props: KeyItemPropsView) {
    const store = useMathEditorStore();
    return <div
        onClick={() => store.onKeyPress(props.item)}
        className={styles.key}
    ><KatexRenderer inline={true} tex={props.item.label} />
    </div>;
}
import { CategoriesView } from "./comp/CategoriesView";
import { CategoriesMain } from "./comp/CategoriesMain";
import styles from "./style.module.css";
import { observer } from "mobx-react-lite";
import { KeyboardFooter } from "./KeyboardFooter";
import { useMathEditorStore } from "./MathEditorContext";

export const KeyboardView = observer(function KeyboardView() {
    const store = useMathEditorStore();
    if (!store.hasMf) {
        return null;
    }

    return (<>
        <div className={styles.keyboardConatiner}>
            <div className={styles.keyboard}>
                <CategoriesView />
                <CategoriesMain />
            </div>
            <KeyboardFooter />
        </div>
    </>);
});




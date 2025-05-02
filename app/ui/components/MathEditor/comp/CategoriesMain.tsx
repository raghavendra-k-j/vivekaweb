import { observer } from "mobx-react-lite";
import styles from "./../style.module.css";
import { useMathEditorStore } from "../MathEditorContext";


export const CategoriesMain = observer(() => {
    const store = useMathEditorStore();
    return (<div className={styles.categoryMain}>{store.category.child.renderer(store.category)}</div>);
});
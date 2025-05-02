import { observer } from "mobx-react-lite";
import { CategoryVm } from "../models/CategoryVm";
import clsx from "clsx";
import styles from "./../style.module.css";
import { useMathEditorStore } from "../MathEditorContext";

export const CategoriesView = observer(() => {
    const store = useMathEditorStore();
    const handleCategoryClick = (item: CategoryVm) => {
        store.onChangeCategory(item);
    };


    return (
        <div className={styles.categories}>
            {CategoryVm.items.map((item) => (
                <CategoryItemView
                    store={store}
                    key={item.label}
                    item={item}
                    isSelected={store.category === item}
                    onClick={handleCategoryClick}
                />
            ))}
        </div>
    );
});

const CategoryItemView = observer((props: {
    store: ReturnType<typeof useMathEditorStore>;
    item: CategoryVm;
    isSelected: boolean;
    onClick: (item: CategoryVm) => void;
}) => {
    const className = clsx(styles.categoryItem, { [styles.active]: props.isSelected });
    return (<div
        className={className}
        onClick={() => props.onClick(props.item)}
    >
        {props.item.label}
    </div>);
});

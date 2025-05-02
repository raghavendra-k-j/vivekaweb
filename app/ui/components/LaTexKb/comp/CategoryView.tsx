import { observer } from "mobx-react-lite";
import { useLaTexKbStore } from "../LaTexKbContext";
import { DirectCategoryView } from "./DirectCategoryView";
import { DirectCategoryVm } from "../models/DirectCategoryVm";
import { SectionedCategoryView } from "./SectionedCategoryView";
import { SectionedCategoryVm } from "../models/SectionedCategoryVm";
import React from "react";
import type { CategoryVm } from "../models/CategoryVm";
import styles from "./../style.module.css";

const CategoryView = observer(() => {
    const store = useLaTexKbStore();
    const { selectedCategory } = store;
    return <div className={styles.categoryMain}>
        {renderCategoryView(selectedCategory)}
    </div>;
});

const rendererMap = {
    DirectCategoryVm: (category: CategoryVm) => <DirectCategoryView category={category as DirectCategoryVm} />,
    SectionedCategoryVm: (category: CategoryVm) => <SectionedCategoryView category={category as SectionedCategoryVm} />,
};

function renderCategoryView(category: CategoryVm): React.JSX.Element {
    const key = category.constructor.name as keyof typeof rendererMap;
    const renderer = rendererMap[key];
    return renderer(category);
}

export { CategoryView };

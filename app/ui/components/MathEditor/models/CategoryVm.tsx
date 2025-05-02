import { getAllCategories } from "../CategoriesFactory";
import type { CategoryChildVm } from "./CategoryChildVm";

type CategoryVmProps = {
    label: string;
    child: CategoryChildVm;
};

class CategoryVm {
    label: string;
    child: CategoryChildVm;

    constructor(props: CategoryVmProps) {
        this.label = props.label;
        this.child = props.child;
    }
    // Initialize the static property
    static items: CategoryVm[];
}

CategoryVm.items = getAllCategories();

export { CategoryVm };
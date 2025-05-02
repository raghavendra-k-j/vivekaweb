import type { CategoryVm } from "./CategoryVm";

type CategoryChildVmProps = {
    renderer: (vm: CategoryVm) => React.ReactNode;
}

abstract class CategoryChildVm {
    renderer: (vm: CategoryVm) => React.ReactNode;

    constructor(props: CategoryChildVmProps) {
        this.renderer = props.renderer;
    }
}

export { CategoryChildVm };
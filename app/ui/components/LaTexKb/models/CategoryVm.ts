export type CategoryVmProps = {
    id: string;
    name: string;
}

abstract class CategoryVm {
    id: string;
    name: string;

    constructor(props: CategoryVmProps) {
        this.id = props.id;
        this.name = props.name;
    }
}

export { CategoryVm };


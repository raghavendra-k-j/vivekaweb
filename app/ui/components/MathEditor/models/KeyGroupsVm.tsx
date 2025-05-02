import { CategoryChildVm } from "./CategoryChildVm";
import type { KeyGroupVm } from "./KeyGroupVm";

type KeyGroupTypeProps = {
    label: string;
}


class KeyGroupType {
    label: string;
    constructor(props: KeyGroupTypeProps) {
        this.label = props.label;
    }
}



type KeyGroupsVmProps = CategoryChildVm & {
    type: KeyGroupType;
    items: KeyGroupVm[];
}

class KeyGroupsVm extends CategoryChildVm {
    items: KeyGroupVm[];

    constructor(props: KeyGroupsVmProps) {
        super(props);
        this.items = props.items;
    }
}

export { KeyGroupsVm, KeyGroupType }; 
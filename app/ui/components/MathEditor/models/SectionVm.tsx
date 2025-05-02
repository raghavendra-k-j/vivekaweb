import { CategoryChildVm } from "./CategoryChildVm";
import type { KeyGroupsVm } from "./KeyGroupsVm";

type SectionVmProps = CategoryChildVm & {
    items: SectionItemVm[];
}

class SectionVm extends CategoryChildVm {
    items: SectionItemVm[];
    constructor(props: SectionVmProps) {
        super(props);
        this.items = props.items;
    }
}


type SectionItemVmProps = {
    label: string;
    groups: KeyGroupsVm;
}


class SectionItemVm {
    label: string;
    groups: KeyGroupsVm;
    constructor(props: SectionItemVmProps) {
        this.label = props.label;
        this.groups = props.groups;
    }
}




export { SectionVm, SectionItemVm }; 
import type { KeyItemVm } from "./KeyItemVm";

type KeyGroupVmProps = {
    items: KeyItemVm[];
}


class KeyGroupVm {

    items: KeyItemVm[];
    constructor(props: KeyGroupVmProps) {
        this.items = props.items;
    }

    static fromItems(items: KeyItemVm[]): KeyGroupVm {
        return new KeyGroupVm({
            items: items,
        });
    }

}

export { KeyGroupVm };
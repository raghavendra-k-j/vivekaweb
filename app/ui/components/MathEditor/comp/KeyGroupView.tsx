import type { KeyGroupVm } from "../models/KeyGroupVm";
import { KeyItemView } from "./KeyItemView";

type KeyGroupViewProps = {
    item: KeyGroupVm
}

export function KeyGroupView(props: KeyGroupViewProps) {
    const { item } = props;
    return (
        <div
            className="flex flex-wrap gap-2 p-2"
        >
            {item.items.map((e) => (
                <KeyItemView key={e.label} item={e} />
            ))}
        </div>
    );
}
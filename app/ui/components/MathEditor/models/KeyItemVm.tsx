type KeyItemVmProps = {
    label: string;
    latex: string;
};

export class KeyItemVm {
    label: string;
    latex: string;

    constructor(props: KeyItemVmProps) {
        this.label = props.label;
        this.latex = props.latex;
    }

    static fromLabel(latex: string): KeyItemVm {
        return new KeyItemVm({
            label: latex,
            latex: latex,
        });
    }
}

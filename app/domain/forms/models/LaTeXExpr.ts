enum DisplayType {
    INLINE = 'inline',
    BLOCK = 'block',
}

type LaTeXExprProps = {
    latex: string;
    displayType: DisplayType;
}

class LaTeXExpr {
    latex: string;
    displayType: DisplayType;

    constructor(props: LaTeXExprProps) {
        this.latex = props.latex;
        this.displayType = props.displayType;
    }
}
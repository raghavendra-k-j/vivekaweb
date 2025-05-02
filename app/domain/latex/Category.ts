enum CategoryType {
    DIRECT = 'DIRECT',
    SECTIONED = 'SECTIONED',
}

type CategoryBaseProps = {
    id: string;
    name: string;
    type: CategoryType;
}

abstract class Category {
    id: string;
    name: string;
    type: CategoryType;

    constructor(props: CategoryBaseProps) {
        this.id = props.id;
        this.name = props.name;
        this.type = props.type;
    }
}

type KeyGroup = {
    id: string;
    name: string;
    items: KbKey[];
}

type DirectCategoryProps = CategoryBaseProps & {
    keyGroups: KeyGroup[];
}

class DirectCategory extends Category {
    keyGroups: KeyGroup[];

    constructor(props: DirectCategoryProps) {
        super({ ...props, type: CategoryType.DIRECT });
        this.keyGroups = props.keyGroups;
    }
}

type Section = {
    id: string;
    name: string;
    keyGroups: KeyGroup[];
}

type SectionedCategoryProps = CategoryBaseProps & {
    sections: Section[];
}

class SectionedCategory extends Category {
    sections: Section[];

    constructor(props: SectionedCategoryProps) {
        super({ ...props, type: CategoryType.SECTIONED });
        this.sections = props.sections;
    }
}

import { KeyGroup } from "./KeyGroup";
import { Section } from "./Section";

type CategoryProps = {
    id: string;
    name: string;
}

export abstract class Category {
    id: string;
    name: string;

    constructor(props: CategoryProps) {
        this.id = props.id;
        this.name = props.name;
    }

    get isSectioned(): boolean {
        return this instanceof SectionedCategory;
    }

    get isDirect(): boolean {
        return this instanceof DirectCategory;
    }

    get asSectioned(): SectionedCategory {
        if (this instanceof SectionedCategory) {
            return this;
        }
        throw new Error("Category is not a SectionedCategory");
    }

    get asDirect(): DirectCategory {
        if (this instanceof DirectCategory) {
            return this;
        }
        throw new Error("Category is not a DirectCategory");
    }

}


type DirectCategoryProps = CategoryProps & {
    items: KeyGroup[];
}

export class DirectCategory extends Category {
    items: KeyGroup[];

    constructor(props: DirectCategoryProps) {
        super(props);
        this.items = props.items;
    }

    static fromJson(json: any): DirectCategory {
        return new DirectCategory({
            id: json.id,
            name: json.name,
            items: json.items.map((item: any) => KeyGroup.fromJson(item)),
        });
    }
}

type SectionedCategoryProps = CategoryProps & {
    items: Section[];
}

export class SectionedCategory extends Category {
    items: Section[];

    constructor(props: SectionedCategoryProps) {
        super(props);
        this.items = props.items;
    }

    static fromJson(json: any): SectionedCategory {
        return new SectionedCategory({
            id: json.id,
            name: json.name,
            items: json.items.map((item: any) => Section.fromJson(item)),
        });
    }
}
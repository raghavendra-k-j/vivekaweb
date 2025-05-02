type KbKeyEntityProps = {
    id: string;
    key: KbKey;
    tags: string[];
}


class KbKeyEntity {
    id: string;
    key: KbKey;
    tags: string[];

    constructor(props: KbKeyEntityProps) {
        this.id = props.id;
        this.key = props.key;
        this.tags = props.tags ?? [];
    }
}

import { useState, useEffect } from "react";
import { SectionItemVm, SectionVm } from "../models/SectionVm";
import { KeyGroupsView } from "./KeyGroupsView";
import clsx from "clsx";
import styles from "./../style.module.css";

type SectionViewProps = {
    vm: SectionVm;
};

function SectionView(props: SectionViewProps) {
    const { vm } = props;
    const { items } = vm;
    const [currentSection, setCurrentSection] = useState(items[0]);

    useEffect(() => {
        setCurrentSection(items[0]);
    }, [items]);

    return (
        <>
            <TabItems
                items={items}
                currentSection={currentSection}
                onSelect={setCurrentSection}
            />
            <Body section={currentSection} />
        </>
    );
}

export { SectionView };

type TabItemsProps = {
    items: SectionItemVm[];
    currentSection: SectionItemVm;
    onSelect: (section: SectionItemVm) => void;
};

function TabItems(props: TabItemsProps) {
    const { items, currentSection, onSelect } = props;

    return (
        <div className={styles.sectionTabs}>
            {items.map((item) => (
                <div
                    key={item.label}
                    onClick={() => onSelect(item)}
                    className={clsx(styles.sectionTabItem, { [styles.active]: item.label === currentSection.label })}

                >{item.label}</div>
            ))}
        </div>
    );
}

type BodyProps = {
    section: SectionItemVm;
};

function Body(props: BodyProps) {
    const { section } = props;
    const { groups } = section;
    return <KeyGroupsView items={groups.items} />;
}
import { DirectCategory, SectionedCategory } from "../models/Category";
import { KbKey } from "../models/KbKey";
import { KeyGroup } from "../models/KeyGroup";
import { Section } from "../models/Section";

export const categories = [
    getNumbersCategory(),
    getLettersCategory(),
    getTrigonometryCategory(),
];

function getNumbersCategory() {
    const category = new DirectCategory({ id: 'numbers', name: 'Numbers', items: [] });

    const numbersGroup = KeyGroup.empty({ id: 'numbers', name: 'Numbers' });
    const numberKeys = Array.from({ length: 10 }, (_, i) =>
        new KbKey({ id: `number-${i}`, name: `${i}`, latex: `${i}` })
    );
    const punctuationKeys = [
        new KbKey({ id: 'fullstop', name: '.', latex: '.' }),
        new KbKey({ id: 'comma', name: ',', latex: ',' })
    ];
    numbersGroup.items.push(...numberKeys, ...punctuationKeys);

    const basicOperatorsGroup = KeyGroup.empty({ id: 'basic-operators', name: 'Basic Operators' });
    const operators = [
        { id: 'plus', name: '+', latex: '+' },
        { id: 'minus', name: '-', latex: '-' },
        { id: 'multiply', name: '*', latex: '*' },
        { id: 'divide', name: '/', latex: '/' },
        { id: 'equals', name: '=', latex: '=' },
        { id: 'not-equal', name: '≠', latex: '\\neq' }
    ].map(cfg => new KbKey(cfg));
    basicOperatorsGroup.items.push(...operators);

    category.items.push(numbersGroup, basicOperatorsGroup);
    return category;
}

function getLettersCategory() {
    const category = new SectionedCategory({ id: 'letters', name: 'Letters', items: [] });

    const lowerCaseKeys = Array.from({ length: 26 }, (_, i) =>
        new KbKey({ id: `lowercase-${i}`, name: String.fromCharCode(97 + i), latex: String.fromCharCode(97 + i) })
    );
    const upperCaseKeys = Array.from({ length: 26 }, (_, i) =>
        new KbKey({ id: `uppercase-${i}`, name: String.fromCharCode(65 + i), latex: String.fromCharCode(65 + i) })
    );

    const lowerCaseSection = new Section({
        id: 'lowercase',
        name: 'abc',
        items: [new KeyGroup({ id: 'lowercase', name: 'abc', items: lowerCaseKeys })]
    });

    const upperCaseSection = new Section({
        id: 'uppercase',
        name: 'ABC',
        items: [new KeyGroup({ id: 'uppercase', name: 'ABC', items: upperCaseKeys })]
    });

    category.items.push(lowerCaseSection, upperCaseSection);
    return category;
}

function getTrigonometryCategory() {
    const category = new SectionedCategory({ id: 'trigonometry', name: 'Trigonometry', items: [] });

    const basicTrigKeys = ['sin', 'cos', 'tan', 'cot', 'sec', 'csc'].map(fn =>
        new KbKey({ id: fn, name: fn, latex: `\\${fn}` })
    );
    const basicSection = new Section({
        id: 'trig-basic',
        name: 'Basic',
        items: [new KeyGroup({ id: 'trig-basic-group', name: 'Basic Functions', items: basicTrigKeys })]
    });

    const inverseConfigs = [
        { id: 'arcsin', latex: '\\arcsin' },
        { id: 'arccos', latex: '\\arccos' },
        { id: 'arctan', latex: '\\arctan' },
        { id: 'arccot', latex: '\\operatorname{arccot}' },
        { id: 'arcsec', latex: '\\operatorname{arcsec}' },
        { id: 'arccsc', latex: '\\operatorname{arccsc}' }
    ];
    const inverseTrigKeys = inverseConfigs.map(cfg =>
        new KbKey({ id: cfg.id, name: cfg.id, latex: cfg.latex })
    );
    const inverseSection = new Section({
        id: 'trig-inverse',
        name: 'Inverse',
        items: [new KeyGroup({ id: 'trig-inverse-group', name: 'Inverse Functions', items: inverseTrigKeys })]
    });

    const hyperbolicConfigs = [
        { id: 'sinh', latex: '\\sinh' },
        { id: 'cosh', latex: '\\cosh' },
        { id: 'tanh', latex: '\\tanh' },
        { id: 'coth', latex: '\\coth' },
        { id: 'sech', latex: '\\operatorname{sech}' },
        { id: 'csch', latex: '\\operatorname{csch}' }
    ];
    const hyperbolicTrigKeys = hyperbolicConfigs.map(cfg =>
        new KbKey({ id: cfg.id, name: cfg.id, latex: cfg.latex })
    );
    const hyperbolicSection = new Section({
        id: 'trig-hyperbolic',
        name: 'Hyperbolic',
        items: [new KeyGroup({ id: 'trig-hyperbolic-group', name: 'Hyperbolic Functions', items: hyperbolicTrigKeys })]
    });

    category.items.push(basicSection, inverseSection, hyperbolicSection);
    return category;
}

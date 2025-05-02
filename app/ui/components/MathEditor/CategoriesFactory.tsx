import { KeyGroupsView } from "./comp/KeyGroupsView";
import { SectionView } from "./comp/SectionView";
import { CategoryVm } from "./models/CategoryVm";
import { KeyGroupsVm, KeyGroupType } from "./models/KeyGroupsVm";
import { KeyGroupVm } from "./models/KeyGroupVm";
import { KeyItemVm } from "./models/KeyItemVm";
import { SectionItemVm, SectionVm } from "./models/SectionVm";

// Helper function to create a KeyGroupVm from an array of label strings
const createKeyGroup = (labels: string[]) => KeyGroupVm.fromItems(labels.map(KeyItemVm.fromLabel));

// Helper function to create a KeyGroupsVm (often used within sections)
const createKeyGroupsViewModel = (typeLabel: string, groups: KeyGroupVm[]) => new KeyGroupsVm({
    type: new KeyGroupType({ label: typeLabel }),
    items: groups,
    // Renderer for a simple group of keys
    renderer: (categoryViewModel: CategoryVm) => <KeyGroupsView items={groups} />,
});

// Helper function to create a SectionItemVm
const createSectionItem = (label: string, typeLabel: string, groups: KeyGroupVm[]) => new SectionItemVm({
    label: label,
    groups: createKeyGroupsViewModel(typeLabel, groups),
});

// Helper function for categories that are complex enough to warrant sections
const createSectionedCategory = (categoryLabel: string, sections: SectionItemVm[]) => new CategoryVm({
    label: categoryLabel,
    child: new SectionVm({
        items: sections,
        // Renderer for a category composed of sections
        renderer: (categoryViewModel) => <SectionView vm={categoryViewModel.child as SectionVm} />,
    }),
});

// Helper function for categories with a single group of keys
const createSimpleCategory = (categoryLabel: string, typeLabel: string, items: KeyGroupVm[]) => new CategoryVm({
    label: categoryLabel,
    child: new KeyGroupsVm({
        type: new KeyGroupType({ label: typeLabel }),
        items: items,
        renderer: (categoryViewModel: CategoryVm) => <KeyGroupsView items={items} />,
    }),
});


// --- Category Definitions ---

export function createNumbersCategory(): CategoryVm {
    const digits = Array.from({ length: 10 }, (_, i) => i.toString());
    const separators = [".", ","];
    // Order: 1-9, 0, separators
    const numberGroup = createKeyGroup([...digits.slice(1), digits[0], ...separators]);
    return createSimpleCategory("Numbers", "123", [numberGroup]);
}

export function createOperatorsCategory(): CategoryVm {
    const sections: SectionItemVm[] = [];

    // Basic Arithmetic
    const arithmeticGroup = createKeyGroup(["+", "-", "\\times", "\\div", "\\pm", "\\mp", "*", "/"]);
    sections.push(createSectionItem("Arithmetic", "+ -", [arithmeticGroup]));

    // More Operators (Dots, Circles, Boxes, etc.)
    const advancedOpsGroup = createKeyGroup([
        "\\cdot", "\\cdotp", "\\centerdot", "\\circ", "\\bullet", "\\star",
        "\\boxdot", "\\boxplus", "\\boxminus", "\\boxtimes",
        "\\oplus", "\\ominus", "\\otimes", "\\oslash", "\\odot",
        "\\circledast", "\\circledcirc", "\\circleddash", "\\divideontimes", "\\dotplus",
        "\\ltimes", "\\rtimes", "\\leftthreetimes", "\\rightthreetimes",
        "\\intercal", "\\And", "\\amalg" // \And added for completeness
    ]);
    sections.push(createSectionItem("Advanced", "· ∘", [advancedOpsGroup]));

    // Modular Arithmetic
    const modGroup = createKeyGroup(["\\%", "\\bmod", "\\pmod", "\\pod"]);
    sections.push(createSectionItem("Modulo", "mod", [modGroup]));

    return createSectionedCategory("Operators", sections);
}

export function createRelationsCategory(): CategoryVm {
    const sections: SectionItemVm[] = [];

    // Equality & Equivalence
    const equalityGroup = createKeyGroup([
        "=", "\\ne", "\\neq", "\\approx", "\\approxeq", "\\cong", "\\equiv", "\\sim", "\\simeq", "\\asymp",
        ":=", "\\coloneqq", "\\coloneq", // Definition, assignment
        "\\doteq", "\\Doteq", "\\doteqdot", "\\risingdotseq", "\\fallingdotseq",
        "\\eqcirc", "\\circeq", "\\triangleq", "\\bumpeq", "\\Bumpeq",
        "\\thickapprox", "\\thicksim"
    ]);
    sections.push(createSectionItem("Equality", "= ≈", [equalityGroup]));

    // Comparisons (Greater/Less Than)
    const comparisonGroup = createKeyGroup([
        "<", ">", "\\le", "\\leq", "\\ge", "\\geq",
        "\\ll", "\\gg", "\\lll", "\\ggg",
        "\\leqslant", "\\geqslant", "\\leqq", "\\geqq",
        "\\lesssim", "\\gtrsim", "\\lessapprox", "\\gtrapprox",
        "\\lessgtr", "\\gtrless", "\\lesseqgtr", "\\gtreqless", "\\lesseqqgtr", "\\gtreqqless",
        "\\prec", "\\succ", "\\preceq", "\\succeq", "\\preccurlyeq", "\\succcurlyeq",
        "\\precsim", "\\succsim", "\\precnsim", "\\succnsim", "\\precapprox", "\\succapprox",
    ]);
    sections.push(createSectionItem("Comparison", "< >", [comparisonGroup]));

     // Negated Relations
    const negatedGroup = createKeyGroup([
         "\\not=", "\\nless", "\\ngtr", "\\nleq", "\\ngeq", "\\nleqslant", "\\ngeqslant", "\\nleqq", "\\ngeqq",
         "\\lneq", "\\gneq", "\\lneqq", "\\gneqq", "\\lvertneqq", "\\gvertneqq",
         "\\lnsim", "\\gnsim", "\\lnapprox", "\\gnapprox",
         "\\nprec", "\\nsucc", "\\npreceq", "\\nsucceq", "\\precneqq", "\\succneqq", "\\precnsim", "\\succnsim",
         "\\nsim", "\\ncong",
         "\\ntriangleleft", "\\ntriangleright", "\\ntrianglelefteq", "\\ntrianglerighteq",
         "\\nmid", "\\nparallel", "\\nvdash", "\\nvDash", "\\nVDash", "\\nVdash"
    ]);
    sections.push(createSectionItem("Negated", "≠ ≮", [negatedGroup]));

    // Other Relations (Membership, Perpendicular, etc.)
    const otherRelationsGroup = createKeyGroup([
        "\\in", "\\ni", "\\notin", "\\notni", // Set membership
        "\\subset", "\\supset", "\\subseteq", "\\supseteq", "\\sqsubset", "\\sqsupset", "\\sqsubseteq", "\\sqsupseteq",
        "\\subsetneq", "\\supsetneq", "\\varsubsetneq", "\\varsupsetneq", "\\subsetneqq", "\\supsetneqq", "\\varsubsetneqq", "\\varsupsetneqq",
        "\\nsubset", "\\nsupset", "\\nsubseteq", "\\nsupseteq", // Negated set relations (check if needed, \not covers some)
        "\\mid", "\\parallel", "\\perp", "\\models", "\\vdash", "\\dashv",
        "\\smile", "\\frown", "\\bowtie", "\\Join", "\\propto", "\\varpropto",
        "\\shortmid", "\\shortparallel", "\\backsim", "\\backsimeq", "\\between",
        "\\pitchfork", "\\top", "\\bot" // Top/Bottom symbols
    ]);
    sections.push(createSectionItem("Other", "∈ ⊂", [otherRelationsGroup]));

    return createSectionedCategory("Relations", sections);
}


export function createBracketsCategory(): CategoryVm {
    const sections: SectionItemVm[] = [];

    // Common Brackets
    const commonBrackets = createKeyGroup([
        "(", ")", "[", "]", "\\{", "\\}", // Basic pairs
        "|", "\\vert", "\\lvert", "\\rvert", // Single vertical bars
        "\\|", "\\Vert", "\\lVert", "\\rVert", // Double vertical bars
    ]);
    sections.push(createSectionItem("Common", "( ) [ ]", [commonBrackets]));

    // Angled & Floor/Ceiling
    const angledFloorCeiling = createKeyGroup([
         "\\langle", "\\rangle", // Angle brackets
         "\\lfloor", "\\rfloor", // Floor
         "\\lceil", "\\rceil", // Ceiling
         "\\lmoustache", "\\rmoustache", // Moustaches
         "\\lgroup", "\\rgroup", // Grouping parentheses
         "\\ulcorner", "\\urcorner", "\\llcorner", "\\lrcorner", // Corners
         "\\llbracket", "\\rrbracket", // Double square brackets
         "\\lBrace", "\\rBrace" // Curly braces (alternative)
    ]);
    sections.push(createSectionItem("Angled/Floor", "⟨ ⟩ ⌊ ⌋", [angledFloorCeiling]));

    // Brackets with Placeholders (using \left \right)
    const placeholderBrackets = createKeyGroup([
        "\\left( \\placeholder \\right)",
        "\\left[ \\placeholder \\right]",
        "\\left\\{ \\placeholder \\right\\}",
        "\\left| \\placeholder \\right|",
        "\\left\\Vert \\placeholder \\right\\Vert",
        "\\left\\langle \\placeholder \\right\\rangle",
        "\\left\\lfloor \\placeholder \\right\\rfloor",
        "\\left\\lceil \\placeholder \\right\\rceil",
    ]);
    sections.push(createSectionItem("Sized", "\\left( \\right)", [placeholderBrackets]));

    // Sizing Commands (can be used with any delimiter)
    const sizingCommands = createKeyGroup([
        "\\big", "\\Big", "\\bigg", "\\Bigg", // Size modifiers
        "\\bigl", "\\Bigl", "\\biggl", "\\Biggl", // Left versions
        "\\bigr", "\\Bigr", "\\biggr", "\\Biggr", // Right versions
        "\\bigm", "\\Bigm", "\\biggm", "\\Biggm", // Middle versions
    ]);
     sections.push(createSectionItem("Sizing", "\\big", [sizingCommands]));

    return createSectionedCategory("Brackets", sections);
}

export function createLettersCategory(): CategoryVm {
    const sections: SectionItemVm[] = [];

    // Standard Latin Letters
    const lowercaseLetters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
    const lowercaseGroup = createKeyGroup(lowercaseLetters);
    sections.push(createSectionItem("Lowercase", "abc", [lowercaseGroup]));

    const uppercaseLetters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
    const uppercaseGroup = createKeyGroup(uppercaseLetters);
    sections.push(createSectionItem("Uppercase", "ABC", [uppercaseGroup]));

    // Blackboard Bold (Common for Number Sets)
    const mathbbLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
        .map(l => `\\mathbb{${l}}`);
    const mathbbGroup = createKeyGroup(mathbbLetters);
    sections.push(createSectionItem("Blackboard", "𝔸𝔹ℂ", [mathbbGroup]));

    // Calligraphic
    const mathcalLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
        .map(l => `\\mathcal{${l}}`);
    const mathcalGroup = createKeyGroup(mathcalLetters);
    sections.push(createSectionItem("Calligraphic", "𝒜ℬ𝒞", [mathcalGroup]));

    // Fraktur
    const mathfrakUpper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
        .map(l => `\\mathfrak{${l}}`);
     const mathfrakLower = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
        .map(l => `\\mathfrak{${l}}`);
    const mathfrakGroup = createKeyGroup([...mathfrakUpper, ...mathfrakLower]);
    sections.push(createSectionItem("Fraktur", "𝔄𝔅𝕮", [mathfrakGroup]));

     // Script
    const mathscrLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
        .map(l => `\\mathscr{${l}}`);
    const mathscrGroup = createKeyGroup(mathscrLetters);
    sections.push(createSectionItem("Script", "𝒜<0xE2><0x84><0xAC><0xE2><0x84><0xB2>", [mathscrGroup])); // Note: Script rendering varies

    // Sans Serif
    const mathsfUpper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
        .map(l => `\\mathsf{${l}}`);
    const mathsfLower = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
        .map(l => `\\mathsf{${l}}`);
    const mathsfGroup = createKeyGroup([...mathsfUpper, ...mathsfLower]);
     sections.push(createSectionItem("Sans Serif", "𝖠𝖡𝖢", [mathsfGroup]));

     // Typewriter / Monospace
    const mathttUpper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
        .map(l => `\\mathtt{${l}}`);
    const mathttLower = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
        .map(l => `\\mathtt{${l}}`);
    const mathttGroup = createKeyGroup([...mathttUpper, ...mathttLower]);
    sections.push(createSectionItem("Typewriter", "𝙰𝙱𝙲", [mathttGroup]));

    // Other Special Letters
    const otherLettersGroup = createKeyGroup([
        "\\imath", "\\jmath", "\\hbar", "\\hslash", "\\ell", "\\wp", "\\Re", "\\Im",
        "\\aleph", "\\beth", "\\gimel", "\\daleth", "\\nabla", "\\partial", "\\eth",
        "\\Finv", "\\Game", "\\Bbbk" // Blackboard bold k
    ]);
    sections.push(createSectionItem("Special", "ℏ ℵ ∂", [otherLettersGroup]));

    return createSectionedCategory("Letters", sections);
}

export function createGreekLettersCategory(): CategoryVm {
    const sections: SectionItemVm[] = [];

    // Lowercase Greek
    const lowercaseGreek = [
        "alpha", "beta", "gamma", "delta", "epsilon", "zeta", "eta", "theta", "iota", "kappa", "lambda", "mu",
        "nu", "xi", "omicron", "pi", "rho", "sigma", "tau", "upsilon", "phi", "chi", "psi", "omega"
    ].map(name => `\\${name}`);
    const lowercaseGreekGroup = createKeyGroup(lowercaseGreek);
    sections.push(createSectionItem("Lowercase", "αβγ", [lowercaseGreekGroup]));

    // Uppercase Greek
    const uppercaseGreek = [
        "Gamma", "Delta", "Theta", "Lambda", "Xi", "Pi", "Sigma", "Upsilon", "Phi", "Psi", "Omega",
        // Note: Most uppercase Greek letters look like Latin letters (A, B, E, Z, H, I, K, M, N, O, P, T, X)
        // Only include those that are distinct or commonly used in math notation.
    ].map(name => `\\${name}`);
     const uppercaseGreekGroup = createKeyGroup(uppercaseGreek);
    sections.push(createSectionItem("Uppercase", "ΓΔΘ", [uppercaseGreekGroup]));

    // Variant Greek Letters
    const variantGreek = [
        "varepsilon", "varkappa", "vartheta", "thetasym", "varpi", "varrho", "varsigma", "varphi", "digamma" // digamma is archaic
    ].map(name => `\\${name}`);
     // Add uppercase variants if needed: varGamma, varDelta, etc.
    const variantGreekGroup = createKeyGroup(variantGreek);
    sections.push(createSectionItem("Variants", "ε ϑ φ", [variantGreekGroup]));

    return createSectionedCategory("Greek", sections);
}

export function createTrigonometryCategory(): CategoryVm {
    const sections: SectionItemVm[] = [];

    // Basic Functions
    const basicTrig = createKeyGroup([
        "\\sin", "\\cos", "\\tan",
        "\\sin\\left( \\placeholder \\right)",
        "\\cos\\left( \\placeholder \\right)",
        "\\tan\\left( \\placeholder \\right)",
    ]);
    sections.push(createSectionItem("Basic", "sin", [basicTrig]));

    // Reciprocal Functions
    const reciprocalTrig = createKeyGroup([
        "\\csc", "\\sec", "\\cot",
        "\\csc\\left( \\placeholder \\right)",
        "\\sec\\left( \\placeholder \\right)",
        "\\cot\\left( \\placeholder \\right)",
    ]);
    sections.push(createSectionItem("Reciprocal", "csc", [reciprocalTrig]));

    // Inverse Functions (arc notation)
    const inverseArcTrig = createKeyGroup([
        "\\arcsin", "\\arccos", "\\arctan",
        "\\arccsc", "\\arcsec", "\\arccot", // Less common but exist
        "\\arcsin\\left( \\placeholder \\right)",
        "\\arccos\\left( \\placeholder \\right)",
        "\\arctan\\left( \\placeholder \\right)",
    ]);
    sections.push(createSectionItem("Inverse (arc)", "arcsin", [inverseArcTrig]));

    // Inverse Functions (superscript -1 notation)
    const inverseSupTrig = createKeyGroup([
        "\\sin^{-1}", "\\cos^{-1}", "\\tan^{-1}",
        "\\csc^{-1}", "\\sec^{-1}", "\\cot^{-1}", // Less common
        "\\sin^{-1}\\left( \\placeholder \\right)",
        "\\cos^{-1}\\left( \\placeholder \\right)",
        "\\tan^{-1}\\left( \\placeholder \\right)",
    ]);
    sections.push(createSectionItem("Inverse (-1)", "sin⁻¹", [inverseSupTrig]));

    // Hyperbolic Functions
    const hyperbolic = createKeyGroup([
        "\\sinh", "\\cosh", "\\tanh",
        "\\csch", "\\sech", "\\coth",
        "\\sinh\\left( \\placeholder \\right)",
        "\\cosh\\left( \\placeholder \\right)",
        "\\tanh\\left( \\placeholder \\right)",
    ]);
    sections.push(createSectionItem("Hyperbolic", "sinh", [hyperbolic]));

    // Inverse Hyperbolic Functions (use operatorname for correct spacing)
    const inverseHyperbolic = createKeyGroup([
        "\\operatorname{arsinh}", "\\operatorname{arcosh}", "\\operatorname{artanh}",
        "\\operatorname{arcsch}", "\\operatorname{arsech}", "\\operatorname{arcoth}",
        "\\operatorname{arsinh}\\left( \\placeholder \\right)",
        "\\operatorname{arcosh}\\left( \\placeholder \\right)",
        "\\operatorname{artanh}\\left( \\placeholder \\right)",
    ]);
    sections.push(createSectionItem("Inv. Hyperbolic", "arsinh", [inverseHyperbolic]));

    // Common Variables & Units
    const commonVarsUnits = createKeyGroup([
        "\\theta", "\\phi", "\\alpha", "\\beta", "\\gamma", "\\pi", // Common angles/constants
        "^{\\circ}", "'", "''", // Degree, minute, second
        // "\\radian", // Requires package, might not render
        "^{\\text{c}}", "^{\\text{R}}" // Radian alternatives
    ]);
     sections.push(createSectionItem("Vars & Units", "θ π °", [commonVarsUnits]));

    // Identities/Notations (Example) - Could be text or specific symbols
    const notations = createKeyGroup([
        // "\\sin^2 \\theta + \\cos^2 \\theta = 1", // Example identity
        // "\\tan \\theta = \\frac{\\sin \\theta}{\\cos \\theta}",
    ]);
    // sections.push(createSectionItem("Notations", "Id", [notations])); // Optional

    return createSectionedCategory("Trigonometry", sections);
}

export function createCalculusCategory(): CategoryVm {
    const sections: SectionItemVm[] = [];

    // Integrals
    const integrals = createKeyGroup([
        "\\int", "\\iint", "\\iiint", "\\oint", "\\oiint", "\\oiiint",
        "\\int\\limits_{a}^{b}", // Integral with limits
        "\\int_{a}^{b} \\placeholder \\, dx" // Common integral form
    ]);
    sections.push(createSectionItem("Integrals", "∫", [integrals]));

    // Derivatives
    const derivatives = createKeyGroup([
        "\\frac{d}{dx}", "\\frac{dy}{dx}", // Leibniz notation
        "f'(x)", "f''(x)", // Lagrange notation (using primes)
        "\\dot{x}", "\\ddot{x}", // Newton notation (dots above)
        "\\partial", "\\frac{\\partial}{\\partial x}", // Partial derivatives
        "\\nabla" // Nabla (gradient, divergence, curl)
    ]);
    sections.push(createSectionItem("Derivatives", "d/dx ∂", [derivatives]));

    // Limits
    const limits = createKeyGroup([
        "\\lim", "\\lim_{x \\to a}", "\\lim_{x \\to \\infty}",
        "\\liminf", "\\limsup",
        "\\varliminf", "\\varlimsup",
        "\\to", "\\rightarrow" // Arrow often used with limits
    ]);
    sections.push(createSectionItem("Limits", "lim", [limits]));

     // Big Operators (often used with Calculus concepts like Summation)
    const bigOps = createKeyGroup([
        "\\sum", "\\prod", "\\coprod",
        "\\sum_{i=1}^{n}", // Summation with limits
        "\\prod_{i=1}^{n}" // Product with limits
    ]);
    sections.push(createSectionItem("Sum/Product", "∑ ∏", [bigOps]));

    return createSectionedCategory("Calculus", sections);
}

export function createArrowsCategory(): CategoryVm {
    const sections: SectionItemVm[] = [];

    // Basic Arrows
    const basicArrows = createKeyGroup([
        "\\leftarrow", "\\rightarrow", "\\leftrightarrow", "\\uparrow", "\\downarrow", "\\updownarrow",
        "\\Leftarrow", "\\Rightarrow", "\\Leftrightarrow", "\\Uparrow", "\\Downarrow", "\\Updownarrow",
    ]);
    sections.push(createSectionItem("Basic", "→", [basicArrows]));

    // Long Arrows
    const longArrows = createKeyGroup([
        "\\longleftarrow", "\\longrightarrow", "\\longleftrightarrow",
        "\\Longleftarrow", "\\Longrightarrow", "\\Longleftrightarrow",
        "\\longmapsto", // Maps to arrow
    ]);
    sections.push(createSectionItem("Long", "⟶", [longArrows]));

    // Harpoons
    const harpoons = createKeyGroup([
        "\\leftharpoonup", "\\leftharpoondown", "\\rightharpoonup", "\\rightharpoondown",
        "\\upharpoonleft", "\\upharpoonright", "\\downharpoonleft", "\\downharpoonright",
        "\\leftrightharpoons", "\\rightleftharpoons", // Equilibrium harpoons
    ]);
    sections.push(createSectionItem("Harpoons", "⇀", [harpoons]));

    // Other Arrows
    const otherArrows = createKeyGroup([
        "\\nearrow", "\\searrow", "\\swarrow", "\\nwarrow", // Diagonal
        "\\mapsto", "\\hookleftarrow", "\\hookrightarrow", // Special function/mapping arrows
        "\\multimap", // Multi-valued map
        "\\leftrightsquigarrow", "\\rightsquigarrow", "\\leadsto", // Squiggly
        "\\dashleftarrow", "\\dashrightarrow", // Dashed
        "\\twoheadleftarrow", "\\twoheadrightarrow", // Two heads
        "\\leftarrowtail", "\\rightarrowtail", // Tails
        "\\looparrowleft", "\\looparrowright", // Looping
        "\\circlearrowleft", "\\circlearrowright", // Circular
        "\\curvearrowleft", "\\curvearrowright", // Curved
        "\\Lsh", "\\Rsh", // Keyboard return-like symbols
        "\\restriction", // Upharpoon with bar
        "\\leftleftarrows", "\\rightrightarrows", "\\upuparrows", "\\downdownarrows", // Double arrows
        "\\leftrightarrows", "\\rightleftarrows", // Opposite direction pairs
        "\\Lleftarrow", "\\Rrightarrow", // Triple line arrows
    ]);
    sections.push(createSectionItem("Other", "↦ ↽", [otherArrows]));

    // Negated Arrows
    const negatedArrows = createKeyGroup([
        "\\nleftarrow", "\\nrightarrow", "\\nleftrightarrow",
        "\\nLeftarrow", "\\nRightarrow", "\\nLeftrightarrow",
    ]);
    sections.push(createSectionItem("Negated", "↚", [negatedArrows]));

    // Extensible Arrows (Placeholders show structure)
    const extensibleArrows = createKeyGroup([
        "\\xleftarrow{abc}", "\\xrightarrow[under]{over}",
        // Add more examples if needed: \\xLeftrightarrow, \\xmapsto etc.
    ]);
    sections.push(createSectionItem("Extensible", "xrightarrow", [extensibleArrows]));


    return createSectionedCategory("Arrows", sections);
}

export function createExponentsAndRootsCategory(): CategoryVm {
    const exponentAndRootItems = [
        "^{ }", // Superscript (exponent)
        "_{ }", // Subscript
        "^{2}", // Shortcut for squared
        "\\sqrt{ }", // Square root
        "\\sqrt[n]{ }", // Nth root (e.g., cube root)
        "\\surd" // Square root symbol only (no argument)
    ];
    const exponentAndRootGroup = createKeyGroup(exponentAndRootItems);
    return createSimpleCategory("Exponents & Roots", "x² √", [exponentAndRootGroup]);
}

export function createLogicSetTheoryCategory(): CategoryVm {
    const sections: SectionItemVm[] = [];

    // Logic Operators
    const logicOps = createKeyGroup([
        "\\land", "\\wedge", // AND
        "\\lor", "\\vee",   // OR
        "\\lnot", "\\neg",   // NOT
        "\\implies", "\\Rightarrow", "\\to", // Implies
        "\\impliedby", "\\Leftarrow", "\\gets", // Implied by
        "\\iff", "\\Leftrightarrow", "\\leftrightarrow", // If and only If
        "\\top",    // True
        "\\bot"     // False
    ]);
    sections.push(createSectionItem("Operators", "∧ ∨ ¬", [logicOps]));

    // Quantifiers & Reasoning
    const quantifiers = createKeyGroup([
        "\\forall", // For all
        "\\exists", // There exists
        "\\nexists", // There does not exist
        "\\therefore", // Therefore
        "\\because" // Because
    ]);
    sections.push(createSectionItem("Quantifiers", "∀ ∃", [quantifiers]));

    // Set Theory
    const setTheory = createKeyGroup([
        "\\in", "\\ni", "\\notin", "\\notni", // Membership
        "\\subset", "\\supset", "\\subseteq", "\\supseteq", // Subsets
        "\\subsetneq", "\\supsetneq", "\\subsetneqq", "\\supsetneqq", // Proper subsets
        "\\sqsubset", "\\sqsupset", "\\sqsubseteq", "\\sqsupseteq", // Square subsets
        "\\cap", "\\intersect", // Intersection
        "\\cup", "\\union",    // Union
        "\\setminus", "\\smallsetminus", // Set difference
        "\\emptyset", "\\varnothing", "\\empty", // Empty set
        "\\complement", // Complement
        "\\aleph", "\\beth", "\\gimel", "\\daleth" // Cardinal numbers
    ]);
    sections.push(createSectionItem("Sets", "∈ ∪ ∩", [setTheory]));

    // Set Builders
    const setBuilders = createKeyGroup([
        "\\{ \\placeholder | \\placeholder \\}", // Set builder notation
        "\\mid", // Vertical bar for "such that"
        ":" // Colon alternative for "such that"
    ]);
    sections.push(createSectionItem("Builders", "{ | }", [setBuilders]));


    return createSectionedCategory("Logic & Sets", sections);
}

export function createAccentsCategory(): CategoryVm {
     const sections: SectionItemVm[] = [];

     // Single accents
     const singleAccents = createKeyGroup([
         "\\hat{a}", "\\check{a}", "\\tilde{a}", "\\acute{a}", "\\grave{a}", "\\dot{a}", "\\ddot{a}", "\\breve{a}", "\\bar{a}", "\\vec{a}",
         "\\mathring{a}", // Ring accent
         "a'", "a''", "a'''", // Primes
         "\\prime", "\\backprime" // Prime symbols
     ]);
     sections.push(createSectionItem("Single", "â ä", [singleAccents]));

     // Wide accents (stretch over multiple characters)
     const wideAccents = createKeyGroup([
         "\\widehat{abc}", "\\widetilde{abc}", "\\widecheck{abc}",
         "\\overline{abc}", "\\underline{abc}", "\\overbrace{abc}", "\\underbrace{abc}",
         "\\overleftarrow{abc}", "\\overrightarrow{abc}", "\\overleftrightarrow{abc}",
         "\\underleftarrow{abc}", "\\underrightarrow{abc}", "\\underleftrightarrow{abc}",
         "\\overgroup{abc}", "\\undergroup{abc}", "\\overlinesegment{abc}", "\\underlinesegment{abc}",
         "\\overleftharpoon{ac}", "\\overrightharpoon{ac}",
         "\\utilde{AB}" // Under tilde
     ]);
     sections.push(createSectionItem("Wide / Over/Under", "abc", [wideAccents]));

     // Dot accents
     const dotAccents = createKeyGroup([
         "\\dot{a}", "\\ddot{a}", "\\dddot{a}", "\\ddddot{a}"
     ]);
     sections.push(createSectionItem("Dots", "ȧ ä", [dotAccents]));

     // Text mode accents (for use inside \text{})
     const textAccents = createKeyGroup([
         "\\'{a}", "\\`{a}", "\\^{a}", "\\~{a}", "\\={a}", "\\u{a}", "\\.{a}", "\\\"{a}", "\\r{a}", "\\H{a}", "\\v{a}"
     ]);
     sections.push(createSectionItem("Text Mode", "\\'{a}", [textAccents]));


    return createSectionedCategory("Accents", sections);
}


export function createGeometryMiscCategory(): CategoryVm {
    const sections: SectionItemVm[] = [];

    // Geometry Symbols
    const geometry = createKeyGroup([
        "\\degree", "^{\\circ}", // Degree
        "\\angle", "\\measuredangle", "\\sphericalangle", // Angles
        "\\triangle", "\\bigtriangleup", "\\blacktriangle", // Up triangles
        "\\triangledown", "\\bigtriangledown", "\\blacktriangledown", // Down triangles
        "\\triangleleft", "\\blacktriangleleft", // Left triangles
        "\\triangleright", "\\blacktriangleright", // Right triangles
        "\\parallel", "\\perp", // Parallel, Perpendicular
        "\\|", "\\shortparallel", "\\nparallel", "\\nmid", // Parallel/Mid variants
        "\\Box", "\\square", "\\blacksquare", // Squares
        "\\diamond", "\\Diamond", "\\lozenge", "\\blacklozenge", // Diamonds/Lozenges
        "\\circ", "\\bigcirc", // Circle
        "\\therefore", "\\because" // Therefore, Because (often used in proofs)
    ]);
     sections.push(createSectionItem("Geometry", "∠ △", [geometry]));

    // Punctuation & Symbols
    const punctuation = createKeyGroup([
        ".", ",", ":", ";", // Standard punctuation
        "\\colon", // Math colon
        "\\dots", "\\ldots", "\\cdots", "\\vdots", "\\ddots", // Ellipses
        "\\prime", "'", "''", "'''", "\\backprime", // Primes
        "\\$", "\\&", "\\%", "\\#", "\\_", // Special characters
        "\\dag", "\\dagger", "\\ddag", "\\ddagger", // Daggers
        "\\S", "\\P", // Section, Paragraph
        "\\copyright", "\\circledR", "\\circledS", // Copyright, Registered, Circled S
        "\\pounds", "\\yen", // Currency
    ]);
    sections.push(createSectionItem("Punctuation", ". , …", [punctuation]));

    // Other Symbols
    const otherSymbols = createKeyGroup([
        "\\infty", "\\checkmark", "\\surd", // Infinity, Checkmark, Surd
        "\\flat", "\\natural", "\\sharp", // Music symbols
        "\\clubsuit", "\\diamondsuit", "\\heartsuit", "\\spadesuit", // Card suits
        "\\mho", // Mho (conductance)
        "\\diagup", "\\diagdown", "\\backslash", // Diagonal lines, backslash
        "\\top", "\\bot", // Top, Bottom symbols
        "\\star", "\\bigstar", // Stars
        "\\maltese", // Maltese cross
        "\\minuso" // Minus sign in circle
    ]);
    sections.push(createSectionItem("Miscellaneous", "∞ ✓", [otherSymbols]));

    // Spacing
    const spacing = createKeyGroup([
        "\\,", "\\thinspace", // Thin space
        "\\:", "\\medspace", // Medium space (same as \>)
        "\\;", "\\thickspace", // Thick space
        "\\!", "\\negthinspace", // Negative thin space
        "\\negmedspace", // Negative medium space
        "\\negthickspace", // Negative thick space
        "\\quad", "\\qquad", // 1em and 2em space
        "\\enspace", // 0.5em space
        "~", // Non-breaking space
        "\\ ", // Explicit space
        "\\phantom{abc}", "\\hphantom{abc}", "\\vphantom{abc}", // Phantoms for spacing
        "\\mathstrut" // Strut with height/depth of '('
    ]);
    sections.push(createSectionItem("Spacing", "\\quad", [spacing]));


    return createSectionedCategory("Geometry & Misc", sections);
}


// --- Compile All Categories ---

export function getAllCategories(): CategoryVm[] {
    return [
        createNumbersCategory(),
        createOperatorsCategory(), // Includes basic arithmetic, advanced ops, modulo
        createRelationsCategory(), // Includes equality, comparison, negated, other relations
        createLettersCategory(),   // Includes Latin, Blackboard, Calligraphic, Fraktur, Script, Sans, Typewriter, Special
        createGreekLettersCategory(), // Includes Lower, Upper, Variants
        createBracketsCategory(), // Includes Common, Angled/Floor, Sized, Sizing Cmds
        createExponentsAndRootsCategory(),
        createLogicSetTheoryCategory(), // Includes Logic Ops, Quantifiers, Sets, Builders
        createTrigonometryCategory(), // Includes Basic, Reciprocal, Inverse, Hyperbolic, Vars/Units
        createCalculusCategory(), // Includes Integrals, Derivatives, Limits, Sum/Product
        createArrowsCategory(),   // Includes Basic, Long, Harpoons, Other, Negated, Extensible
        createAccentsCategory(),  // Includes Single, Wide, Dots, Text Mode
        createGeometryMiscCategory(), // Includes Geometry, Punctuation, Misc Symbols, Spacing
        // Potentially add categories for Fonts, Colors, Environments if needed as interactive keys
    ];
}


import { colors } from "./colors";
import { fontFamilies, fontSizes, fontWeights } from "./typography";

export type DsToken = {
    name: string;
    value: object
}

const colorsToken: DsToken = {
    name: 'color',
    value: colors
};

const fontSizesToken: DsToken = {
    name: 'fs',
    value: fontSizes
}


const fontFamiliesToken: DsToken = {
    name: 'ff',
    value: fontFamilies
}

export const dsTokens: DsToken[] = [
    colorsToken,
    fontSizesToken,
    fontFamiliesToken
]



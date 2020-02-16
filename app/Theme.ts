import {DefaultTheme, Theme} from "react-native-paper";

enum COLORS {
    TEXT = 'TEXT',
    BACKGROUND = 'BACKGROUND',
    SURFACE = 'SURFACE',
    HIGHLIGHT = 'HIGHLIGHT',
    GREEN = 'GREEN',
    RED = 'RED'
}

enum COLOR_PALETTE {
    DEFAULT = 'DEFAULT',
    LIGHTER = 'LIGHTER',
    LIGHT = 'LIGHT',
    DARKER = 'DARKER',
    DARK = 'DARK'
}

type Palette = {
    [key in COLOR_PALETTE]: string
}

type ColorPalettes = {
    [key in COLORS]: string | Palette
}

const RED_PALETTE: Palette = {
    [COLOR_PALETTE.LIGHT]: '#FFC300',
    [COLOR_PALETTE.LIGHTER]: '#FF5733',
    [COLOR_PALETTE.DEFAULT]: '#C70039',
    [COLOR_PALETTE.DARKER]: '#900C3E',
    [COLOR_PALETTE.DARK]: '#571845'
};

const GREEN_PALETTE: Palette = {
    [COLOR_PALETTE.LIGHT]: '#E2E65A',
    [COLOR_PALETTE.LIGHTER]: '#98C807',
    [COLOR_PALETTE.DEFAULT]: '#6C9806',
    [COLOR_PALETTE.DARKER]: '#3F6104',
    [COLOR_PALETTE.DARK]: '#1B3104'
};

const TEXT_COLOR = '#000000';

const BACKGROUND_COLOR = '#EAEAEA';

const SURFACE_COLOR = '#FFFFFF';

const HIGHLIGHT_COLOR = '#005B96';

const PALETTE: ColorPalettes = {
    [COLORS.TEXT]: TEXT_COLOR,
    [COLORS.BACKGROUND]: BACKGROUND_COLOR,
    [COLORS.SURFACE]: SURFACE_COLOR,
    [COLORS.HIGHLIGHT]: HIGHLIGHT_COLOR,
    [COLORS.GREEN]: GREEN_PALETTE,
    [COLORS.RED]: RED_PALETTE
};

function generateTheme(): Theme {
    return {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: HIGHLIGHT_COLOR,
            surface: SURFACE_COLOR,
            background: BACKGROUND_COLOR,
            text: TEXT_COLOR
        }
    };
}

export {PALETTE, TEXT_COLOR, BACKGROUND_COLOR, SURFACE_COLOR, HIGHLIGHT_COLOR, GREEN_PALETTE, RED_PALETTE, COLORS, COLOR_PALETTE, generateTheme, Palette}

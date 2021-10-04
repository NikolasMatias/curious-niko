
// theme.ts
import { DefaultTheme } from 'styled-components'

export enum VARIANT {
    PRIMARY,
    SECONDARY,
    THIRD,
    FOURTH
}

export interface IProps {
    variant?: VARIANT
}

export const defaultTheme: DefaultTheme = {
    borderRadius: '50%',
    palette: {
        primary: {
            lightRed: 'hsl(356, 100%, 66%)',
            veryLightRed: 'hsl(355, 100%, 74%)',
            veryDarkBlue: 'hsl(208, 49%, 24%)'
        },
        neutral: {
            white: 'hsl(0, 0%, 100%)',
            grayishBlue: 'hsl(240, 2%, 79%)',
            veryDarkGrayishBlue: 'hsl(207, 13%, 34%)',
            veryDarkBlackBlue: 'hsl(240, 10%, 16%)'
        },
        gradient: {
            lightRed: 'hsl(353, 100%, 62%)',
            veryLightRed: 'hsl(13, 100%, 72%)',
            veryDarkGrayBlue: 'hsl(237, 17%, 21%)',
            veryDarkDesaturatedBlue: 'hsl(237, 23%, 32%)'
        }
    },
    typography: {
        fontSizeDefault: '1.5rem',
        main: {
            family: 'Overpass',
            weights: [300, 600],
            url: '../assets/fonts/Overpass/Overpass-Regular.ttf'
        },
        secondary: {
            family: 'Ubuntu',
            weights: [400, 500, 700],
            url: '../assets/fonts/Ubuntu/Ubuntu-Regular.ttf'
        }
    }
}
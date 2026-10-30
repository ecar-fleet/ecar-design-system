import { create } from 'storybook/theming';

const ecarTheme = create({
    base: 'light',

    // Marca
    brandImage: '/assets/brand/logo-header-ecarfleet.png',
    brandTarget: '_self',

    // Identidade Ecar Fleet
    colorPrimary: '#FFB900',
    colorSecondary: '#E5A600',

    // Área principal
    appBg: '#F5F7F8',
    appContentBg: '#FFFFFF',
    appPreviewBg: '#FFFFFF',
    appBorderColor: '#DDE1E4',
    appBorderRadius: 8,

    // Textos
    textColor: '#111111',
    textInverseColor: '#FFFFFF',

    // Barra superior
    barBg: '#111111',
    barTextColor: '#FFFFFF',
    barSelectedColor: '#FFB900',
    barHoverColor: '#292929',

    // Campos
    inputBg: '#FFFFFF',
    inputBorder: '#DDE1E4',
    inputTextColor: '#111111',
    inputBorderRadius: 6,

    // Tipografia
    fontBase: 'Inter, sans-serif',
    fontCode: 'Consolas, monospace',
});

export default ecarTheme;

import { create } from 'storybook/theming';

const ecarTheme = create({
    base: 'light',

    brandImage: '/assets/brand/logo-header-ecarfleet.png',
    brandTarget: '_self',

    colorPrimary: '#FFB900',
    colorSecondary: '#E5A600',

    appBg: '#F5F7F8',
    appContentBg: '#FFFFFF',
    appPreviewBg: '#FFFFFF',
    appBorderColor: '#DDE1E4',
    appBorderRadius: 8,

    textColor: '#111111',
    textInverseColor: '#FFFFFF',

    barTextColor: '#6B7280',
    barSelectedColor: '#111111',
    barHoverColor: '#111111',
    barBg: '#FFFFFF',

    inputBg: '#FFFFFF',
    inputBorder: '#DDE1E4',
    inputTextColor: '#111111',
    inputBorderRadius: 6,

    fontBase: 'Inter, sans-serif',
    fontCode: 'Consolas, monospace',
});

export default ecarTheme;


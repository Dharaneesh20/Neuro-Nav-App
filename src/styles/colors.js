export const palette = {
    primaryTeal: '#4ECDC4',
    primaryTealDark: '#3AABA3',
    primaryTealLight: '#7FDBD4',

    secondaryLavender: '#B8A8D6',
    lavenderDark: '#9986C2',
    lavenderLight: '#D4C9E8',

    accentCoral: '#FF6B6B',
    coralDark: '#E55555',

    successGreen: '#6FCF97',
    warningYellow: '#FFD93D',

    neutralLight: '#F7F7F7',
    neutralBorder: '#E0E0E0',
    neutralText: '#2D3748',
    neutralMuted: '#718096',

    // New Dynamic Backgrounds
    greenLightBg: '#E8F5E9', // Minty fresh light green (keeping for light mode)
    greenBlackBg: '#020A04', // Deepest forest green/black for cinematic look

    // Neon Accents
    neonGreen: '#00FF88', // Cyberpunk neon green
    neonGreenDim: 'rgba(0, 255, 136, 0.3)',

    // Glass Colors
    glassLight: 'rgba(255, 255, 255, 0.7)',
    glassDark: 'rgba(10, 25, 15, 0.6)', // Darker, greener glass
    glassBorderLight: 'rgba(255, 255, 255, 0.5)',
    glassBorderDark: 'rgba(0, 255, 136, 0.2)', // Subtle neon border

    // Dark Mode specifics
    darkBackground: '#020A04',
    darkCard: '#0F2618', // specific dark green card
    darkBorder: '#1A4D2E',
    darkText: '#E0FAEB',
    darkMuted: '#6B9C80',
};

export const themeColors = {
    light: {
        background: palette.greenLightBg,
        card: '#FFFFFF',
        text: palette.neutralText,
        border: palette.neutralBorder,
        primary: palette.primaryTeal,
        primaryDark: palette.primaryTealDark,
        secondary: palette.secondaryLavender,
        accent: palette.accentCoral,
        muted: palette.neutralMuted,
        success: palette.successGreen,
        warning: palette.warningYellow,
        glass: palette.glassLight,
        glassBorder: palette.glassBorderLight,
        neon: palette.primaryTeal, // Fallback for light mode
    },
    dark: {
        background: palette.greenBlackBg,
        card: palette.glassDark, // Default card to glass in dark
        text: palette.darkText,
        border: palette.darkBorder,
        primary: palette.neonGreen, // Primary becomes neon in dark
        primaryDark: '#00CC6A',
        secondary: palette.secondaryLavender,
        accent: palette.accentCoral,
        muted: palette.darkMuted,
        success: palette.neonGreen,
        warning: palette.warningYellow,
        glass: palette.glassDark,
        glassBorder: palette.glassBorderDark,
        neon: palette.neonGreen,
    }
};

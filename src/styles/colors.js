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

    // Dark Mode specifics
    darkBackground: '#1A202C',
    darkCard: '#2D3748',
    darkBorder: '#4A5568',
    darkText: '#F7FAFC',
    darkMuted: '#A0AEC0',
};

export const themeColors = {
    light: {
        background: palette.neutralLight,
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
    },
    dark: {
        background: palette.darkBackground,
        card: palette.darkCard,
        text: palette.darkText,
        border: palette.darkBorder,
        primary: palette.primaryTeal,
        primaryDark: palette.primaryTealDark,
        secondary: palette.secondaryLavender,
        accent: palette.accentCoral,
        muted: palette.darkMuted,
        success: palette.successGreen,
        warning: palette.warningYellow,
    }
};

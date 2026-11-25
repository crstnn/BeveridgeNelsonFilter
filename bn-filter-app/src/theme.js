import {createTheme} from "@mui/material";

// Shared look with outputgapnow.com
export const COLORS = Object.freeze({
    text: "#1f2933",
    muted: "#5b6573",
    border: "#e3e7ec",
    accent: "#0a6782",
    accentDark: "#085a72",
    accentSoft: "#e8f3f6",
    trend: "#c4562a",
    series: "#8a94a3",
    cycle: "#0a6782",
});

const FONT = '"Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

const theme = createTheme({
    palette: {
        primary: {main: COLORS.accent, dark: COLORS.accentDark},
        text: {primary: COLORS.text, secondary: COLORS.muted},
        divider: COLORS.border,
    },
    typography: {
        fontFamily: FONT,
        button: {textTransform: "none", fontWeight: 600},
    },
    shape: {borderRadius: 8},
    components: {
        MuiButton: {
            defaultProps: {disableElevation: true},
            styleOverrides: {root: {minHeight: 42, minWidth: 110, paddingInline: 20}},
        },
        MuiToggleButton: {
            styleOverrides: {root: {textTransform: "none", fontWeight: 600}},
        },
        MuiTooltip: {
            styleOverrides: {tooltip: {fontSize: "0.8rem", lineHeight: 1.45, maxWidth: 320}},
        },
    },
});

export default theme;

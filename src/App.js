import { ThemeProvider, createTheme } from "@mui/material";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { useRoutes } from "react-router";
import "./App.css";
import routes from "./routes";
import { store } from "./store";
import NetworkStatus from "./utils/NetworkStatus";
import { VITE_APP_ORGANIZATION_LOGO_URL, VITE_APP_ORGANIZATION_NAME } from "./utils/axiosInstance";

const theme1 = createTheme({
    components: {
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: "#121212",
                    "&.Mui-checked": {
                        color: "#121212",
                    },
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: "12px",
                    padding: "5px",
                },
            },
        },
        MuiButton: {
            borderRadius: "6px",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "10px",
            paddingBottom: "10px",
        },
        MuiCard: {
            borderRadius: "0.75rem",
            padding: "20px",
        },
        MuiTextField: {
            borderRadius: "10px",
            paddingTop: "10px",
            paddingBottom: "10px",
        },
        MuiBreadcrumbs: {
            styleOverrides: {
                root: {
                    color: "#121212",
                    fontSize: "1.2rem",
                },

                separator: {
                    color: "#121212",
                },
            },
        },
        MuiTypography: {
            MuiButton: {
                textTransform: "none",
            },
        },
    },

    palette: {
        primary: {
            main: "#152336",
            sideBar: "transparent",
            active: "#2196f3",
            light: "#1e2e45",
            hover: "#1565c0",
            inActive: "#aaa",
            fontSize: "30px",
            borderColor: "#ddd",
            readOnly: "#ddd",
            activateButton: "#00c04b",
            deactivateButton: "red",
        },
        error: {
            main: "#FF0000",
            light: "#FF0000",
            hover: "",
        },
        warning: {
            main: "#FF0000",
            light: "#FF0000",
            hover: "",
        },
        info: {
            main: "#2196f3",
            light: "#014EEE",
            hover: "#014E99",
        },
        success: {
            main: "#5DD59E",
            light: "#5DFF9E",
            hover: "#4A9D77",
        },
    },
    typography: {
        primary: {
            main: "#152336",
            text: "#054d90",
            black: "#121212",
            light: "#FFFFFF",
            mainLight: "#999",
            dark: "#121212",
            iconColor: "#054d90",
            selectedBackgroundColor: "#EBF5FF",
        },

        secondary: {
            main: "#1e2e45",
            light: "#FFFFFF",
        },

        error: {
            main: "red",
            light: "#FFFFFF",
        },

        warning: {
            main: "orange",
            light: "#FFFFFF",
        },

        info: {
            main: "#014ECC",
            light: "#FFFFFF",
        },

        success: {
            main: "#5DD59E",
            light: "#FFFFFF",
        },

        fontFamily: "'Inter', sans-serif !important",

        h1: {
            fontSize: "1.8rem",
        },

        h2: {
            fontSize: "1.6rem",
        },

        h3: {
            fontSize: "1.4rem",
        },

        h4: {
            fontSize: "1.2rem",
        },

        h5: {
            fontSize: "1rem",
        },
        h6: {
            fontSize: "0.8rem",
        },
        fontWeightBold: "600",
        fontWeightMedium: "500",
        fontWeightRegular: "400",
        fontWeightLight: "200",
        color: "white",
    },
});


function App() {
    const content = useRoutes(routes);

    return (
        <HelmetProvider>
      <Helmet
        titleTemplate='%s'
        defaultTitle={VITE_APP_ORGANIZATION_NAME}
        link={[
          {
            rel: 'icon',
            type: 'image/ico',
            href: `${VITE_APP_ORGANIZATION_LOGO_URL}`
          }
        ]}
      />
      <ThemeProvider theme={theme1}>
        <Provider store={store}>
          <NetworkStatus />
          {content}
        </Provider>
      </ThemeProvider>
    </HelmetProvider>
    );
}

export default App;

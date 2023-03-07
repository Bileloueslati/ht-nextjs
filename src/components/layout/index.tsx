import { FunctionComponent, PropsWithChildren } from "react";
import { CssBaseline, ThemeProvider, Stack, useTheme } from "@mui/material";
import Header from "./header/header";
import theme from "@/libs/mui/theme";
import GlobalStyles from "@mui/material/GlobalStyles";
import Footer from "./footer";
import Mouse from "../common/mouse";
import Head from "next/head";

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const {
    palette: { secondary },
  } = useTheme();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: {
              overflowY: "scroll",
              overflowX: "hidden",
              backgroundColor: "#e6e6e659",
            },
            a: {
              textDecoration: "none",
              transition: "all 1s ease-out",
            },
            ul: {
              listStyle: "none",
              padding: 0,
            },
            ".markdown_content": {
              "h2, h3, h4": {
                fontWeight: 600,
                fontSize: 20,
              },
              strong: {
                fontWeight: 500,
              },
              ul: {
                listStyleType: "square",
                paddingLeft: 15,
                li: {
                  lineHeight: 2,
                },
              },
              p: {
                lineHeight: 2,
              },
            },
          }}
        />
        <Stack direction="column" minHeight="100vh" position="relative">
          <Mouse />

          <Header />
          <Stack component="main">{children}</Stack>
          <Footer />
        </Stack>
      </ThemeProvider>
    </>
  );
};

export default Layout;

import "../assets/css/app.css";
import App, { AppContext, AppProps } from "next/app";
import { fetchFromApi } from "@/const";
import {
  GlobalContextProvider,
  InterventionsContextT,
} from "@/contexts/globalData";
import { Intervention } from "@/__typescript";

type Props = AppProps & {
  globalData: InterventionsContextT;
};
export default function MyApp({ Component, pageProps, globalData }: Props) {
  return (
    <GlobalContextProvider interventions={globalData.interventions}>
      <Component {...pageProps} />
    </GlobalContextProvider>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);

  try {
    const { data } = await fetchFromApi<{ data: Intervention[] }>(
      "/services?populate[thumbnail]=*&populate[image]=*&populate[services][populate]=*"
    );
    return {
      ...appProps,
      globalData: {
        interventions: data.data,
      },
    };
  } catch (e: unknown) {
    return appProps;
  }
};

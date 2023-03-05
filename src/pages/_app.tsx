import type { AppProps } from 'next/app'
import "../assets/css/app.css";


export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

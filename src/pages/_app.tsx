import Header from "@/components/header/Header";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SettingsProvider } from "@/context/setting-context";
import Footer from "@/components/footer";
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div id="app">
       <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-4ETGTF1G3G"
        strategy="afterInteractive"
      />
      <Script id="ga-script" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-4ETGTF1G3G');
        `}
      </Script>
      <SettingsProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </SettingsProvider>
    </div>
  );
}

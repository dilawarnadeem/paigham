import Header from '@/components/header/Header'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SettingsProvider } from '@/context/setting-context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div id="app">
      <SettingsProvider>
        <Header />
        <Component {...pageProps} />
      </SettingsProvider>
    </div>
  )
}

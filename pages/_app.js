import '@/styles/globals.css';
import { ProductsContextProvider } from '@/components/productsContext';
import '../styles/global.scss';
import { appWithTranslation } from 'next-i18next';
import React from 'react';
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';

import en from '../public/locales/en/translation.json';
import am from '../public/locales/am/translation.json';
import ru from '../public/locales/ru/translation.json';

const msg = {
  en,
  am,
  ru
}

function getDirection(locale) {
  return "ltr";
}

function App({Component, pageProps: 
  { ...pageProps } 
}) {
  const { locale } = useRouter(); 
  return (
    <React.Suspense fallback="...loading">
    <IntlProvider locale={locale} messages={msg[locale]}>
    <ProductsContextProvider>
        <Component {...pageProps} dir={getDirection(locale)}/>
    </ProductsContextProvider>
    </IntlProvider>
    </React.Suspense>
  );
}

export default appWithTranslation(App);
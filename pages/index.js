import { useState } from "react";
import Product from '../components/product';
import React from 'react';
import { findAllProducts } from "./api/model/Product";
import {initMongoose} from '../lib/mongoose';
import Layout from '../components/appLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";

export default function Home({products}) {
  const { t } = useTranslation();
  const [phrase, setPhrase ] = useState([]);
  const material = [...new Set(products.map(n => n.category))];

  var iterator = t('translation:category', {returnObjects: true});

  const [initialRenderComplete, setInitialRenderComplete] = React.useState(false);

  if( phrase ) {
    products = products.filter(p => p.name.toLowerCase().includes(phrase));
  }

	// This useEffect will only run once, during the first render
	React.useEffect(() => {
		// Updating a state causes a re-render
		setInitialRenderComplete(true);
	}, []);

  // initialRenderComplete will be false on the first render and true on all following renders
	if (!initialRenderComplete) {
		// Returning null will prevent the component from rendering, so the content will simply be missing from
		// the server HTML and also wont render during the first client-side render.
		return null;
	} else {
		return (
      <Layout>
        <div className="layout">
          {material.map(n => (
          <div key={n} id={n}>
            {products.find(p => p.category === n) && (
            <div className="menus flex">
              <h2 className="text-3xl capitalize py-5" style={{fontWeight: 'bold'}}>{iterator && iterator.map(x => x[n])}</h2>
              <div className="flex mx-5 overflow-x-scroll snap-x scrollbar-hide">
              {products.filter(p => p.category == n).map(productInfo => (
              <div key={productInfo._id} className="snap-start">
                {productInfo.subid && productInfo.subid[0] && (
                    <Product {...productInfo}/>
                )}
              </div>))}
              </div>
              </div>
            )}
          </div>
        ))}
        </div>
      </Layout>
    )
	}
}

export async function getServerSideProps({locale}) {
  await initMongoose();
  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      ...(await serverSideTranslations(locale, ['translation'])),
    }
  }
}
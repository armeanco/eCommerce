import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { productsContext } from './productsContext';
import Image from "next/image";
import React from 'react';
import Product from './product';
import { findAllProducts } from "../pages/api/model/Product";
import {initMongoose} from '../lib/mongoose';
/******Header-materials-content-images*********/
import logotype from        "../public/materials/prod/logotype1.png";
//import location from "../public/materials/prod/location.png";
//import cart     from     "../public/materials/prod/cart.jpg";
//import search   from   "../public/materials/prod/search.jpg";
//import user     from     "../public/materials/prod/user.png";
/*********************************************/
export default function Header() {
    const router = useRouter();
    const path = router.pathname;
    const { selectedProducts } = useContext(productsContext);

    const [sticky, setSticky] = useState("");

    const { t, i18n } = useTranslation();

    const [phrase, setPhrase ] = useState('');
    const [productInfo, setProductsInfo] = useState([]);
    const [isOpenFav, setOpenFav] = useState(false);

    const [isDisabled, setDisabled] = useState(false);

    const handleSumbit = () => {
        setDisabled(true);
    }

    const [isOpen, setIsOpen] = useState(false);
    const toggling = () => { setIsOpen(!isOpen), setPhrase('') };
    const favtoggle = () => setOpenFav(!isOpenFav);
    //const material = [...new Set(products.map(n => n.category))];
    useEffect(() => {
      fetch('/api/model/Product').
      then(response => response.json()).
      then(json => setProductsInfo(json));
    }, [])

    //console.log('header', productInfo);

    const categoriesNames  = [...new Set(productInfo.map(p => p.category))];

    var iterator = t('translation:category', {returnObjects: true});

    let products;
    if(phrase) {
      products = productInfo.filter(p => p.subid && p.subid[0] === p._id &&
                               p.name.toLowerCase().includes(phrase.toLowerCase())           || p.subid &&
                               p.description_am.toLowerCase().includes(phrase.toLowerCase()) || p.subid &&
                               p.description_en.toLowerCase().includes(phrase.toLowerCase()) || p.subid &&
                               p.description_ru.toLowerCase().includes(phrase.toLowerCase()));
    }
    else {
      products = productInfo;
    }

    const [initialRenderComplete, setInitialRenderComplete] = React.useState(false);

    const lngs = {
      en: { nativeName: <>{t('translation:en')}</> },
      am: { nativeName: <>{t('translation:am')}</> },
      ru: { nativeName: <>{t('translation:ru')}</> },
    };
    // on render, set listener
    useEffect(() => {
        window.addEventListener("scroll", isSticky);
        return () => {
            window.removeEventListener("scroll", isSticky);
        };
    }, []);

    let ids = [], favs = [];
    selectedProducts.map(x => x[0] !== 'f' ? ids.push(1) : favs.push(1));
    console.log(ids.length, selectedProducts);
    let getFavs = selectedProducts.filter(x => x[0].length < 5);
    console.log('favs', getFavs);
    console.log(isOpenFav);

    const isSticky = () => {
        const scrollTop = window.scrollY;
        const stickyClass = scrollTop >= 200 ? "is-sticky" : "";
        setSticky(stickyClass);
    };
    //console.log({productInfo})
    const classes = !isOpenFav ? `header-section d-none d-xl-block ${sticky}` : window.scrollY >= 200 && `header-section d-none d-xl-block is-sticky-fav`;
    console.log(sticky);
    
    return (
        <>
      <header className={classes}>
      <header className="flex menus items-center justify-between">
        {!isOpen && (
        <div className="flex items-center">
          <div href="" className="location">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          </div>
          <div className="flex gap-1">
            {Object.keys(lngs).map((lng) => (
            <Link key={lng} href={{
              pathname: path,
              query: { id: router.query.id },
            }} locale={lng}>
            <div>
              <h1 style={{textDecoration: 'none', color: '#656565', fontSize: 10, cursor: 'pointer'}} key={lng} onClick={() => i18n.changeLanguage(lng)} disabled={i18n.resolvedLanguage === lng}>{lngs[lng].nativeName}</h1>
            </div>
            </Link>
            ))}
            {/*{[...locales].map((locale) => (
              <Link key={locale} href="/" locale={locale}>
              <div><a style={{textDecoration: 'none', color: '#656565', fontSize: 10, cursor: 'pointer'}}>{locale}</a></div>
              </Link>
            ))}*/}
            </div>
          <div className="flex">
            {/*<div><br/><a style={{textDecoration: 'none', color: '#656565', fontSize: 10}} href="">ENG |</a></div>
            <div><br/><a style={{textDecoration: 'none', color: '#656565', fontSize: 10}} href="">ARM |</a></div>
  <div><br/><a style={{textDecoration: 'none', color: '#656565', fontSize: 10}} href="">RUS</a></div>*/}
            <div className="flex gap-1">
            {/*{Object.keys(lngs).map((lng) => (
            <a style={{textDecoration: 'none', color: '#656565', fontSize: 10, cursor: 'pointer'}} key={lng} onClick={() => i18n.changeLanguage(lng)} disabled={i18n.resolvedLanguage === lng}>{lngs[lng].nativeName}</a>
            ))}
            </div>*/}
            </div>
            {/*<Trans i18nKey="description">
              <div>{t('learn')}</div>
            </Trans>*/}
            </div>
          </div>
        )}
        {!isOpen && (
          <div className="logo"> 
          <Link href={'/'}>
            <Image
            alt="logotype"
            height={ !sticky ? 100 : 50 }
            src={logotype}
            width={ !sticky ? 100 : 50}
            loading="lazy" />
          </Link>
        </div>
        )}
        {/*<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>*/}
        <div className="inline-flex items-center justify-between gap-1.5 p-2 space-x-2 overflow-x-scroll snap-x scrollbar-hide" style={{marginTop: '0.8rem'}}>
          <div className='search-toggle' style={{opacity: isOpen ? 1 : 0, transition: 'opacity .3s ease-out'}}>
          {isOpen && (
            <>
            <div className='inline-flex'>
            <input value={phrase} onChange={e => setPhrase(e.target.value)} type="text" placeholder={t('translation:placeholder')} className="search-tag bg-gray-200 py-2 px-4 rounded-xl"/>
            <svg style={{cursor: 'pointer'}} xmlns="http://www.w3.org/2000/svg" onClick={toggling} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            </div>
            <div className="search-bar" style={{visibility: phrase.length < 1 ? 'hidden' : 'visible', display: phrase.length < 1 ? 'none' : 'block'}}>
            {categoriesNames.map(n => (
            <div key={n}>
            {products.find(p => p.category === n) && (
            <div className="search-items" style={{width: "85vmax"}}>
              <h2 className="text-2xl capitalize py-5">{iterator && iterator.map(x => x[n])}</h2>
              <div className="flex mx-5 overflow-x-scroll snap-x scrollbar-hide">
              {products.filter(p => p.category == n).map(productInfo => (
              <div key={productInfo._id} className="snap-start">
                <Product {...productInfo}/>
              </div>))}
              </div>
              </div>
            )}
          </div>
          ))}
          </div>
          </>
          )}
          </div>
          <div className="flex">
          {/*{isOpen && (
          <svg style={{cursor: 'pointer'}} xmlns="http://www.w3.org/2000/svg" onClick={toggling} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          )}*/}
          {!isOpen && (
          <>
          <svg style={{cursor: 'pointer'}} onClick={toggling} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          </>
          )}
          </div>
          {!isOpen && (
            <>
            <div className="flex">
            <Link href={'/checkout'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            </Link>
            <div className='flex'>
            <span>{selectedProducts && selectedProducts.length != 0 && (
              <span>{ids.length}</span>
            )}</span>
            </div>
            </div>
            <div className="flex">
            <svg style={{cursor: 'pointer'}} onClick={favtoggle} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            <span>{selectedProducts && selectedProducts.length != 0 && (
              <span>{favs.length}</span>
            )}</span>
            </div>
            </>
          )}
        </div>
      </header>
      <div className='content-flux'>
            {isOpenFav && (
              <li className="dropdown">
                {getFavs.map((x, y) => {
                  return (
                    <div className="flex menus mb-6" key={y}>
                        {products.map(prod => (
                            <div key={prod._id}>
                                {prod._id == x[1] && (
                                    <div className="flex mb-5">
                                    {/*<button onClick={() => decrease(y)} className="text-gray-500">*/}
                                    {/*</button>*/}
                                    <img className="w-24" src={prod.picture}/>
                                    <h3 className="font-bold leading-4">{i18n.language == 'en' ? prod.description_en : i18n.language == 'am' ?  prod.description_am :  prod.description_ru}</h3>
                                    <p className="font-bold leading-4">{prod.price}</p>
                                    {/*<p className="font-bold leading-4">{prod.colors[0]}</p>*/}
                                    </div>
                                )}
                            </div>
                        ))}
                        </div>
                  ) 
                })}
                </li>
            )}
      </div>
      {!sticky && (
        <div>
        <div className="flex justify-between font-bold" style={{marginLeft: "200px", marginRight: "200px", fontSize: 18}}>
          <div>
          <a style={{textDecoration: 'none', color: '#323232', fontSize: 13, cursor: 'pointer'}}>{t('translation:about')}</a>
          </div>
          <div>
          <a style={{textDecoration: 'none', color: '#323232', fontSize: 13, cursor: 'pointer'}}>{t('translation:contacts')}</a>
          </div>
          <div>
          <a style={{textDecoration: 'none', color: '#323232', fontSize: 13, cursor: 'pointer'}}>{t('translation:furniture')}</a>
          </div>
          <div>
            <a style={{textDecoration: 'none', color: '#323232', fontSize: 13, cursor: 'pointer'}}>{t('translation:shop')}</a>
          </div>
        </div>
      </div>
      )}
      </header>
    </>
    )
};

export async function getServerSideProps() {
  await initMongoose();
  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }
  }
}
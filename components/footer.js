import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { productsContext } from './productsContext';
import { useTranslation } from 'react-i18next';
import Image from "next/image";
/******Footer-content-supply*********/
import logotype  from              '../public/materials/prod/1.jpg';
import instagram from "../public/materials/prod/instagram_logo.png";
import facebook  from  '../public/materials/prod/facebook_logo.png';
/*********************************************/

export default function Footer() {
    const router = useRouter();
    const path = router.pathname;
    const {selectedProducts} = useContext(productsContext)
    const { t } = useTranslation();
    return (
        <>
        {/*<footer className="sticky botton-0 bg-white p-5 w-full flex justify-center space-x-5">
            <Link href={'/'}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
                <span>Home</span>
            </Link>
            <Link href={'/checkout'}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                <span>Cart {selectedProducts.length}</span>
            </Link>
    </footer>*/}
    <footer>
        <div className="footer p-5">
        <ul className="flex justify-between">
          <li className="service">
            <div className="service" >{t('translation:service')}</div>
            <div className="content" style={{color: 'rgb(73, 73, 73)'}}>
            <a href="" className="number">+374 11 11 11</a>
            <br/>
            <a href="" className="social">WhatsApp/Telegram +374 11 11 11</a>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <div className="address">{t('translation:address')}</div>
            <h3 className="content" style={{color: 'rgb(73, 73, 73)'}}>{t('translation:content')}</h3>
          </li>
          <li className="information">
          <div className="cinformation" >{t('translation:information')}</div>
          <div className="content" style={{color: 'rgb(73, 73, 73)'}}>
            <a href="" className="number">{t('translation:aboutcompany')}</a><br/>
            <a href="" className="social">{t('translation:design')}</a><br/>
            <a href="" className="number">{t('translation:payment')}</a><br/>
            <a href="" className="social">{t('translation:delivery')}</a><br/>
            <a href="" className="number">{t('translation:return')}</a><br/>
            <a href="" className="social">{t('translation:instruction')}</a><br/>
            <a href="" className="number">{t('translation:catalog')}</a><br/>
            <a href="" className="social">{t('translation:contactsfield')}</a>
          </div>
          </li>
          <li className="csocial">
            <div className="social">{t('translation:social')}</div>
            <div className="flex gap-2 p-1">
            <a href=""><Image style={{height: '25px', width: '25px'}}
            alt="instagram"
            src={instagram}/></a>
            <a href=""><Image style={{height: '25px', width: '25px'}}
            alt="facebook"
            src={facebook} /></a>
          </div>
          <div className="copywrite justify-between">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <a href=""><Image style={{height: '55px', width: '75px'}}
            alt="logotype"
            src={logotype} /></a>
            <div className="content" style={{color: 'rgb(73, 73, 73)'}}>© ARego, 2023</div>
          </div>
          </li>
        </ul>
      </div>
        </footer>
        </>
    );
}
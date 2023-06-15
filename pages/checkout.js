import { useContext, useEffect, useState } from "react";
import { productsContext } from "@/components/productsContext";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import Layout from '../components/checkLayout';
import React from 'react';

export default function Checkout() {
    const {selectedProducts, setSelectedProducts} = useContext(productsContext);
    const [productsInfos, setProductsInfos] = useState([]);
    const [productColor, setProductColor] = useState(productsContext);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [contact, setContact] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [isDisabled, setDisabled] = useState(false);

    const handleSumbit = () => {
        setDisabled(true);
    }

    /*function constructor() {
        super();
        this.state = { value: '' };
        this.onChange = this.onChange.bind(this);
        this.add = this.add.bind(this);
    }
    
    function add() {
        this.props.onButtonClick(this.state.value);
        this.setState({ value: '' });
    }
    
    function onChange(e) {
        this.setState({ value: e.target.value });
    }*/

    const { t, i18n } = useTranslation();
    let productIds = selectedProducts.filter(x => x[0].length > 5);
    useEffect(() => {
        const getId = [...new Set(productIds.map((x, y) => x[0]))];
        //const uIds = [...new Set(selectedProducts.map((x, y) => x[0]))];
        //const getId = [...new Set(selectedProducts)];
        //const idx = uIds.join(',');
        //console.log('ERRR....', getId);
        fetch('../api/model/Product?ids='+getId.join(',')).
        then(response => response.json()).
        then(json => setProductsInfos(json));
    }, [selectedProducts]);

    //console.log('unique', selectedProducts.map((x, y) => selectedProducts[y].length == 4 ? selectedProducts[y].filter((x, y) => x.length == 2) : 0));

    function increase(id) {
        setSelectedProducts(prev => [...prev, id]);
    }

    //console.log('selected', selectedProducts);

    //console.log(productsInfos);

    function decrease(id) {
        //const pos = selectedProducts.indexOf(id);
        console.log(id);
        if( id >= 0 ) {
            setSelectedProducts( prev => {
                return prev.filter((val,idx) => idx !== id);
            });
        }  
    }

    let subtotal = 0;
    const delivery = 1;
    console.log(productIds);
    if( productIds?.length ) {
        for( let id of productIds ) {
            const price = productsInfos.find(p => p._id === id[0])?.price || 0;
            subtotal += price;
        }
    }
    let total = subtotal + delivery;

    const [initialRenderComplete, setInitialRenderComplete] = React.useState(false);

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
                {!productIds.length && (
                    <div>{t('translation:cart')}</div>
                )}
                {/*{productsInfos.length != 0 && productsInfos.map(prod => {
                    const amount = selectedProducts.filter(id => id[0] === prod._id).length;
                    const cat = prod.category;
                    if (amount === 0) return;
                    return (
                    <div className="flex mb-5" key={prod._id}>
                    <div>
                        <div className="p-3 shrink-0"><img className="w-24" src={prod.picture}/></div>
                    </div>
                    <div className="pl-4">
                        <h3 className="font-bold leading-4">{i18n.language == 'en' ? prod.description_en : i18n.language == 'am' ?  prod.description_am :  prod.description_ru}</h3>
                    </div>
                    <div className="pl-4">
                        <p className="font-bold leading-4">{prod.price}</p>
                    </div>
                    <div className="pl-4">
                        <p className="font-bold leading-4">{prod.colors[0]}</p>
                    </div>
                    <div className="pl-4">
                    {selectedProducts.map((x, y) => {
                    return (
                        <div key={y}>
                        {x[0] == prod._id && (
                            <>
                                <p className="font-bold leading-4">{t('translation:height')}{selectedProducts[y].length == 4 ? x[1] : y}</p>
                                <br/>
                                <p className="font-bold leading-4">{t('translation:width')}{selectedProducts[y].length == 4 ? x[2] : y}</p>
                                <br/>
                                <p className="font-bold leading-4">{t('translation:depth')}{selectedProducts[y].length == 4 ? x[3] : y}</p>
                                <br/>
                                </>
                            )}
                        </div>        
                    )
                })}
                    </div>
                    <div className="mx-5">
                        <button onClick={() => decrease(prod._id)} className="border border-emerald-500 px-2 rounded-lg text-emerald-500">-</button>
                        <span className="px-2">
                            {selectedProducts && selectedProducts.filter(id => id[0] === prod._id).length}
                        </span>
                        <button onClick={() => increase(prod._id)} className="border border-emerald-500 px-2 rounded-lg text-emerald-500">+</button> 
                    </div>
                    </div>
                )})}*/}
                {productIds.map((x, y) => {
                    const amount = productIds.filter(id => id[0] === x[0]).length;
                    return (
                        <div className="flex menus mb-5" key={y}>
                        {productsInfos.map(prod => (
                            <div key={prod._id}>
                                {prod._id == x[0] && (
                                    <div className="flex mb-5">
                                    <button onClick={() => decrease(y)} className="text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                    </button>
                                    <img className="w-24" src={prod.picture}/>
                                    <h3 className="font-bold leading-4">{i18n.language == 'en' ? prod.description_en : i18n.language == 'am' ?  prod.description_am :  prod.description_ru}</h3>
                                    <p className="font-bold leading-4">{prod.price}</p>
                                    {/*<p className="font-bold leading-4">{prod.colors[0]}</p>*/}
                                    <div className="mx-5">
                        {/*<button onClick={() => increase(prod._id)} className="border border-emerald-500 px-2 rounded-lg text-emerald-500">+</button>*/}
                    </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="justify-between items-center">
                        <a>{t('translation:getdimensions')}{x[1]}</a>
                        </div>
                        </div>
                    )
                })}
                <form action="../api/model/checkout_stripe" method="POST">
                <div>
                    <input name="address" value={address} onChange={e=> setAddress(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="Street address, number"/>
                    <input name="city" value={city} onChange={e=> setCity(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="City and postal code"/>
                    <input name="phone" value={phone} onChange={e=> setPhone(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="Phone number"/>
                    <input name="email" value={email} onChange={e=> setEmail(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="Email address"/>
                    <input name="contact" value={contact} onChange={e=> setContact(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="Contact information"/>
                </div>
                <div className="mt-4">
                    <div className="flex my-3">
                        <h3 className="grow">{t('translation:subtotal')}</h3>
                        <h3>{subtotal}</h3>
                    </div>
                    <div className="flex my-3">
                        <h3 className="grow">{t('translation:delivery')}</h3>
                        <h3>{delivery}</h3>
                    </div>
                    <div className="flex my-3">
                        <h3 className="grow">{t('translation:total')}</h3>
                        <h3>{total}</h3>
                    </div>
                </div>
                    <input type="hidden" name="products" value={selectedProducts.join(',')}/>
                    <button type="submit" onClick={handleSumbit} disabled={address.length < 2 || city.length < 2 || email.length < 2 || phone.length < 2 || contact.length < 2 ? isDisabled : null} className="purchase">{t('translation:pay')} {total}</button>
                    </form>
            </Layout>
        );	
	}
}

export async function getServerSideProps({locale}) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['translation'])),
      }
    }
  }


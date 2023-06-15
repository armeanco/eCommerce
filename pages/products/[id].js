import Products from "@/model/Products";
import { initMongoose } from "@/lib/mongoose";

/*export default function ProductPage({product}) {
    return (
        <div>
            <Layout>
                {product.name}
            </Layout>
        </div>
    )
};

export async function getServerSideProps(context) {
    await initMongoose();
    const {id} = context.query;
    const product = await Products.findById(id);
    console.log({product});
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        }
    }
}*/
import { useContext, useEffect, useState } from "react";
import { productsContext } from "@/components/productsContext";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import Layout from "@/components/checkLayout";
import React from 'react';

export default function ProductPage({product}) {
    const [isDisabled, setDisabled] = useState(false);
    const [isOpenH, setOpenH] = useState(false);
    const [isOpenW, setOpenW] = useState(false);
    const [isOpenD, setOpenD] = useState(false);
    const [isA, setA] = useState(true);
    const [isB, setB] = useState(false);
    const [isC, setC] = useState(false);
    const [isX, addX] = useState(false);
    const [getX, setX] = useState(0);
    const [getIdH, setIdH] = useState(10);
    const [getIdW, setIdW] = useState(10);
    const [getIdD, setIdD] = useState(10);
    const { t, i18n } = useTranslation();
    const {setSelectedProducts} = useContext(productsContext);
    
    function addProduct() {
        setSelectedProducts(prev => [...prev, [product.subid[getX], product.dimensions[getIdH]]]);
    }

    //console.log(product.colors[getX]);

    const handleSumbit = () => {
        setDisabled(true);
    }

    const openStateH = () => {setOpenH(!isOpenH)};
    const openStateW = () => {setOpenW(!isOpenW)};
    const openStateD = () => {setOpenD(!isOpenD)};
    const triggerA = () => {setA(true); setB(false), setC(false); addX(false);}
    const triggerB = () => {setA(false); setB(true), setC(false); addX(false);}
    const triggerC = () => {setA(false); setB(false),setC(true); addX(false);setX(0);}
    const triggerX = () => {addX(true); setA(false); setB(false); setC(false);}

    /*function constructor() {
        645387d08ea34cac06dbe922
        645387bb8ea34cac06dbe922
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

    {/*const { t, i18n } = useTranslation();
    useEffect(() => {
        const uIds = [...new Set(chosenProducts)];
        fetch('../../api/model/Product?ids='+uIds.join(',')).
        then(response => response.json()).
        then(json => setProductsInfos(json));
    }, [chosenProducts]);

    function increase(id) {
        setChosenProducts(prev => [...prev, id]);
    }

    function decrease(id) {
        const pos = chosenProducts.indexOf(id);
        if( pos !== -1 ) {
            setChosenProducts( prev => {
                return prev.filter((val,idx) => idx !== pos);
            });
        }  
    }

    let subtotal = 0;
    const delivery = 1;
    if( chosenProducts?.length ) {
        for( let id of chosenProducts ) {
            const price = productsInfos.find(p => p._id === id)?.price || 0;
            subtotal += price;
        }
    }
    
let total = subtotal + delivery;*/}

    //console.log(product._id, getX);

    console.log(getIdH, getIdW, getIdD);

    //console.log(product);

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
                <div>
                <div className="p-2 flex justify-between">
                <img src={ isB ? product.tpicture : isC ? product.picture : isX ? product.subset && product.subset.filter((x, y) => y == getX) : product.upicture} style={{width: isC || isX ? '30vmax' : '50vmax'}}/>
                        <div className="content">
                            <p className="text-xl font-bold mt-1 leading-4" style={{color: '#abdbe3'}}>{i18n.language == 'en' ? product.description_en : i18n.language == 'am' ?  product.description_am :  product.description_ru}</p>
                            <div onClick={openStateH} className="flex font-bold mt-1 leading-4" style={{color: '#eec591', cursor: 'pointer'}}>{t('translation:dimensions')}
                            {!isOpenH && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="arrow w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            )}
                            {isOpenH && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="arrow w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                </svg>              
                            )}
                            </div>
                            {isOpenH && (
                                <>
                                {t('translation:height')}/
                                {t('translation:width')}/
                                {t('translation:depth')}
                                <li className="dropdown">
                                {product.dimensions && product.dimensions.length && product.dimensions.map((x, y) => (
                                        <h1 key={y} onClick={() => setIdH(y)} style={{cursor: 'pointer', backgroundColor: getIdH < 10 && getIdH == y ? '#DAFFF6' : 'white'}}>{x}</h1>
                                ))}
                                </li>
                                </>    
                                )}
                            {/*<p onClick={openStateH} style={{cursor: 'pointer', display: 'flex'}}>
                            {!isOpenH && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="arrow w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            )}
                            {isOpenH && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="arrow w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                </svg>                              
                            )}
                            {t('translation:height')}
                            </p>*/}
                            {/*{isOpenH && (
                                <div className="dropdown">
                                {product.height && product.height.length && product.height.map((x, y) => (
                                        <h1 key={y} onClick={() => setIdH(y)} style={{cursor: 'pointer', backgroundColor: getIdH < 10 && getIdH == y ? '#DAFFF6' : 'white'}}>{x}</h1>
                                ))}
                                {product.dimensions && product.dimensions.length && product.dimensions.map((x, y) => (
                                        <h1 key={y} onClick={() => setIdH(y)} style={{cursor: 'pointer', backgroundColor: getIdH < 10 && getIdH == y ? '#DAFFF6' : 'white'}}>{x}</h1>
                                ))}
                                </div>    
                                )}*/}
                            {/*<p onClick={openStateW} style={{cursor: 'pointer', display: 'flex'}}>
                            {isOpenW && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="arrow w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                </svg>                              
                            )}
                            {!isOpenW && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="arrow w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            )}
                            {t('translation:width')}
                            </p>*/}
                            {/*{isOpenW && (
                                <div className="dropdown">
                                {product.width && product.width.map((x, y) => (
                                    <h1 key={y} onClick={() => setIdW(y)} style={{cursor: 'pointer', backgroundColor: getIdW < 10 && getIdW == y ? '#DAFFF6' : 'white'}}>{x}</h1>
                                ))}
                                </div>    
                                )}*/}
                            {/*<p onClick={openStateD} style={{cursor: 'pointer', display: 'flex'}}>
                            {!isOpenD && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="arrow w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            )}
                            {isOpenD && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="arrow w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                </svg>                              
                            )}
                            {t('translation:depth')}
                            </p>*/}
                            {/*{isOpenD && (
                                <div className="dropdown">
                                {product.depth && product.depth.map((x, y) => (
                                    <h1 key={y} onClick={() => setIdD(y)} style={{cursor: 'pointer', backgroundColor: getIdD < 10 && getIdD == y ? '#DAFFF6' : 'white'}}>{x}</h1>
                                ))}
                                </div>
                                )}*/}
                            {product.colors && product.colors.map((x, y) => (
                                <button onClick={(e) => {setX(y); triggerX(e)}} className="dot" key={y} style={{backgroundColor: getX == y && !isA && !isB ? 'white' : x, border: getX == y && !isA && !isB ? '3px solid' : 'white', borderColor: getX == y && !isA && !isB ? x : 'white', width: getX == y && !isA && !isB ? '40px' : '30px', height: getX == y && !isA && !isB ? '40px' : '30px', marginLeft: "0.5vmax"}}/>
                            ))}
                            <button onClick={addProduct} className="add-to-cart">Add to cart</button>
                        </div>
                        <p className="text-sm mt-1 leading-4">{product.price}</p>
                    </div>
                    <div className="p-2 flex">
                    <img onClick={triggerA} src={product.upicture} style={{width: '15vmax', cursor: 'pointer', marginRight: "1vmax", opacity: isA ? '50%' : '100%', transition: 'opacity .5s ease-out'}}/>
                    <img onClick={triggerB} src={product.tpicture} style={{width: '15vmax', cursor: 'pointer', marginRight: "1vmax", opacity: isB ? '50%' : '100%', transition: 'opacity .5s ease-out'}}/>
                    <img onClick={triggerC} src={product.picture} style={{width: '10vmax', cursor: 'pointer', opacity: isC || isX ? '50%' : '100%', transition: 'opacity .5s ease-out'}}/>
                    </div>
                    <div className="mt-2">
                    <h3 style={{cursor: 'pointer'}} href="/" className="font-bold text-lg">{name}</h3>
                    </div>
        </div>
            </Layout>
        );	
	}
}
/*export async function getServerSidePropsContext(context) {
    await initMongoose();
    const {id} = context.query;
    const product = await Products.findById(id);
    console.log({product});
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        }
    }
}*/

export async function getServerSideProps(context) {
    await initMongoose();
    const {id} = context.query;
    const product = await Products.findById(id);
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['translation'])),
            product: JSON.parse(JSON.stringify(product)),
        }
    }
}

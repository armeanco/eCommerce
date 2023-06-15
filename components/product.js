import { productsContext } from "./productsContext"
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export default function Product({_id, name, description_en, description_am, description_ru, picture, price, height, width, depth}) {
    const { i18n } = useTranslation();
    const {setSelectedProducts} = useContext(productsContext);
    const [isOpen, setOpen] = useState(false);

    const toggle = () => setOpen(!isOpen);
    function addFavourite() {
        setSelectedProducts(prev => [...prev, ['f',_id]]);
    }
    return (
        <div className="w-56">
            <div className="p-5">
                <Link key={_id} href={`/products/${_id}`}>
                <img style={{cursor: 'pointer', width: '350px', height: '190px'}} href="/" onMouseOver={toggle} src={picture} alt=""/>
                </Link>
            </div>
            {/*<div className="mt-2">
                <h3 style={{cursor: 'pointer'}} href="/" className="font-bold text-lg">{name}</h3>
    </div>*/}
            <svg style={{cursor: 'pointer', opacity: isOpen ? '1' : '0', transition: 'opacity 0.5s ease'}} onClick={addFavourite} onMouseOut={toggle} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            <p style={{cursor: 'pointer', color: 'rgb(109,120,126)'}} className="font-bold p-1 text-lg leading-5">{i18n.language == 'en' ? description_en : i18n.language == 'am' ? description_am : description_ru}</p>
            <p className="text-sm mt-1 leading-4" style={{color: 'cyan'}}>{price}</p>
            {/*<button onClick={addProduct} className="border border-emerald-500 px-2 rounded-lg text-emerald-500">+</button>*/}
        </div>
    )
};
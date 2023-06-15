import { useContext, useEffect, useState } from 'react';
import Footer from './footer';
//import Header from './header';
import Header from './header';
import Menu from './menu';
import Catalog from './catalog';
import { productsContext } from './productsContext';
import Example from '../example/Example';

import { GlobalScrollProvider    } from    '../hooks/useGlobalScroll';
import { GlobalMouseMoveProvider } from '../hooks/useGlobalMouseMove';

import  ImageSlider  from '../core/ImageSlider';
import { SliderData } from '../core/SliderData';

function Wrapper({ children }) {
  return (
    <GlobalScrollProvider>
      <GlobalMouseMoveProvider>{children}</GlobalMouseMoveProvider>
    </GlobalScrollProvider>
  );
}

export default function Layout({children}) {
    const {setSelectedProducts} = useContext(productsContext);
    const [success, setSuccess] = useState(false);
    /*useEffect(() => {
        //setSelectedProducts([]);
        //setSuccess(true);
    }, []);*/
    return (
        <div>
            <Header/>
            <div className="slider">
                <ImageSlider slides={SliderData} />
            </div>
            <Catalog/>
            <div className="menu">
                <Menu/>
            </div>
            <div className="p-5">
                {/*{success && (
                    <div className="bg-green-400 text-white text-lg p-5 rounded-xl">
                        Order accepted!
                    </div>
                )}*/}
                {children}
            </div>
            <Wrapper>
                <Example/>
            </Wrapper>
            <Footer/>
        </div>
    )
}
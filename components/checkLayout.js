import { useContext, useEffect, useState } from 'react';
import Footer from './footer';
import Header from './header';
import { productsContext } from './productsContext';

export default function Layout({children}) {
    const {setSelectedProducts} = useContext(productsContext);
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        //setSelectedProducts([]);
        //setSuccess(true);
    }, []);
    return (
        <div>
            <Header/>
            {/*<div className="slider">
                <ImageSlider slides={SliderData} />
    </div>*/}
            {/*<Catalog/>*/}
            {/*<div className="menu">
                <Menu/>
</div>*/}
            <div className="p-5">
                {/*{success && (
                    <div className="bg-green-400 text-white text-lg p-5 rounded-xl">
                        Order accepted!
                    </div>
                )}*/}
                {children}
            </div>
            {/*<Wrapper>
                <Example/>
            </Wrapper>*/}
            <Footer/>
        </div>
    )
}
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import logotype from "../materials/logotype.png";
import location from "../materials/location.png"
import cart     from "../materials/cart.jpg";
import search   from "../materials/search.jpg";
import user     from "../materials/user.png";
/*********************************************/

export const Header = () => {
  const [sticky, setSticky] = useState("");

  // on render, set listener
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  const isSticky = () => {
    /* Method that will fix header after a specific scrollable */
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 0 ? "is-sticky" : "";
    setSticky(stickyClass);
  };

  const classes = `header-section d-none d-xl-block ${sticky}`;

  return (
    <>
      <header className={classes}>
      <div className="flex justify-between">
        <div className="flex items-center">
          <div href="" className="location">
            <LazyLoadImage
            alt={location.alt}
            height={30}
            src={location}
            width={30} />
          </div>
          <div className="flex gap-1">
            <div><br/><a style={{textDecoration: 'none', color: '#656565', fontSize: 10}} href="">ENG |</a></div>
            <div><br/><a style={{textDecoration: 'none', color: '#656565', fontSize: 10}} href="">ARM |</a></div>
            <div><br/><a style={{textDecoration: 'none', color: '#656565', fontSize: 10}} href="">RUS</a></div>
          </div>
        </div>
        <div>
          <a href="" className="flex items-center">
            <LazyLoadImage
            alt={logotype.alt}
            height={100}
            src={logotype}
            width={100} />
          </a>
        </div>
        <div className="flex items-center gap-1.5 p-2" style={{marginTop: '0.8rem'}}>
          <div className="flex">
          <a href="" className="flex">
            <LazyLoadImage
              alt={search.alt}
              height={20}
              src={search}
              width={17} />
            </a>
          </div>
          <div className="flex">
            <a href="" className="flex">
              <LazyLoadImage
              alt={cart.alt}
              height={25}
              src={cart}
              width={30} />
              </a>
          </div>
          <div className="flex">
            <a href="" className="flex">
              <LazyLoadImage
              alt={user.alt}
              height={25}
              src={user}
              width={25} />
            </a>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between" style={{marginLeft: "200px", marginRight: "200px", fontSize: 18}}>
          <div>
            <a href="" style={{textDecoration: 'none', color: '#323232'}}>О НАС</a>
          </div>
          <div>
            <a href="" style={{textDecoration: 'none', color: '#323232', borderWidth: 1,
    borderColor: "thistle", borderStyle: 'solid', paddingTop: 10, paddingRight: 10, paddingLeft: 10, paddingBottom: 10,
    borderRadius: 50}}>КОНТАКТЫ</a>
          </div>
          <div>
            <a href="" style={{textDecoration: 'none', color: '#323232'}}>МЕБЕЛЬ</a>
          </div>
          <div>
            <a href="" style={{textDecoration: 'none', color: '#323232'}}>МАГАЗИН</a>
          </div>
        </div>
      </div>
      </header>
    </>
  );
};

export default Header;
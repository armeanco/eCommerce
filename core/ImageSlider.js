import { SliderData } from './SliderData'
import { FaArrowRight, FaArrowLeft, FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import React, { useState } from 'react';
import Image from "next/image";

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FFBB28"];
  const delay = 10000;
  const timeoutRef = React.useRef(null);
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  React.useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    resetTimeout();
    //setTimeout(() => setCurrent(current === length - 1 ? 0 : current + 1), 10000)
    timeoutRef.current = setTimeout(
      () =>
        setCurrent(() =>
          current === length - 1 ? 0 : current + 1
        ),
      delay
    );

    return () => {resetTimeout();};
  }, [current]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className='slider'>
      {/*<FaArrowLeft className='left-arrow' onClick={prevSlide}  />
      <FaArrowRight className='right-arrow' onClick={nextSlide} />*/}
      {/*<div className='left-arrow' onClick={prevSlide}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-30 h-10">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>
      </div>
      <div className='right-arrow' onClick={nextSlide}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-30 h-10">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>

    </div>*/}
          <div className="slideshowDots">
        {colors.map((_, idx) => (
          <div
            key={idx}
            style={{cursor: 'pointer'}}
            className={`slideshowDot${current === idx ? " active" : ""}`}
            onClick={() => {
              setCurrent(idx);
            }}
          ></div>
        ))}
      </div>
      <div className='slideshow'>
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-current * 100}%, 0, 0)` }}
      >
      {SliderData.map((slide, index) => {
        return (
          <div
            className='slidee'
            key={index}
          >
            {index === current && (
              <Image src={slide.image} alt='travel image' className="canvas" style={{width: '100vmax', height: '60vmax'}} />
            )}
          </div>
        );
      })}
      </div>
      </div>
    </section>
  );
};

export default ImageSlider;
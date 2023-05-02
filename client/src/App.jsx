import { useState } from 'react'
import './App.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import  ImageSlider  from './components/ImageSlider';
import { SliderData } from './components/SliderData';
import { Header }  from './components/Header';

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="header">
      <Header/>
      <div className="slider">
         <ImageSlider slides={SliderData} />
      </div>
    </div>)
}

export default App

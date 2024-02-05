import React, { useEffect, useState } from 'react'

const BASE_URL = "http://localhost:8322"
export default function App() {
    const [images, setImages] = useState([])
    const [current, setCurrent] = useState(0);

    function  nextBtn(){
      setCurrent((current) => current >= images.length - 1 ? 0 : current + 1)
    }
    function prevBtn(){
      setCurrent((current) => current <= 0 ? images.length - 1 : current - 1)
    }


  useEffect(function(){
    async function fetchImage(){
      const res = await fetch(`${BASE_URL}/images`);
      const data = await res.json();
      setImages(data)
      
    }
    fetchImage();
  },[])
  
  return (
    <div className='w-full h-screen bg-slate-500 mx-auto flex items-center'>
    <div className='max-w-md bg-slate-500 rounded-2xl shadow-white shadow-md mx-auto relative'>
      <ImageList images={images} current={current} />
      <div className='absolute inset-0 flex items-center justify-between'>
        <Button onClick={prevBtn}>←</Button>
        <Button onClick={nextBtn}>→</Button>
      </div>
    </div>
  </div>
  )
}

function ImageList({images, current}){
  return <div>
        <ul className='flex w-full max-w-md' >
            {
              images.map((img, i) => <ImageSlide key={i} img={img} i={i} current={current}/> )
            }
        </ul>
  </div>
}
function ImageSlide({img, i, current}){
  return <li className={` opacity-0 ${current === i ? "flex items-center opacity-100" : "hidden"} `}>
          <img src={img.url} className=' w-80 h-64 rounded-2xl' alt={`img.url ${i} + 1`} />
        </li>
  
}

function Button({children, onClick}){
  return <button onClick={onClick} className='rounded-full w-9 h-9 text-2xl   bg-slate-300 '>{children}</button>
}
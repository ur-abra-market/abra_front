import React, { useRef, useEffect } from 'react';
import './ProductCanvas.css'

const ProductCanvas = () => {
  const canvasRef = useRef(null)

  const draw = (ctx, widthCanv, heightCanv) => {
    ctx.clearRect(0, 0, widthCanv, heightCanv);
    ctx.fillStyle = '#000000';    
    ctx.beginPath();
    ctx.font = "12px serif";
    ctx.fillText(`Chart Price ${widthCanv}x${heightCanv}`, 10, 12)
    ctx.lineWidth = 3;   
  }

  useEffect(() => {    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d');   
    const { width } = canvas;
    const { height } = canvas;   
    const widthCanv = width;
    const heightCanv = height; 
    draw(context, widthCanv, heightCanv)
  }, [])

  return (
    <div className='ProductCanvas'>
      <canvas ref={canvasRef} width={338} height={30} />
    </div>
  )
}

export default ProductCanvas
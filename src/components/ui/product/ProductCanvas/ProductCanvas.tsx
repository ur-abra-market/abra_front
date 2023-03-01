import React, { useRef, useEffect } from 'react';

import style from './ProductCanvas.module.css';

const ProductCanvas = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const draw = (ctx: any, widthCanv: number, heightCanv: number): void => {
    ctx.clearRect(0, 0, widthCanv, heightCanv);
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.font = '12px serif';
    ctx.fillText(`Chart Price ${widthCanv}x${heightCanv}`, 10, 12);
    ctx.lineWidth = 3;
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const { width } = canvas;
    const { height } = canvas;
    const widthCanv = width;
    const heightCanv = height;

    draw(context, widthCanv, heightCanv);
  }, []);

  return (
    <div className={style.productCanvas}>
      <canvas ref={canvasRef} width={338} height={30} />
    </div>
  );
};

export default ProductCanvas;

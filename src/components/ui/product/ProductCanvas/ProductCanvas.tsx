import React, { useEffect, useRef } from 'react'

import style from './ProductCanvas.module.css'

const ProductCanvas = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const draw = (ctx: any, widthCanv: number, heightCanv: number): void => {
    ctx.clearRect(0, 0, widthCanv, heightCanv)
    // eslint-disable-next-line no-param-reassign
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    // eslint-disable-next-line no-param-reassign
    ctx.font = '12px serif'
    // eslint-disable-next-line no-magic-numbers
    ctx.fillText(`Chart Price ${widthCanv}x${heightCanv}`, 10, 12)
    // eslint-disable-next-line no-param-reassign
    ctx.lineWidth = 3
  }

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const { width } = canvas
    const { height } = canvas

    draw(context, width, height)
  }, [])

  return (
    <div className={style.product_canvas}>
      <canvas ref={canvasRef} width={338} height={30} />
    </div>
  )
}

export default ProductCanvas

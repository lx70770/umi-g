import React, { SFC, useRef, useEffect, PureComponent } from 'react'
import { Canvas } from '@antv/g-canvas'
import { drawScale } from './scale'
import defaultConfig from './defaultConfig'
import style from './style.less'

interface SliderProps {
  config: Slider.Config
  onSliderChange: Function
}

// let { height, width, bgColor, strokeColor } = config

const Slider: SFC<SliderProps> = props => {
  let canvas: Canvas | null = null
  const { config, onSliderChange } = props
  const finalConfig = { ...defaultConfig, ...config }
  let { height, width: defaultWidth, autoWidth, bgColor } = finalConfig
  const wrapRef = useRef<HTMLDivElement>(null)

  const onResize = (): void => {
    if (canvas && wrapRef.current) {
      const width = autoWidth ? wrapRef.current.offsetWidth : defaultWidth
      canvas.changeSize(width!, height)
      canvas.clear()
      drawScale(canvas as any, onSliderChange, finalConfig)
    }
  }

  useEffect(() => {
    if (wrapRef.current) {
      const container = wrapRef.current
      const width = autoWidth ? wrapRef.current.offsetWidth : defaultWidth
      canvas = new Canvas({
        container,
        width: width!,
        height,
      })
      drawScale(canvas as any, onSliderChange, finalConfig)
    }
    return () => {
      if (canvas) {
        canvas.clear()
        canvas = null
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', onResize, false)
    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className={style.wrap}
      style={{ height, backgroundColor: bgColor }}
    />
  )
}

export default Slider

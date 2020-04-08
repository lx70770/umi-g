import React, { SFC, useRef, useEffect } from 'react'
import { Canvas } from '@antv/g-canvas'
import { drawScale } from './scale'
// import config from './config'
import style from './style.less'

interface AppProps {
  height: number
  wrapRef: {
    current: HTMLDivElement
  }
}

// let { height, width, bgColor, strokeColor } = config

const App: SFC<AppProps> = props => {
  let canvas: Canvas | null = null
  const { height = 38 } = props
  const wrapRef = useRef<HTMLDivElement>(null)

  const onResize = () => {
    if (canvas && wrapRef.current) {
      const width = wrapRef.current.offsetWidth
      canvas.changeSize(width, height)
      canvas.clear()
      drawScale(canvas as any)
    }
  }

  useEffect(() => {
    if (wrapRef.current) {
      const container = wrapRef.current
      const width = wrapRef.current.offsetWidth
      canvas = new Canvas({
        container,
        width,
        height,
      })
      drawScale(canvas as any)
    }
    return () => {
      canvas = null
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', onResize, false)
    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [])

  return <div ref={wrapRef} className={style.wrap} style={{ height }} />
}

export default App

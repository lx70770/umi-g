import React, { SFC, useRef, useEffect, PureComponent } from 'react'
import { Canvas } from '@antv/g-canvas'
import dayjs from 'dayjs'
import { drawScale } from './scale'
import defaultConfig from './defaultConfig'
import { formatConfig } from './utils'
import style from './style.less'

interface SliderProps {
  config: Slider.Config
  onSliderChange: Function
}

function checkProps(props: SliderProps) {
  const { config, onSliderChange } = props
  if (!onSliderChange || typeof onSliderChange !== 'function') {
    throw new TypeError('onSliderChange should be a function')
  }
  if (!Number.isInteger(config.height) || config.height <= 0) {
    throw new TypeError('config.height should be a positive integer')
  }
  // const { startTime, endTime, start, end } = config
  // if (startTime)
}

const Slider: SFC<SliderProps> = props => {
  let canvas: Canvas | null = null
  checkProps(props)

  const { config, onSliderChange } = props
  const finalConfig = { ...defaultConfig, ...config }
  let { height, width: defaultWidth } = finalConfig
  const wrapRef = useRef<HTMLDivElement>(null)

  const onResize = (): void => {
    if (canvas && wrapRef.current) {
      const width =
        defaultWidth === 'auto' ? wrapRef.current.offsetWidth : defaultWidth
      canvas.changeSize(width as number, height)
      canvas.clear()
      drawScale(canvas as any, onSliderChange, formatConfig(finalConfig))
    }
  }

  useEffect(() => {
    if (wrapRef.current) {
      const container = wrapRef.current
      const width =
        defaultWidth === 'auto' ? wrapRef.current.offsetWidth : defaultWidth
      canvas = new Canvas({
        container,
        width: width as number,
        height,
      })
      drawScale(canvas as any, onSliderChange, formatConfig(finalConfig))
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

  return <div ref={wrapRef} />
}

class App extends PureComponent {
  state = {
    height: 48,
    width: 'auto',
    startTime: 1585724171480,
    endTime: 1586328971480,
    start: 1586328971480 - 604800000 + 304800000,
    end: 1586328971480 - 104800000,
  }
  onSliderChange(range: number[], timeRange: number[]) {
    console.log(range)
    console.log(
      `timeRange ${dayjs(timeRange[0]).format('MM-DD HH:mm')} -  ${dayjs(
        timeRange[1],
      ).format('MM-DD HH:mm')}`,
    )
  }
  render() {
    return <Slider config={this.state} onSliderChange={this.onSliderChange} />
  }
}

export default App

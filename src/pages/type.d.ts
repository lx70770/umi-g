import { Canvas } from '@antv/g-canvas'
import dayjs from 'dayjs'

export as namespace Slider
interface Config {
  height: number
  width: number | string
  startTime: dayjs.ConfigType
  endTime: dayjs.ConfigType
  start?: dayjs.ConfigType
  end?: dayjs.ConfigType
  bgColor?: string
  strokeColor?: string
  textColor?: string
}

interface formattedConfig {
  height: number
  width: number | string
  startTime: number
  endTime: number
  start?: number
  end?: number
  bgColor?: string
  strokeColor?: string
  textColor?: string
}

interface CanvasCfg extends Canvas {
  cfg: {
    height: number
    width: number
  }
}

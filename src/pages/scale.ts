import { Canvas } from '@antv/g-canvas'
import dayjs from 'dayjs'
import initEvent from './event'

interface CanvasCfg extends Canvas {
  cfg: {
    height: number
    width: number
  }
}

export function drawScale(
  canvas: CanvasCfg,
  onSliderChange: Function,
  config: Slider.Config,
): void {
  const { cfg } = canvas
  const { height, width } = cfg
  const { strokeColor, textColor } = config

  // 画最上面底线
  canvas.addShape('line', {
    attrs: {
      x1: 0,
      y1: 0,
      x2: width,
      y2: 0,
      stroke: strokeColor,
      lineWidth: 1,
    },
  })
  // 画刻度  根据宽度计算出刻度条数
  const startTime = 1586328971480 - 604800000
  const endTime = 1586328971480
  //   console.log(dayjs(startTime).format('MM-DD'))
  //   console.log(dayjs(endTime).format('MM-DD'))
  const diff = Math.ceil(dayjs(endTime).diff(startTime, 'day', false))
  const maxInterval = width / diff
  const interval = maxInterval / 12
  const timeInterval = Math.abs(endTime - startTime) / diff / 12
  for (let i = 0; i < diff * 12 + 1; i++) {
    if (i % 12 === 0) {
      // 画长刻度和文本（日期）
      canvas.addShape('line', {
        attrs: {
          x1: interval * i,
          y1: 0,
          x2: interval * i,
          y2: (height * 1) / 2,
          stroke: strokeColor,
          lineWidth: 1,
        },
      })
      canvas.addShape('text', {
        attrs: {
          x: interval * i,
          y: (height * 1) / 2 + 16,
          fontFamily: 'PingFang SC',
          text: dayjs(startTime + timeInterval * i).format('MM-DD'),
          textAlign: 'center',
          fontSize: 12,
          fill: textColor,
        },
      })
    } else {
      // 画短刻度，没有文本
      canvas.addShape('line', {
        attrs: {
          x1: interval * i,
          y1: 0,
          x2: interval * i,
          y2: (height * 1) / 4,
          stroke: strokeColor,
          lineWidth: 1,
        },
      })
    }
  }

  // 画handler 图片链接 https://gw.alipayobjects.com/zos/rmsportal/QXtfhORGlDuRvLXFzpsQ.png
  // 初始化滑动事件
  initEvent(canvas, onSliderChange, interval)
}

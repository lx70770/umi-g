import dayjs from 'dayjs'
export default function initEvent(
  canvas: Slider.CanvasCfg,
  onSliderChange: Function,
  interval: number,
  config: Slider.formattedConfig,
) {
  const { cfg } = canvas
  const { height, width } = cfg
  const { startTime, endTime, start, end } = config
  const diffUnix = endTime - startTime
  const leftHandlerX = (((start as number) - startTime) / diffUnix) * width
  const rightHandlerX = (((end as number) - startTime) / diffUnix) * width

  if (leftHandlerX < rightHandlerX) {
    const leftHandler = canvas.addShape('image', {
      attrs: {
        x: leftHandlerX - 5,
        y: 0,
        width: 10,
        height,
        img:
          'https://gw.alipayobjects.com/zos/rmsportal/QXtfhORGlDuRvLXFzpsQ.png',
        cursor: 'col-resize',
        'z-index': 10,
      },
    })
    const rightHandler = canvas.addShape('image', {
      attrs: {
        x: rightHandlerX - 5,
        y: 0,
        width: 10,
        height,
        img:
          'https://gw.alipayobjects.com/zos/rmsportal/QXtfhORGlDuRvLXFzpsQ.png',
        cursor: 'col-resize',
        'z-index': 20,
      },
    })
    function callBack(): void {
      const leftX = leftHandler.attr('x')
      const rightX = rightHandler.attr('x')
      let range = [0, 1]
      let timeRange = Array(2)
      range[0] = (leftX + 5) / width
      range[1] = (rightX + 5) / width
      timeRange[0] = startTime + range[0] * diffUnix
      timeRange[1] = startTime + range[1] * diffUnix
      onSliderChange(range, timeRange)
    }

    /**
     * @description: 左边光标移动改变光标位置
     * @param {number} offsetX: 鼠标偏移量，优化滑动位置
     * @return: void
     */
    function leftMouseMove(ev: MouseEvent, offsetX: number): void {
      const { x } = ev
      leftHandler.attr('x', x - offsetX)

      const leftX = leftHandler.attr('x')
      const rightX = rightHandler.attr('x')
      if (leftX > rightX - interval) {
        rightHandler.attr('x', x - offsetX + interval)
      }
      callBack()
    }

    function rightMouseMove(ev: MouseEvent, offsetX: number): void {
      const { x } = ev
      rightHandler.attr('x', x - offsetX)
      const leftX = leftHandler.attr('x')
      const rightX = rightHandler.attr('x')
      if (rightX < leftX + interval) {
        leftHandler.attr('x', x - offsetX - interval)
      }
      callBack()
    }

    leftHandler.on('mousedown', (ev: MouseEvent): void => {
      ev.stopPropagation()
      const { x } = ev
      const leftX = leftHandler.attr('x')
      canvas.on('mousemove', (e: MouseEvent) => leftMouseMove(e, x - leftX))
    })
    rightHandler.on('mousedown', (ev: MouseEvent): void => {
      ev.stopPropagation()
      const { x } = ev
      const rightX = rightHandler.attr('x')
      canvas.on('mousemove', (e: MouseEvent) => rightMouseMove(e, x - rightX))
    })
    canvas.on('mouseup', (): void => {
      canvas.off('mousemove')
    })
    canvas.on('mouseleave', (): void => {
      canvas.off('mousemove')
    })
  }
}

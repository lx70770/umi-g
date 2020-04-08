import { Canvas } from '@antv/g-canvas'

export default function initEvent(canvas: Canvas, interval: number) {
  const leftHandlerX = 120
  const rightHandlerX = 320

  if (leftHandlerX < rightHandlerX) {
    const leftHandler = canvas.addShape('image', {
      attrs: {
        x: leftHandlerX,
        y: 0,
        width: 10,
        height: 38,
        img:
          'https://gw.alipayobjects.com/zos/rmsportal/QXtfhORGlDuRvLXFzpsQ.png',
        cursor: 'col-resize',
        'z-index': 10,
      },
    })
    const rightHandler = canvas.addShape('image', {
      attrs: {
        x: rightHandlerX,
        y: 0,
        width: 10,
        height: 38,
        img:
          'https://gw.alipayobjects.com/zos/rmsportal/QXtfhORGlDuRvLXFzpsQ.png',
        cursor: 'col-resize',
        'z-index': 20,
      },
    })

    // eslint-disable-next-line no-inner-declarations
    function leftMouseMove(ev: MouseEvent): void {
      const { x } = ev
      const leftX = leftHandler.attr('x')
      const rightX = rightHandler.attr('x')
      if (leftX < rightX) {
        leftHandler.attr('x', x)
      } else {
        leftHandler.attr('x', x)
        rightHandler.attr('x', x + interval)
      }
    }

    // eslint-disable-next-line no-inner-declarations
    function rightMouseMove(ev: MouseEvent): void {
      const { x } = ev
      const leftX = leftHandler.attr('x')
      const rightX = rightHandler.attr('x')
      if (leftX < rightX) {
        rightHandler.attr('x', x)
      } else {
        rightHandler.attr('x', x)
        leftHandler.attr('x', x - interval)
      }
    }

    leftHandler.on('mousedown', (ev: MouseEvent): void => {
      ev.stopPropagation()
      canvas.on('mousemove', leftMouseMove)
    })
    rightHandler.on('mousedown', (ev: MouseEvent): void => {
      ev.stopPropagation()
      canvas.on('mousemove', rightMouseMove)
    })
    canvas.on('mouseup', (): void => {
      canvas.off('mousemove')
    })
    canvas.on('mouseleave', (): void => {
      canvas.off('mousemove')
    })
  }
}

import dayjs from 'dayjs'

interface TimeProps {
  startTime: number
  endTime: number
}

export function extendTimeLine(startTime: number, endTime: number): TimeProps {
  return { startTime, endTime }
}

export function formatConfig(config: Slider.Config): Slider.formattedConfig {
  let { startTime, endTime, start, end } = config
  startTime = dayjs(startTime).valueOf()
  endTime = dayjs(endTime).valueOf()
  start = start ? dayjs(start).valueOf() : startTime
  end = end ? dayjs(end).valueOf() : endTime
  return Object.assign({}, config, { startTime, endTime, start, end })
}

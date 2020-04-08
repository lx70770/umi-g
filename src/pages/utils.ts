interface TimeProps {
  startTime: number
  endTime: number
}

export function extendTimeLine(startTime: number, endTime: number): TimeProps {
  return { startTime, endTime }
}

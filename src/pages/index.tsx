import React, { SFC, useRef, useEffect } from 'react'
import styles from './index.less'

interface AppProps {
  height: number
}

const App: SFC<AppProps> = props => {
  const { height = 38 } = props
  const wrapRef = useRef()

  useEffect(() => {
    console.log(wrapRef.current)
  }, [])

  return <div ref={wrapRef} className={styles.wrap} />
}

export default App

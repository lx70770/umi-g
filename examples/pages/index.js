import React, { PureComponent } from 'react'
import Slider from '../../dist'

export default class Demo extends PureComponent {
  onSliderChange(left, right) {
    console.log(`range ${left} - ${right}`)
  }
  render() {
    return (
      <Slider config={{ height: 38 }} onSliderChange={this.onSliderChange} />
    )
  }
}

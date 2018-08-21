import React, { PureComponent } from 'react'
import { DatePicker } from 'antd'

class Root extends PureComponent {
  render () {
    return (
      <div>
        {this.state.counter}
        <DatePicker />
      </div>
    )
  }
}

export default Root
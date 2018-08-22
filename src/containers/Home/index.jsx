import React, { PureComponent } from 'react'
import { autobind } from 'core-decorators'

@autobind
class Home extends PureComponent {
  render () {    
    return (
      <div>
        主页
      </div>
    )
  }
}

export default Home
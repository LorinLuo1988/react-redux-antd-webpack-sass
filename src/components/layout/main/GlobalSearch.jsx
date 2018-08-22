import React from 'react'
import { Input, Icon, message } from 'antd'

class GlobalSearch extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      searchValue: ''
    }
    this.search = this.search.bind(this)
    this.searchChange = this.searchChange.bind(this)
  }
  search () {
    const { searchValue } = this.state
    if (!searchValue) return message.warning('输入点什么呗！')
  }
  searchChange (event) {
    this.setState({
      searchValue: event.target.value
    })
  }
  render () {
    const { searchValue } = this.state
    const suffix = <Icon
      type="search"
      style={{ cursor: 'pointer' }}
      onClick={this.search} />
    return (
      <Input
        value={searchValue}
        suffix={suffix}
        onChange={this.searchChange}
        onPressEnter={this.search}
        placeholder="搜索案件姓名、诉讼案号"
        style={{ width: 300, marginLeft: 60 }} />
    )
  }
}

export default GlobalSearch
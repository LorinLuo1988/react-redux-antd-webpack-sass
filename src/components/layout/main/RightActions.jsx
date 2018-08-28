import React from 'react'
import { Icon } from 'antd'

const User = () => {
  return (
    <div className="right-actions">
      <span>Lorin</span>
      <div className="action">
        <Icon type="logout" />
        退出
      </div>
    </div>
  )
}

export default User
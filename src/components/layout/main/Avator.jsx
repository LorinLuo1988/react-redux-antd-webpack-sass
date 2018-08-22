import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'

const CompanyInfo = () => {
  return (
    <div className="avator">
      <Icon type="github" />
    </div>
  )
}

CompanyInfo.propTypes = {
  url: PropTypes.string
}

export default CompanyInfo
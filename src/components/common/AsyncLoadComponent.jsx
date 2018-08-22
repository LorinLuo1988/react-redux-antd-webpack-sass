import React from 'react'
import Loadable from 'react-loadable'

const AsyncLoadComponent = loader => Loadable({
  loader,
  loading: () => <div></div>
})

export default AsyncLoadComponent
import { all } from 'redux-saga/effects'
import { commonReducer } from './common'

const reducers = {
  commonReducer
}

function* rootSaga () {
  yield all([])
}

export {
  reducers,
  rootSaga
}

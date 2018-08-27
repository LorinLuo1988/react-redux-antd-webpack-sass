import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { reducers, rootSaga } from '@/redux'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  combineReducers(reducers),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

if (module.hot) {
  module.hot.accept('./redux', () => {
    store.replaceReducer(combineReducers(reducers))
  })
}

export default store
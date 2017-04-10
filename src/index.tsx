import {DelegateContainer} from 'preact-delegate'
import {createElement as h} from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {createStore} from 'redux'
import {reducer} from './reducer/index'

import '../styles/styles.scss'
import {App} from './app'

const store = createStore(reducer)

function Root() {
  return (
    <Provider store={store}>
      <DelegateContainer>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DelegateContainer>
    </Provider>
  )
}

render(<Root />, document.body)
const spinner = document.querySelector('.splash')
document.body.removeChild(spinner)

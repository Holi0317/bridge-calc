import {h, Component} from 'preact'
import {Button} from 'react-toolbox/components/button'
import Collapse from 'react-collapse'
import {bind} from 'decko'
import style from './entry.css'

export class Entry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      optionsOpened: false
    }
  }

  @bind
  toggleCollapse() {
    this.setState(state => ({
      optionsOpened: !state.optionsOpened
    }))
  }

  render() {
    return (
      <div className="container">
        <h3>Player Names</h3>
        <div>name-input-list</div>
        <hr />

        <Button onMouseUp={this.toggleCollapse} label="Options" raised className={style.optionsBtn} />
        <Collapse isOpened={this.state.optionsOpened}>
          Entry-options
        </Collapse>

        <Button label="Start" raised accent className={style.startBtn} />
      </div>
    )
  }
}

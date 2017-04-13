import {h, Component} from 'preact'
import {connect} from 'preact-redux'
import {Button, IconButton} from 'react-toolbox/components/button'
import Tooltip from 'react-toolbox/components/tooltip'
import MdAdd from 'react-icons/md/add'
import MdFileDownload from 'react-icons/md/file-download'
import Collapse from 'react-collapse'
import {NameInputList} from './name-input-list'
import {UI_ENTRY_OPTION_OPEN_TOGGLE, UI_ENTRY_PLAYER_NAMES_SET, UI_ENTRY_ADD_PLAYER} from './action'
import {genRandomNames, randomName} from './example-names'
import style from './entry.css'

const IconButtonTooltip = Tooltip(IconButton)

class DisconnectedEntry extends Component {
  componentWillMount() {
    this.props.genOptions()
  }

  /**
   * Entry view element. Contains form need to be filled in before starting game.
   * @param {Object} props - React properties. Mostly are meant to be injected by react-redux
   * @param {boolean} props.optionsOpened - Indicates if the collapse should open or not
   * @param {string[]} props.playerNames
   * @param {Function} props.toggleCollapse - Toggle options collapse
   * @param {Function} props.changePlayerNames
   * @returns {XML}
   */
  render(props) {
    return (
      <div className="container">
        <h3>Player Names</h3>
        <NameInputList names={props.playerNames} onChange={props.changePlayerNames} />
        <div>
          <IconButtonTooltip icon={<MdAdd />} tooltip="Add player" onMouseUp={props.addPlayer} />
          <IconButtonTooltip icon={<MdFileDownload />} tooltip="Import names" className="pull-right" onMouseUp={props.importNames} />
        </div>
        <hr />

        <Button onMouseUp={props.toggleCollapse} label="Options" raised className={style.optionsBtn} />
        <Collapse isOpened={props.optionsOpened}>
          Entry-options
        </Collapse>

        <Button label="Start" raised accent className={style.startBtn} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.ui.entry
  // TODO Compute properties. Like error
})

function mapDispatchToProps(dispatch) {
  return {
    toggleCollapse() {
      dispatch({type: UI_ENTRY_OPTION_OPEN_TOGGLE})
    },
    changePlayerNames(payload) {
      dispatch({type: UI_ENTRY_PLAYER_NAMES_SET, payload})
    },
    genOptions() {
      const payload = genRandomNames()
      dispatch({type: UI_ENTRY_PLAYER_NAMES_SET, payload})
    },
    addPlayer() {
      dispatch({type: UI_ENTRY_ADD_PLAYER, payload: randomName()})
    },
    importNames() {
      // TODO NYI
    }
  }
}

export const Entry = connect(mapStateToProps, mapDispatchToProps)(DisconnectedEntry)

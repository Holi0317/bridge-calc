import {h, Component} from 'preact'
import {connect} from 'preact-redux'
import {translate} from 'react-i18next'
import {Button, IconButton} from 'react-toolbox/components/button'
import Tooltip from 'react-toolbox/components/tooltip'
import MdAdd from 'react-icons/md/add'
import MdFileDownload from 'react-icons/md/file-download'
import Collapse from 'react-collapse'
import {NameInputList} from './name-input-list'
import {OPTION_OPEN_TOGGLE, PLAYER_NAMES_SET, ADD_PLAYER} from '../actions/ui/entry'
import {EntryOptions} from './entry-options'
import {genRandomNames, randomName} from '../example-names'
import {entryOptionsValidator} from '../validators/entry-options'
import {isOk} from '../utils'
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
    const {t} = props
    return (
      <div className="container">
        <h3>{t('Player Names')}</h3>
        <NameInputList names={props.playerNames} onChange={props.changePlayerNames} />
        <div>
          <IconButtonTooltip icon={<MdAdd />} tooltip={t('Add player')} onMouseUp={props.addPlayer} />
          <IconButtonTooltip icon={<MdFileDownload />} tooltip={t('Import names')} className="pull-right" onMouseUp={props.importNames} />
        </div>
        <hr />

        <Button onMouseUp={props.toggleCollapse} label={t('Options')} raised className={style.optionsBtn} />
        <Collapse isOpened={props.optionsOpened}>
          <EntryOptions />
        </Collapse>

        <Button label={t('Start')} raised accent className={style.startBtn} disabled={!props.valid} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.ui.entry,
  valid: isOk(entryOptionsValidator(state.ui.entry))
})

function mapDispatchToProps(dispatch) {
  return {
    toggleCollapse() {
      dispatch({type: OPTION_OPEN_TOGGLE})
    },
    changePlayerNames(payload) {
      dispatch({type: PLAYER_NAMES_SET, payload})
    },
    genOptions() {
      const payload = genRandomNames()
      dispatch({type: PLAYER_NAMES_SET, payload})
    },
    addPlayer() {
      dispatch({type: ADD_PLAYER, payload: randomName()})
    },
    importNames() {
      // TODO NYI
    }
  }
}

export const Entry = connect(mapStateToProps, mapDispatchToProps)(translate()(DisconnectedEntry))

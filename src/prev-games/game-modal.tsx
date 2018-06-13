import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {Dispatch, IRootState, ITranslateMixin} from '../types'
import {modalEntrySelector} from './selectors/modal-entry'
import {replaceCurrentGameAction} from '../score-input/actions/replace-current-game'
import {deleteGameAction} from './actions/delete-game'
import {RouteComponentProps, withRouter} from 'react-router'
import withMobileDialog from '@material-ui/core/withMobileDialog/withMobileDialog'
import Dialog from '@material-ui/core/Dialog/Dialog'
import {closeGameModalAction} from './actions/game-modal'
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent/DialogContent'
import DialogActions from '@material-ui/core/DialogActions/DialogActions'
import Button from '@material-ui/core/Button/Button'
import {EntryDetail} from './entry-detail'
import {Scoreboard} from '../score-input/scoreboard'
import AppBar from '@material-ui/core/AppBar/AppBar'
import IconButton from '@material-ui/core/IconButton/IconButton'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import Typography from '@material-ui/core/Typography/Typography'
import CloseIcon from '@material-ui/icons/Close'
import styles from './prev-games.css'

const mapStateToProps = (state: IRootState) => ({
  entry: modalEntrySelector(state),
  index: state.prevGames.modalEntry
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    close: closeGameModalAction,
    load: replaceCurrentGameAction,
    del: deleteGameAction
  }, dispatch)

type stateType = ReturnType<typeof mapStateToProps>
type dispatchType = ReturnType<typeof mapDispatchToProps>

export class GameModalImpl extends React.Component {
  public props: stateType & dispatchType & {fullScreen: boolean} & ITranslateMixin & RouteComponentProps<any>

  public render() {
    const {entry, fullScreen, close, t} = this.props

    return <Dialog
      fullScreen={fullScreen}
      open={entry != null}
      onClose={close}
      aria-labelledby="game-modal-title"
    >

      {fullScreen ? (
        <AppBar className={styles.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={close} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={styles.flex}>
              {t('Previous game details')}
            </Typography>
            <Button color="inherit" onClick={this.del}>
              {t('Load')}
            </Button>
          </Toolbar>
        </AppBar>
      ) : (
        <DialogTitle id="game-modal-title">{t('Previous game details')}</DialogTitle>
      ) }

      {entry != null && (
        <DialogContent>
          <EntryDetail entry={entry} />
          <Scoreboard entry={entry} mini={false} />
        </DialogContent>
      )}

      <DialogActions>
        <Button onClick={this.del} color="primary">
          {t('Delete')}
        </Button>
        {!fullScreen && (
          <Button onClick={this.load} color="primary" autoFocus>
            {t('Load')}
          </Button>
        )}
      </DialogActions>

    </Dialog>
  }

  private del = () => {
    const {index, del, close} = this.props
    if (index != null) {
      close()
      del(index)
    }
  }

  private load = () => {
    const {entry, load, history} = this.props
    if (entry != null) {
      load(entry)
      history.push('/score-input')
    }
  }
}

export const GameModal = flowRight(
  translate(),
  withRouter,
  withMobileDialog(),
  connect(mapStateToProps, mapDispatchToProps)
)(GameModalImpl)

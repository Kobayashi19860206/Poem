import React from 'react'
import { connect } from 'react-redux'
import * as poemActions from 'src/ducks/poems'
import * as selectablePoemDuck from 'src/ducks/selectablePoem.js'
import { _showOnSignUp } from 'src/ducks/logIn.js'
import StyleToolbar from 'src/components/selectable/StyleToolbar'
import Poem from 'src/components/poem/Poem.jsx'

class StyleView extends React.Component {
  componentWillMount() {
    const { makePoemUnselectable, selectablePoem } = this.props
    if (selectablePoem.passage) {
      makePoemUnselectable(selectablePoem)
    } else {
      this.props.router.push('/new/write')
    }
  }

  render() {
    const { poem, router, updateStyle, updateColor, currentUserId, createPoem, updatePoem, showOnSignUp, makePoemUnselectable, params } = this.props
    const backgroundId = poem ? poem.backgroundId : null
    const colorRange = poem ? poem.colorRange : null
    const styleProps = {
      updateStyle,
      updateColor,
      backgroundId,
      colorRange,
      params,
      router,
      currentUserId,
      showOnSignUp,
      makePoemUnselectable,
      createPoem,
      updatePoem,
      poem,
    }
    return (
      <div className="close-up-poem-view">
        <h1>Stylize</h1>
        <StyleToolbar {...styleProps} />
        <Poem poem={poem} />
      </div>
    )
  }
}

StyleView.propTypes = {
  currentUserId: React.PropTypes.number,
  selectablePoem: React.PropTypes.object,
  poem: React.PropTypes.object,
  router: React.PropTypes.object,
  params: React.PropTypes.object,
  makePoemUnselectable: React.PropTypes.func,
  showOnSignUp: React.PropTypes.func,
  updateStyle: React.PropTypes.func,
  updateColor: React.PropTypes.func,
  createPoem: React.PropTypes.func,
  updatePoem: React.PropTypes.func,
}

const mapDispatchToProps = {
  makePoemUnselectable: poemActions.makePoemUnselectable,
  updateStyle: poemActions.updateStyle,
  updateColor: poemActions.updateColor,
  createPoem: poemActions.handleCreatePoem,
  updatePoem: poemActions.handleUpdatePoem,
  showOnSignUp: _showOnSignUp,
}

function mapStateToProps(state) {
  return {
    selectablePoem: state.selectablePoem, // TODO: make bool
    poem: poemActions.getNpPoem(state),
    currentUserId: state.current.userId,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StyleView)

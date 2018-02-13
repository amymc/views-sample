import React from 'react'
import App from './App.view.js'

export default class AppLogic extends React.Component {
  state = {
    isLoading: false,
    isOrchidLoading: false,
  }

  onClick = () => {
    this.setState({ isLoading: !this.state.isLoading })
  }

  onOrchidClick = () => {
    this.setState({ isOrchidLoading: !this.state.isOrchidLoading })
  }

  render() {
    return (
      <App
        {...this.props}
        {...this.state}
        onClick={this.onClick}
        onOrchidClick={this.onOrchidClick}
      />
    )
  }
}

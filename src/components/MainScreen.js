import React from 'react'
import { init } from '../scripts'

export default class MainScreen extends React.Component {
  componentDidMount () {
    init()
  }

  render () {
    return (
      <div className="container">
        <div id="compass" className="compass-container">
          <div className="ring-container">
            <ul id="ring" className="ring"></ul>
          </div>
          <div className="dials-container">
            <div id="dials">
              <div className="dials-cap"></div>
            </div>
          </div>
        </div>
        <div className="text-container">
          <hr />
          <div className="text-box instruction-text">
          </div>
          <div className="text-box flavor-text hidden">
            <div id="emoji-output"></div>
            <div id="flavor-text-output"></div>
          </div>
        </div>
      </div>
    )
  }
}

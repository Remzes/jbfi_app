import React from 'react'

import PersonalInfo from './PersonalInfo'

class SetupProfile extends React.Component {
  render() {
    return (
      <div className="SetupProfile">
        <div>Profile Container</div>
        <PersonalInfo />
      </div>
    )
  }
}

export default SetupProfile
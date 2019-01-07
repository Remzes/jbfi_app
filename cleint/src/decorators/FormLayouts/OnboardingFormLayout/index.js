import React from 'react'

class OnboardingFormLayout extends React.Component {
  render() {
    const { title } = this.props
    return (
      <div className="onboarding_form_layout">
        <div className="onboarding_form_layout__head">
          <div className="onboarding_form_layout__head__title">{title}</div>
        </div>
        <div className="onboarding_form_layout__body">
          <div className="onboarding_form_layout__body__form">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default OnboardingFormLayout

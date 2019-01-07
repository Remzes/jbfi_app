import React from 'react'

class AuthFormLayout extends React.Component {
  render() {
    const { title, subTitle } = this.props
    return (
      <div className="form_layout">
        <div className="form_layout__head">
          <div className="form_layout__head__title">{title}</div>
        </div>
        <div className="form_layout__body">
          <div className="form_layout__body__login-options">
            <div className="form_layout__body__login-options__subTitle">{subTitle}</div>
            <div className="form_layout__body__login-options__services">
              ADD SERVICES TO LOGIN
            </div>
            <div className="form_layout__body__login-options__line">
              <div className="or">or</div>
            </div>
          </div>
          <div className="form_layout__body__form">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default AuthFormLayout

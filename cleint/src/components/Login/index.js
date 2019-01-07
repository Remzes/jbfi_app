import React from 'react'
import customField from '../../decorators/Fields/inputs/customAuthField'
import {reduxForm, Form, Field} from 'redux-form'
import {connect} from 'react-redux'
import {Button, Spin} from 'antd'
import {requestLogin} from '../../ducks/auth'
import {Link} from 'react-router-dom'

import AuthFormLayout from '../../decorators/FormLayouts/AuthFormLayout/index'
import Section from '../../decorators/Section'

class Login extends React.Component {

  render() {
    const {handleSubmit, pristine, submitting, auth} = this.props
    return (
      <React.Fragment>
        <Section className="Register">
          <Spin spinning={auth.fetching}>
            <Form autoComplete="off" className="Register__form"
                  onSubmit={handleSubmit(values => this.props.requestLogin(values))}>
              <AuthFormLayout title="Login" subTitle="Login with a help of the services">
                <div className="Register__form__field-container field-group">
                  <Field className="input" placeholder="Username (no special characters)" name="user[username]"
                         id="username" type="text" component={customField}/>
                  <Field className="input" placeholder="Password (minimum 8 characters)" name="user[password]"
                         id="password" type="password" component={customField}/>
                </div>
                <div className="form-buttons">
                  <Button htmlType="submit" className="button -primary" type="primary" disabled={submitting}>
                    Login
                  </Button>
                </div>
                <div className="form-footer">
                  <a className="link" href="#">Remember password</a> {' '}
                  or <a className="link" href="#">confirm email</a>
                </div>
              </AuthFormLayout>
            </Form>
          </Spin>
        </Section>
        <div className="footer-helpers">
          <Link className="link" to="/register">Register</Link> a new account
        </div>
      </React.Fragment>
    )
  }
}

export default connect(state => ({auth: state.auth}), {requestLogin})(
  reduxForm({form: 'loginForm'})
  (Login)
)
import React from 'react'
import {connect} from 'react-redux'
import {reduxForm, Form, Field} from 'redux-form'
import {Button, Spin} from 'antd'
import {Link} from 'react-router-dom'
import validate from '../../helpers/helpers/fieldLevelValidationForm'

import AuthFormLayout from '../../decorators/FormLayouts/AuthFormLayout/index'
import Section from '../../decorators/Section'
import customField from '../../decorators/Fields/inputs/customAuthField'
import {requestRegistration} from '../../ducks/auth'

class Register extends React.Component {
  render() {
    const {pristine, submitting, handleSubmit, auth} = this.props
    return (
      <React.Fragment>
        <Section className="Register">
          <Form autoComplete="off" className="Register__form"
                onSubmit={handleSubmit(values => this.props.requestRegistration(values))}>
            <Spin spinning={auth.fetching}>
              <AuthFormLayout title="Registration" subTitle="Register with a help of the services">
                <div className="Register__form__field-container field-group">
                  <Field className="input" placeholder="Username (no special characters)" name="user[username]"
                         id="username" type="text" component={customField}
                         validate={[validate.required, validate.minValue4, validate.noSpecialCharacters]}/>
                  <Field className="input" placeholder="Email" name="user[email]"
                         id="email" type="text" component={customField}
                         validate={[validate.required, validate.email]}/>
                  <Field className="input" placeholder="Password (minimum 8 characters)" name="user[password]"
                         id="password" type="password" component={customField}
                         validate={[validate.required, validate.minValue8]}/>
                  <Field className="input" placeholder="Confirm password" name="user[c_password]"
                         id="c_password" type="password" component={customField}
                         validate={[validate.required, validate.passwordsMatch]}/>
                </div>
                <div className="form-buttons">
                  <Button htmlType="submit" className="button -primary" type="primary" disabled={submitting}>
                    Register
                  </Button>
                </div>
                <div className="form-footer">
                  Within a registration, you automatically accept <br/>
                  <a className="link" href="#">Some Agreement</a>
                </div>
              </AuthFormLayout>
            </Spin>
          </Form>
        </Section>
        <div className="footer-helpers">
          <Link className="link" to="/login">Login</Link> with your account
        </div>
      </React.Fragment>
    )
  }
}

export default connect(state => ({ auth: state.auth }), {requestRegistration})(
  reduxForm({
    form: 'registerForm'
  })(Register)
)
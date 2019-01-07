import React from 'react'
import { Spin, Radio } from 'antd'
import {connect} from 'react-redux'
import {reduxForm, Form, Field, formValueSelector} from 'redux-form'


import Section from '../../../decorators/Section'
import RadioGroup from '../../../decorators/Fields/radio/radioGroup'
import OnboardingFormLayout from '../../../decorators/FormLayouts/OnboardingFormLayout'
import customField from '../../../decorators/Fields/inputs/customInput'
import validate from '../../../helpers/helpers/fieldLevelValidationForm'
import update from '../../../helpers/dispatchFormChange'
import DateOfBirthday from "../../FormGroups/DOB";
import Location from '../../FormGroups/Location'
import ImageUpload from "../../FormGroups/ImageUpload/index";

class PersonalInfo extends React.Component {
  render() {
    const { handleSubmit, dispatch, form, gender } = this.props
    return (
      <Section className="PersonalInfo">
        <OnboardingFormLayout title="Personal Information">
          <Spin spinning={false}>
            <Form autoComplete="off" className="PersonalInfo__form"
                  onSubmit={handleSubmit(values => this.props.requestRegistration(values))}>
              <div className="PersonalInfo__form__field-container field-group">
                <ImageUpload />
                <Field className="input" component={customField} label="First Name"
                  name="user[firstName]" id="firstName" isRequired={true}
                  validate={[validate.required]}
                />
                <Field className="input" component={customField} label="Last Name"
                  name="user[lastName]" id="lastName" isRequired={true}
                  validate={[validate.required]}
                />
                <RadioGroup title="Gender" name="user[gender]"
                            onChange={e => update(dispatch, form, "user[gender]", e.target.value)}
                            value={gender} values={[{ n: 'Male', v: 1 }, { n: 'Female', v: 2 }]} />
                <DateOfBirthday onChange={(name, value) => update(() => dispatch, form, name, value)} />
                <Location onChange={(name, value) => update(() => dispatch, form, name, value)} />
              </div>
            </Form>
          </Spin>
        </OnboardingFormLayout>
      </Section>
    )
  }
}

const selector = formValueSelector('personalInfoForm')
export default connect(state => {
  const gender = selector(state, "user[gender]")
  return {gender}
})(reduxForm({
  form: "personalInfoForm"
})(PersonalInfo))
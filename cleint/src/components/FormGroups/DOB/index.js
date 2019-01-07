import React from 'react'
import { Field } from 'redux-form'
import c from 'classnames'
import update from '../../../helpers/dispatchFormChange'
import Selectbox from '../../../decorators/Fields/selectbox/usual'

const DAYS = Array.apply(null, {length: 31}).map((v, i) => i + 1)
DAYS.unshift('Day')
const MONTHS = ['Month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const YEAR = Array.apply(null, {length: 101}).map((v, i) => i + 1918)
YEAR.unshift('Year')

class DateOfBirthday extends React.Component {
  render() {
    const { isRequired, onChange } = this.props
    return (
      <div className="date-of-birthday">
        <label className={c("input-label", { '-required': isRequired })}>Date of Birthday</label>
        <div className="date-of-birthday__fields">
          <Field name="user[dob][day]" fromDataActive={true} onChange={(value) => onChange("user[dob][day]", value)} component={Selectbox} data={DAYS} />
          <Field name="user[dob][month]" fromDataActive={true} onChange={(value) => onChange("user[dob][month]", value)} component={Selectbox} data={MONTHS} />
          <Field name="user[dob][year]" fromDataActive={true} onChange={(value) => onChange("user[dob][year]", value)} component={Selectbox} data={YEAR} />
        </div>
      </div>
    )
  }
}

export default DateOfBirthday
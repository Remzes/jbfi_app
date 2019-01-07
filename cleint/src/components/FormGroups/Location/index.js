import React from 'react'
import { Spin, Select } from 'antd'
import { Field, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import Selectbox from '../../../decorators/Fields/selectbox/custom'
import { requestCities, fetchingCitiesCancel } from '../../../ducks/cities'
const Option = Select.Option

const LocationCustomOption = ({ value }) => {
  return (
    <React.Fragment>
      {`${value.city}, ${value.country}, ${value.state}`}
    </React.Fragment>
  )
}

class Location extends React.Component {
  render() {
    const { onChange, cities } = this.props
    const { data, fetching, fetched, location } = cities
    return (
      <React.Fragment>
        <Field
          component={Selectbox}
          label="Location"
          showSearch={true}
          name="user[location]"
          data={data}
          value={location}
          custom={{ component: LocationCustomOption, refactorValue: (value) => `${value.city}, ${value.state}, ${value.country}` }}
          onBlur={() => this.props.fetchingCitiesCancel()}
          onSearch={e => this.props.requestCities(e)}
          notFoundContent={fetching ? <Spin spinning={true} /> : 'Not Found' }
        />
      </React.Fragment>
    )
  }
}

const selector = formValueSelector('personalInfoForm')
export default connect(state => {
  const location = selector(state, "user[location]")
  return { cities: state.cities, location }
}, { requestCities, fetchingCitiesCancel })(Location)
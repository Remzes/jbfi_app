import { change } from 'redux-form'

export default (dispatch, formName, fieldName, value) => {
  console.log('value', value)
  dispatch(change(formName, fieldName, value))
}
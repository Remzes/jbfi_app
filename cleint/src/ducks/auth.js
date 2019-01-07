import { ofType } from 'redux-observable'
import { pluck, delay, mapTo, exhaustMap, switchMap, catchError, tap } from 'rxjs/operators'
import { of, from, timer, merge } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import jwt_decode from 'jwt-decode'
import { push } from 'connected-react-router'

import { NOTIFICATION, requestNotification } from '../ducks/notification'
import { setTokenToLocalStorage } from '../helpers/localStorage'

const appName = "jbfi"

// Types
export const moduleName = "auth"
export const SIGN_UP_REQUEST = `${appName}/${moduleName}/SIGN_UP_REQUEST`
export const SIGN_UP_SUCCESS = `${appName}/${moduleName}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${appName}/${moduleName}/SIGN_UP_ERROR`
export const SIGN_IN_REQUEST = `${appName}/${moduleName}/SIGN_IN_REQUEST`
export const SIGN_IN_ERROR = `${appName}/${moduleName}/SIGN_IN_ERROR`
export const SIGN_IN_SUCCESS = `${appName}/${moduleName}/SIGN_IN_SUCCESS`
export const SIGN_OUT_REQUEST = `${appName}/${moduleName}/SIGN_OUT_REQUEST`
export const SIGN_OUT_SUCCESS = `${appName}/${moduleName}/SIGN_OUT_SUCCESS`

// State
const initial = {
  fetching: false,
  fetched: true,
  error: null,
  success: false,
  message: false
}

// Reducer
export default (state = initial, action) => {
  const { type, payload } = action
  switch (type) {

    case SIGN_UP_REQUEST:
      return { ...state, fetching: true, fetched: false, error: false, success: false, message: null }
    case SIGN_UP_SUCCESS:
      return { ...state, fetching: false, fetched: true, error: false, success: true, message: payload.message }
    case SIGN_UP_ERROR:
      console.log("Error!!!", payload.message)
      return { ...state, fetching: false, fetched: true, error: true, success: false, message: payload.message }

    case SIGN_IN_REQUEST:
      return { ...state, fetching: true, fetched: false, error: false, success: false, message: null }
    case SIGN_IN_SUCCESS:
      console.log("Success!!!")
      return { ...state, fetching: false, fetched: true, error: false, success: true, message: payload.message }
    case SIGN_IN_ERROR:
      console.log("Error!!!", payload.message)
      return { ...state, fetching: false, fetched: true, error: true, success: false, message: payload.message }

    case SIGN_OUT_REQUEST:
      return { ...state, fetching: true, fetched: false, error: false, success: false, message: null }
    case SIGN_OUT_SUCCESS:
      return { ...state, fetching: false, fetched: true, error: false, success: true, message: payload.message }

    default:
      return state
  }
}

// Action Creators
export const requestLogin = (values) => ({ type: SIGN_IN_REQUEST, values })

export const requestLogout = () => ({ type: SIGN_OUT_REQUEST })

export const requestRegistration = values => ({ type: SIGN_UP_REQUEST, values })

// Epics
export const loginUser = action$ => (
  action$
    .pipe(
      ofType(SIGN_IN_REQUEST),
      exhaustMap(action => (
        ajax.post('/api/users/login', { ...action.values.user }).pipe(
          pluck('response'),
          tap(res => { if (!res.success) throw new Error(res.message) }),
          switchMap(res => {
            const decoded = jwt_decode(res.token)
            setTokenToLocalStorage(res.token)
            return merge(
              of({ type: SIGN_IN_SUCCESS, payload: res }),
              of({ type: 'SET_CURRENT_USER', payload: decoded.user }),
              of({ type: NOTIFICATION, payload: { type: 'notification', success: true, text: "You successfully registered!" }}),
              timer(100).pipe(
                mapTo(push('/'))
              ))
          }),
          catchError(err => of(
            { type: SIGN_IN_ERROR, payload: err },
            requestNotification("notification", false, err),
          ))
      ))),
      catchError(err => of(
        { type: SIGN_IN_ERROR, payload: err },
        requestNotification("notification", false, err),
      ))
    )
)

export const registerUser = action$ => (
  action$
    .pipe(
      ofType(SIGN_UP_REQUEST),
      exhaustMap(action => (
          ajax.post('/api/users/register', { ...action.values.user }).pipe(
            pluck('response'),
            tap(res => { if (!res.success) throw new Error(res.message) }),
            switchMap(res => (
              merge(
                of({ type: SIGN_UP_SUCCESS, payload: res }),
                of(requestNotification('notification', true, "You successfully logged in!")),
                timer(100).pipe(
                  mapTo(push('/login'))
                ))
              )
            ),
            catchError(err => of(
              { type: SIGN_IN_ERROR, payload: err },
              requestNotification("notification", false, err),
            ))
          )
        )
      ),
      catchError(err => of(
        { type: SIGN_IN_ERROR, payload: err },
        requestNotification("notification", false, err),
      ))
))

export const logoutUser = action$ => {
  action$
    .pipe(
      ofType(SIGN_OUT_REQUEST),
      switchMap(action => (
        ajax.post('/api/users/logout').pipe(
          mapTo({ type: SIGN_OUT_SUCCESS })
        )
      ))
    )
}
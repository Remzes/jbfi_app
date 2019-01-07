import { ofType } from 'redux-observable'
import { pluck, delay, mapTo, map, startWith, exhaustMap, takeUntil, switchMap, catchError, tap, debounceTime } from 'rxjs/operators'
import { of, from, timer, merge } from 'rxjs'
import { ajax } from 'rxjs/ajax'

const appName = "jbfi"
const moduleName = 'cities'
const URL = "https://andruxnet-world-cities-v1.p.mashape.com/"

export const FETCHING_CITIES = `${appName}/${moduleName}/FETCHING_CITIES`
export const FETCHED_CITIES = `${appName}/${moduleName}/FETCHED_CITIES`
export const FETCHING_CITIES_CANCELED = `${appName}/${moduleName}/FETCHING_CITIES_CANCELLED`

const initial = {
  fetching: false,
  fetched: true,
  data: []
}

// Reducer
export default (state = initial, action) => {
  const { type, payload } = action
  switch (type) {
    case FETCHING_CITIES:
      console.log('Fetching')
      return { ...state, fetching: true, fetched: false, data: [] }
    case FETCHED_CITIES:
      console.log('Fetched')
      return { ...state, fetching: false, fetched: true, data: payload }
    case FETCHING_CITIES_CANCELED:
      console.log('Cancelled')
      return { ...state, fetching: false, fetched: false, data: [] }
    default:
      return state
  }
}

// Actions
export const requestCities = string => ({ type: FETCHING_CITIES, payload: string })
export const fetchingCitiesCancel = () => ({ type: FETCHING_CITIES_CANCELED })

// Epics
export const getCities = action$ => (
  action$.pipe(
    ofType(FETCHING_CITIES),
    debounceTime(500),
    switchMap(action => (
      ajax({
        url: `${URL}?query=${action.payload.trim().toLowerCase()}&searchby=city`,
        headers: {
          "X-Mashape-Key": "lJZFgGae7nmshlny1xiUGsKikKJ2p1ppzYbjsnUM9dQuVywG6D"
        },
        method: 'GET'
      }).pipe(
        pluck('response'),
        tap(data => console.log(data)),
        map(data => ({ type: FETCHED_CITIES, payload: data })),
        takeUntil(action$.pipe(
          ofType(FETCHING_CITIES_CANCELED)
        )),
      )
    )),
))
import { message, notification } from 'antd'
import { ofType } from 'redux-observable'
import { tap, ignoreElements } from 'rxjs/operators'

const appName = "jbfi"

export const moduleName = "auth"
export const NOTIFICATION = `${appName}/${moduleName}/NOTIFICATION`

// Actions
export const requestNotification = (type, success, text) => ({ type: NOTIFICATION, payload: { type, success, text }})

// Epics
export const callNotification = action$ => (
  action$.pipe(
    ofType(NOTIFICATION),
    tap(action => {
      const { type, success, text } = action.payload
      let description = text.toString().split('\n')[0]
      switch (type) {
        case "notification":
          success
           ? notification.success({ message: "Success!", description, duration: 2 })
           : notification.error({ message: "Error!", description, duration: 2 })
          break
        case "message":
          success
            ? message.success(description, 2)
            : message.error(description, 2)
          break
      }
    }),
    ignoreElements()
  )
)

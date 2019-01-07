import React from 'react'

export const required = value =>
  value && /^(?!\s*$).+/.test(value)
    ? undefined
    : 'Required'

export const noSpecialCharacters = value =>
  value && /[^a-zA-Z0-9]/.test(value)
    ? "No special characters are allowed"
    : undefined

const maxLength = max => value =>
  value && value.length > max
    ? `Must be ${max} characters or less`
    : undefined

export const minLength = min => value =>
  value && value.length < min
    ? `Must be ${min} characters or more`
    : undefined

export const number = value =>
  value && isNaN(Number(value))
    ? 'Must be a number'
    : undefined

export const minValue = min => value =>
  value && value < min
    ? `Must be at least ${min}`
    : undefined

export const minValue8 = minLength(8)
export const minValue4 = minLength(4)

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined

export const passwordsMatch = (value, allValues) =>
  value !== allValues.user.password
    ? "Passwords don't match"
    : undefined

export default {
  required,
  noSpecialCharacters,
  number,
  minValue8,
  minValue4,
  alphaNumeric,
  passwordsMatch,
  email
}
import React from 'react'
import { Input } from 'antd'
import c from 'classnames'

export default (
  {
    input,
    meta,
    type,
    placeholder,
    className,
    label,
    isRequired
  }
) => (
  <React.Fragment>
    <section className="field">
        {meta.touched && meta.error && <span className="validation-error">{meta.error}</span>}
        <Input {...input}  className={className} type={type} placeholder={placeholder}/>
        <label className={c("input-label", { '-required': isRequired })} htmlFor={input.id}>{label}</label>
    </section>
  </React.Fragment>
)
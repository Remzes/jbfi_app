import React from 'react'
import { Input } from 'antd'

export default (
  {
    input,
    meta,
    type,
    placeholder,
    className
  }
) => (
  <React.Fragment>
    <section className="field">
      {meta.touched && meta.error && <span className="validation-error">{meta.error}</span>}
      <Input {...input}  className={className} type={type} placeholder={placeholder}/>
    </section>
  </React.Fragment>
)
import React from 'react'
import { Radio } from 'antd'
import { Field } from 'redux-form'
import c from 'classnames'
const RadioGroup = Radio.Group

export default ({ title, onChange, value, name, values, isRequired = false }) => (
  <section className="field">
    <RadioGroup name={name} onChange={onChange} value={value}>
      {
        values.map((v, i) => (
          <Radio key={i} value={v.v}>{v.n}</Radio>
        ))
      }
    </RadioGroup>
    <label className={c("input-label", { '-required': isRequired })}>{title}</label>
  </section>
)
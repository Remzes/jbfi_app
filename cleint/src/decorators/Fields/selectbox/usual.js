import React from 'react'
import { Select } from 'antd'
import c from 'classnames'
const Option = Select.Option

export default (
  {
    input,
    meta,
    className,
    label,
    isRequired,
    data,
    showSearch,
    onSearch,
    notFoundContent,
    fromDataActive,
    custom = { defined: false, component: false, single: true, refactorValue: null }
  }
) => {
  input.value = fromDataActive && !input.value ? data[0] : input.value
  return (
  <React.Fragment>
    <section className="field">
      {meta.touched && meta.error && <span className="validation-error">{meta.error}</span>}
      <Select {...input} className={className} showSearch={showSearch} notFoundContent={notFoundContent} onSearch={onSearch} onChange={input.onChange}>
        {
          data && !custom.defined && data.map((v, i) => <Option key={i} value={v}>{v}</Option>)
        }
      </Select>
      {label && <label className={c("input-label", { '-required': isRequired })} htmlFor={input.id}>{label}</label>}
    </section>
  </React.Fragment>
)}
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
    custom = { component: false, refactorValue: null }
  }
) => {
  return (
    <React.Fragment>
      <section className="field">
        {meta.touched && meta.error && <span className="validation-error">{meta.error}</span>}
        <Select {...input} clearIcon={<div>X</div>} className={className} showSearch={showSearch} notFoundContent={notFoundContent} onBlur={() => input.onBlur(input.value)} onSearch={onSearch} onChange={input.onChange}>
          {
            data &&
            data.map((v, i) => {
              const Custom = custom.component
              const value = custom.refactorValue(v)
              return <Option key={i} value={value}><Custom value={v} /></Option>
            })
          }
        </Select>
        {label && <label className={c("input-label", { '-required': isRequired })} htmlFor={input.id}>{label}</label>}
      </section>
    </React.Fragment>
  )}
import React from 'react'

class Section extends React.Component {
  render() {
    const className = `Section ${this.props.className}`
    return <div className={className}>{this.props.children}</div>
  }
}

export default Section
import React from 'react'
import { Upload, Button } from 'antd'

class ImageUpload extends React.Component {
  onChange = info => {
    console.log(info)
  }

  render() {
    return (
      <div className="field file-upload">
        <img src="./images/avatar/avatar.png" alt="Avatar" className="file-upload__avatar"/>
        <p className="file-upload__description">
          <b>Your photo. </b>Format: jpg, gif, png. <br />
          Maximum file size: 2Mb. <br />
          Recommended photo size: 150x150 px.
        </p>
        <div className="file-upload__buttons">
          <Upload onChange={this.onChange}>
            <Button type="upload" icon="upload" className="button -primary -upload">Upload</Button>
          </Upload>
          <Button className="button -subButton">Remove</Button>
        </div>
      </div>
    )
  }
}

export default ImageUpload
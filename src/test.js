import React from 'react'
import ReactDOM from 'react-dom'
import sweet from 'sweetalert'
// 引入编辑器以及编辑器样式
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'

class App extends React.Component {

  render () {

    const editorProps = {
      height: 500,
      contentFormat: 'html',
      initialContent: '<p>Hello World!</p>',
      onChange: this.handleChange,
      onRawChange: this.handleRawChange
    }

    return (
      <div className="demo">
        <BraftEditor {...editorProps}/>
      </div>
    )

  }

  handleChange = (content) => {
    console.log(content)
  }

  handleRawChange = (rawContent) => {
    console.log(rawContent)
  }

}

export default App
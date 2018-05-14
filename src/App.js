import React, { Component } from 'react'
import './App.css'
import Input from './input'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
import 'whatwg-fetch'
import sweet from 'sweetalert'

const isMobile = window.innerWidth <= 600

const url = `http://localhost:3030`

class App extends Component {

  constructor(){
    super()
    this.state = {
      name: '',
      text: ''
    }

    this.sendRequest = this.sendRequest.bind(this)
    this.changeInput = this.changeInput.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.editorInstance = null
  }

    hConfig = {
      position: 'relative',
    }

    buttonStyle = {

    }

    changeInput (input) {
      this.setState({
        name: input
      })
    }

    handleChange = (content) => {
      this.setState({
        text: content
      })
    }

    async sendRequest(){
      // await fetch(url, {
      //   method: 'POST',
      //   // headers: {
      //   //   'Content-Type': 'application/json'
      //   // },
      //   body: JSON.stringify({
      //     name: this.state.name,
      //     text: this.state.text
      //   })
      // })
    }

    uploadFn = (param) => {

      const formData = new FormData()

      for(var name in param) {
        formData.append(name, param[name]);
      }
      fetch(url, {
        method: 'POST',
        body: formData
      }).then((res) => {
        console.log(res)
        if(res.status === 200){
          successFn(res)
        } else{
          errorFn(res)
        }
      }
    )
      //const mediaLibrary = this.editorInstance.getMediaLibraryInstance()

      //  sweet("OK", "Upload success!", "success");
        const successFn = (response) => {
          response.json().then(txt => {
            param.success({
              url: `http://localhost/${txt}`
              })
          })
         }
      // }
      //console.log(mediaLibrary)
      const progressFn = (event) => {
        param.progress(event.loaded / event.total * 100)
      }

      const errorFn = (response) => {
        sweet("Oops!", "Something went wrong!", "error")
      }
    }

  render() {

    const editorProps = {
      height: 500,
      contentFormat: 'html',
      placeholder: '单击此处开始写作',
      // initialContent: '<h1>TTFish</h1>',
      onChange: this.handleChange,
      // onRawChange: this.handleRawChange,
      controls: [
        'text-align', 'headings','media'
      ],
      media: {
        uploadFn: this.uploadFn
      }
    }

    return (
      <div className="App">
       <div>
         <h1 style={this.hConfig}> 征文 </h1>
         <div id = 'bg'></div>
         <div style={{'height': '120px'}}></div>
          <div style={{"border": "2px solid black 50%"
        }}>
           <BraftEditor {...editorProps}/>
         </div>
         <div style={{'display':'flex'}}>
         <Input changeInput = {input => this.changeInput(input)}/> 
         <button onClick = {this.sendRequest} style={this.buttonStyle}>Submit</button>
         </div>
         </div>
      </div>
    );
  }
}

export default App;

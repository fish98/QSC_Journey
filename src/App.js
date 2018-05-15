import React, { Component } from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
import 'whatwg-fetch'
import sweet from 'sweetalert'

import './App.css'
import Input from './input'
import Footer from './footer'
import chick from './image/chick.png'

const url = `http://localhost:3030`

let isMobile = false

if(window.innerWidth <= 600){
    isMobile = true
}

class App extends Component {

  constructor(){
    super()
    this.state = {
      name: '',
      text: '',
    }

    this.sendRequest = this.sendRequest.bind(this)
    this.changeInput = this.changeInput.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.editorInstance = null
  }

    chickStyle = (!isMobile) ? {
        'align': 'center',
        'width': '200px',
        'height': '200px',
        'position': 'absolute',
        'left': '44%',
        'top':'8%'
    } : {
      'align': 'center',
      'width': '200px',
      'height': '200px',
      'position': 'relative',
      'left': '20%',
    }

    hConfig = {
      position: 'relative',
    }

    blankStyle = (!isMobile) ? {
      height: '120px'
    } : {}

    buttonStyle = {
      background:'black',
      border: '0 solid',
      fontSize: '18px',
      color: 'white',
      fontWidth: 'bold',  
      width: '100px',
      fontWeight:'bold'
    }

    buttomBox =(!isMobile) ? {
      'display':'flex',
      'position': 'relative',
      'left': '32%',
    } : {
      'display':'flex',
    }

    questionStyle = {
      fontWeight: 'bold',
      fontSize: '18px'
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
      await fetch(url, {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json'
        // },
        body: JSON.stringify({
          name: this.state.name,
          text: this.state.text
        })
      }).then(res => {
        if(res.status === '200'){
          sweet("Congratulations!", "Upload success!", "success");
        }
        else {
          sweet("Oops", "Upload failed! Please check your network", "error");
        }
      })
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

    console.log(this.state.isMobile)

    return (
      <div className="App">
       <div>
         <h1 style={this.hConfig}> 征文 </h1>
         {/* <div style={this.chickStyle}></div> */}
         <img src={chick} style={(() => {if(!this.state.isMobile){return this.chickStyle}})()} />
         <div style={this.blankStyle}></div>
         <div style = {this.questionStyle}> 
         <p>漫画结局作为一个续写题，请广大ZJU潮ers续写夺奖。</p><p>续写内容包括但不限于人类战胜人工智能的方法和方式，以及人工智能今后与人类的关系
         </p>
         </div>
          <div style={{"border": "2px solid black 50%"
        }}>
           <BraftEditor {...editorProps}/>
         </div>
         <div style={this.buttomBox}>
         <Input changeInput = {input => this.changeInput(input)}/> 
         <button onClick = {this.sendRequest} style={this.buttonStyle}>提 交</button>
         </div>
         <Footer />
         </div>
      </div>
    );
  }
}

export default App;

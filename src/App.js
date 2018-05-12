import React, { Component } from 'react'
import './App.css'
import Input from './input'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
import 'whatwg-fetch'

const url = `http://localhost:3030`

class App extends Component {

  constructor(){
    super()
    this.state = {
      name: ''
    }

    this.sendRequest = this.sendRequest.bind(this)
    this.changeInput = this.changeInput.bind(this)

  }

    changeInput (input) {
      this.setState({
        name: input
      })
    }

    async sendRequest(){
      await fetch(url, {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json'
        // },
        body: JSON.stringify({
          name: this.state.name
        })
      })
    }

  render() {

    const editorProps = {
      height: 500,
      contentFormat: 'html',
      placeholder: '请开始的表演',
      // initialContent: '<h1>TTFish</h1>',
      onChange: this.handleChange,
      onRawChange: this.handleRawChange,
      controls: [
        'text-align', 'headings','media'
      ],
      media: {
        //uoloadFn: upload()
      }
    }

    return (
      <div className="App">
       <div>
         <h1> 征 文 </h1>
         <Input changeInput = {input => this.changeInput(input)}/> 
         <div style={{'height': '50px'}}></div>
          <div style={{"border": "1px solid black"}}>
           <BraftEditor {...editorProps}/>
         </div>
         <button onClick = {this.sendRequest}>Submit</button>
         </div>
      </div>
    );
  }
}

export default App;


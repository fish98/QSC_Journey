import React from 'react'

class Input extends React.Component{
    constructor(props){
        super(props)   
        this.state = {
            text : '',
        } 
        this.changeText = this.changeText.bind(this)
    }

    changeText(e){
        this.setState({
            text: e.target.value
        })
        this.props.changeInput(this.state.text)
    }

    render(){
        return(
            <div>
                <input onChange = {this.changeText} type = "text" value = {this.state.text} placeholder = '请快填写你的信息'></input>
            </div>
        )
    }
}

export default Input
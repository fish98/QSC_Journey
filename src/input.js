import React from 'react'

class Input extends React.Component{
    constructor(props){
        super(props)   
        this.state = {
            text : '',
            check: ''
        } 
        this.changeText = this.changeText.bind(this)
    }

    inputConfig = {
        width: '400px',
        height: '36px',
        display: 'reletive',
        left: '40%',
        textAlign: 'center',
        fontSize:'17px',
        transition: '1s',
        }

    async changeText(e){
        await this.setState({
            text: e.target.value
        })

        this.props.changeInput(this.state.text)
    }

    render(){
        return(
            <div>
                <input type = "text" value = {this.state.text} onChange = {this.changeText} placeholder = '请留下您的联系方式' style={this.inputConfig}></input>
                <div className = 'type'></div>
            </div>
        )
    }
}

export default Input
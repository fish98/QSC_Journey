import React from 'react'


let isMobile = false

if(window.innerWidth <= 600){
    isMobile = true
}

class Input extends React.Component{
    constructor(props){
        super(props)   
        this.state = {
            text : '',
        } 
        this.changeText = this.changeText.bind(this)
    }

    inputConfig = (!isMobile) ? {
        width: '400px',
        height: '36px',
        display: 'reletive',
        left: '40%',
        textAlign: 'center',
        fontSize:'16px',
        // transition: '1s',
        // background: 'rgba(216, 216, 235, 0.801)',
        } : {
            width: '100',
            height: '36px',
            textAlign: 'center',
            fontSize:'16px',
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
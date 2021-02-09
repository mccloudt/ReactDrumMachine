import React, { Component } from 'react';
import './SoundKey.scss';
class SoundKey extends Component {
    constructor(props){
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.revertState = this.revertState.bind(this);
        this.playSound = this.playSound.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            pressed: false,
        }
    }

    
    componentDidMount(){
        document.addEventListener('keydown', this.handleInput);
        // document.addEventListener('keyup', this.revertState);
        document.addEventListener('click', this.handleClick);
    }
    handleInput(e){
        if(String.fromCharCode(e.keyCode) === this.props.keyPress && this.props.enabled){
            this.setState({pressed: true});
            this.playSound();
            this.props.updateDrum(this.props.keyPress);
        }
        setTimeout(()=> {
            this.revertState();
        }, 100)
        
    }
    handleClick(e){
        if(e === this.props.keyPress && this.props.enabled){
            this.setState({pressed: true});
            this.playSound();
            this.props.updateDrum(this.props.keyPress);
            setTimeout(()=> {
                this.revertState();
            }, 100)
            
        }

    }

    playSound(){
        let sound = document.getElementById(this.props.keyPress);
        sound.currentTime = 0;
        sound.volume = this.props.volume;
        sound.play();
    }
    revertState(){
        this.setState({pressed: false})
    }

    render(){
        return (
        <div className={`soundKey soundKey-${this.state.pressed} drum-pad`} onClick={() => {
            this.handleClick(this.props.keyPress);
        }}>
            <p>{this.props.keyPress}</p>
            <audio id={this.props.keyPress} src={this.props.soundPath}></audio>
        </div>
            
        )
    }
}

export default SoundKey
import React, { Component } from 'react';
import SoundKey from './SoundKey';
import snare from './sounds/snare.mp3';
import tranceKick from './sounds/kick.wav';
import tranceSnare from './sounds/trance-snare.wav';
import tranceHiHat from './sounds/trance-hi-hat.wav';
import hardTranceKick from './sounds/hard-trance-kick.wav';
import tranceBanjo from './sounds/banjo-trance.wav';
import tranceWave from './sounds/trance-wave.wav';
import trancePop from './sounds/trance-pop.wav';
import heavyTranceBass from './sounds/heavy-trance-bass.wav';
import beginGameTrance from './sounds/begin-game-trance.ogg'
import classicKick from './sounds/classic-kick.wav';
import classicTom from './sounds/classic-tom.wav';
import lowTom from './sounds/low-tom.wav';
import classicCrash from './sounds/classic-crash.wav'
import classicCymbal from './sounds/classic-cymbal.wav'
import classicRide from './sounds/classic-ride.wav'
import classicSnare2 from './sounds/classic-snare-2.wav'
import './DrumMachineStyle.scss'
import Switch from 'react-switch';
const SOUNDS = [
    {
        bank: 1,
        name: 'classic-snare',
        soundPath: snare,
        key: 'Q',
    },
    {
        bank: 1,
        name: 'classic-kick',
        soundPath: classicKick,
        key: 'W',
    },
    {
        bank: 1,
        name: 'classic-hihat',
        soundPath: tranceHiHat,
        key: 'E',
    },
    {
        bank: 1,
        name: 'classic-tom',
        soundPath: classicTom,
        key: 'A',
    },
    {
        bank: 1,
        name: 'low-tom',
        soundPath: lowTom,
        key: 'S',
    },
    {
        bank: 1,
        name: 'classic-crash',
        soundPath: classicCrash,
        key: 'D',
    },
    {
        bank: 1,
        name: 'classic-snare-2',
        soundPath: classicSnare2,
        key: 'Z',
    },
    {
        bank: 1,
        name: 'classic-cymbal',
        soundPath: classicCymbal,
        key: 'X',
    },
    {
        bank: 1,
        name: 'classic-ride',
        soundPath: classicRide,
        key: 'C',
    },
    {
        bank: 2,
        name: 'trance-snare',
        soundPath: tranceSnare,
        key: 'Q',
    },
    {
        bank: 2,
        name: 'trance-kick',
        soundPath: tranceKick,
        key: 'W'
    },
    {
        bank: 2,
        name: 'trance-hi-hat',
        soundPath: tranceHiHat,
        key: 'E'
    },    
    {
        bank: 2,
        name: 'hard-trance-kick',
        soundPath: hardTranceKick,
        key: 'A'
    },    
    {
        bank: 2,
        name: 'trance-banjo',
        soundPath: tranceBanjo,
        key: 'S'
    },    
    {
        bank: 2,
        name: 'trance-wave',
        soundPath: tranceWave,
        key: 'D'
    },    
    {
        bank: 2,
        name: 'trance-pop',
        soundPath: trancePop,
        key: 'Z'
    }
    ,    
    {
        bank: 2,
        name: 'heavy-trance-bass',
        soundPath: heavyTranceBass,
        key: 'X'
    }
    ,    
    {
        bank: 2,
        name: 'ready-player-one',
        soundPath: beginGameTrance,
        key: 'C'
    }
]


class DrumMachine extends Component{
    constructor(props){
        super(props);
        this.state = {
            switchedOn: true,
            soundBankEnabled: 2,
            soundBankNames: {
                1: 'Classic Drum Kit',
                2: 'Trance Drum Kit',
            },
            volume: 0.5,
            drumHit: 'NOT_PLAYING',
            checked: false,
            enabled: false,
        }

        this.switchBank = this.switchBank.bind(this);
        this.changeVolume = this.changeVolume.bind(this);
        this.updateKeyText = this.updateKeyText.bind(this);
        this.playerEnabled = this.playerEnabled.bind(this);
    }

    updateKeyText(d){
        for(let i = 0; i < SOUNDS.length; i++){
            if(d === 'NOT_PLAYING'){
                this.setState({drumHit: d});
            }
            else if(SOUNDS[i].key === d && SOUNDS[i].bank === this.state.soundBankEnabled){
                this.setState({drumHit: SOUNDS[i].name.replace('-', ' ')});
            }
        }
        
    }

    switchBank(){
        if(this.state.soundBankEnabled === 2){
            this.setState({soundBankEnabled: 1});
            this.setState({checked: true});
        }else{
            this.setState({soundBankEnabled: 2});
            this.setState({checked: false});
        }
    }
    playerEnabled(){
        if(this.state.enabled){
            this.setState({ enabled: false });
        }else{
            this.setState({ enabled: true });
        }
    }

    changeVolume(e){
        this.setState({volume: e.target.value/100});
    }




    render(){
        const sounds = SOUNDS.map(x => {
            return x.bank == this.state.soundBankEnabled && 
            <SoundKey 
                key={x.key} 
                keyPress={x.key}
                soundPath={x.soundPath}
                volume={this.state.volume}
                updateDrum={this.updateKeyText}
                enabled={this.state.enabled}
                
            />;
        })
        
        return (
            <div id='drum-machine' className={`player player-${this.state.enabled}`}>
                <div id='display'>
                    {sounds}
                </div>
                <div id='right-side'>
                    <h1>Drummer-Boi</h1>
                    <div id='hud'>
                        <p className='label'>POWER:</p>
                        <div id='playerPower'>
                            <Switch 
                                id='playerPower' 
                                onChange={this.playerEnabled} 
                                checked={this.state.enabled}/>
                        </div>
                        <p className='label'>SAMPLE:</p>
                        <div id='text-b-shadow'>
                            <p id='playing'>{this.state.drumHit}</p>
                        </div>
                        <p className='label'>BANK:</p>
                        <div id='text-b-shadow'>
                            <p id='playing'>{this.state.soundBankNames[this.state.soundBankEnabled]}</p>
                        </div>
                    </div>
                    <div id='controls'>
                        <p className='label'>SWITCH BANK:</p>
                        <Switch 
                            onChange={this.switchBank} 
                            checked={this.state.checked}
                            checkedIcon={<div style={{display:'flex', jusifyContent:'flex-start', alignItems:'center', color:'white', marginLeft:'1rem'}}>
                            🎹
                            </div>}
                            uncheckedIcon={
                                <div style={{display:'flex', jusifyContent:'flex-start', alignItems:'center', color:'white'}}>
                                🥁
                                </div>
                            }
                            checkedHandleIcon={<div style={{display:'flex', justifyContent:'center', alignItems:'center', color:'black', height:'100%'}}>🌝</div>}
                            uncheckedHandleIcon={<div style={{display:'flex', justifyContent:'center', alignItems:'center', color:'black', height:'100%'}}>🌝</div>}
                            height={25}
                            width={100}
                            offColor={'#0B3D5B'}
                            onColor={'#8C2905'}
                            />
                            <p className='label'>CHANGE VOLUME:</p>
                        <input type="range" min="0" max="100" onChange={this.changeVolume} value={this.volume}/>
                    </div>
                </div>

                
            </div>
        )
    }
}

export default DrumMachine;
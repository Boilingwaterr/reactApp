import  React, {useState, useRef}  from 'react';
import Style from './Error404.module.css'
import wave1 from './svg/wave1.svg'
import wave2 from './svg/wave2.svg'
import wave3 from './svg/wave3.svg'
import wave4 from './svg/wave4.svg'
import cloud1 from './svg/cloud1.svg'
import cloud2 from './svg/cloud2.svg'
import cloud3 from './svg/cloud3.svg'
import boat from './svg/boat.svg'
import moon from './svg/moon.svg'

const Error404 = () => {
    const [x, setXCoordinates] = useState();
    const [y, setYCoordinates] = useState();

    const parallax = event =>{
        setXCoordinates(event.pageX/parralaxWrapper.current.offsetWidth);
        setYCoordinates(event.pageY/parralaxWrapper.current.offsetHeight);
        console.log(parralaxWrapper.current.offsetWidth, parralaxWrapper.current.offsetHeight)
    }

    const parralaxWrapper = useRef([]);

    return <div>
        <div className = {Style.errorParallax}
            onMouseMove = {event =>{parallax(event)}}
            ref = {parralaxWrapper}>
        <div style = {{transform: `translate3d(-${x*105}px, -${y*60}px, 0)`}}><img src={wave1} alt="layer1"/></div>
        <div style = {{transform: `translate3d(-${x*70}px, -${y*60}px, 0)`}}><img src={wave2} alt="layer2"/></div>
        <div style = {{transform: `translate3d(-${x*65}px, -${y*55}px, 0)`}}><img src={boat} alt="layer4"/></div>
        <div style = {{transform: `translate3d(-${x*55}px, -${y*45}px, 0)`}}><img src={wave3} alt="layer3"/></div>
        <div style = {{transform: `translate3d(-${x*40}px, -${y*20}px, 0)`}}><img src={wave4} alt="layer5"/></div>
        <div style = {{transform: `translate3d(-${x*20}px, -${y*8}px, 0)`}}><img src={cloud1} alt="layer6"/></div>
        <div style = {{transform: `translate3d(-${x*15}px, -${y*8}px, 0)`}}><img src={cloud2} alt="layer7"/></div>
        <div style = {{transform: `translate3d(-${x*10}px, -${y*8}px, 0)`}}><img src={cloud3} alt="layer8"/></div>
        <div style = {{transform: `translate3d(-${x*1}px, -${y*1}px, 0)`}}><img src={moon} alt="layer9"/></div>
        <div><h1>404 not found</h1></div>
        </div>

    </div>
}

export default Error404;
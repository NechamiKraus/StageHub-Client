import videoSrc from '../../assets/מצגת1.mp4';
import "./CurtainVideo.css"

const onEnd = ()=>{
   
}
const CurtainVideo =()=>{
    return<>
    <video autoPlay muted playsInline onEnded={onEnd}>
    <source src={videoSrc} type="video/mp4"/>
    </video>
    </>
  
}

export default CurtainVideo;

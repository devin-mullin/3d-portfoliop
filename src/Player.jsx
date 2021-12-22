import useSound from "use-sound";
import easyprey from "./sounds/easyprey.mp3"

const Pause = ({ stop }) => {
  return (
    <svg className="button" viewBox="0 0 6 6" onClick={()=>stop()}>
      <polygon points="0,0 15,0 15,60 0,60" />
      <polygon points="25,0 40,0 40,60 25,60" />
    </svg>
  );
};

const Play = ({ play }) => {
  return (
    <svg className="button" viewBox="0 0 6 6" onClick={play}>
      <polygon points="0,0 6,3 0,6" />
    </svg>
  );
};

const Player = () => {
  const [play, { stop, isPlaying }] = useSound(easyprey);
  return (
    <div className="player">
      {isPlaying ? <Pause stop={stop} /> : <Play play={play} />}
    </div>
  );
};

export default Player;
import { useEffect, useRef } from "react";

const useSound = (soundUrl) => {
  const audioRef = useRef(new Audio(soundUrl));

  useEffect(() => {
    audioRef.current.loop = true; // Set the audio to loop

    return () => {
      audioRef.current.pause(); // Pause the sound when component unmounts
      audioRef.current.currentTime = 0; // Reset to the beginning
    };
  }, [soundUrl]);

  const play = (once = true) => {
    if (once) {
      audioRef.current.loop = false;
    } else {
      audioRef.current.loop = true;
    }
    audioRef.current.play();
  };

  const stop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0; // Reset to the beginning
  };

  return { play, stop };
};

export default useSound;

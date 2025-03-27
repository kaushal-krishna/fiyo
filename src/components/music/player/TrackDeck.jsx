import React from "react";
import { useContext } from "react";
import MusicContext from "../../../context/items/MusicContext";
import AudioProgressBar from "./AudioProgressBar";

const TrackDeck = () => {
  const {
    getTrack,
    handleAudioPlay,
    handleAudioPause,
    handleNextAudioTrack,
    currentTrack,
    setCurrentTrack,
    seekTo,
    loopAudio,
    setLoopAudio,
    isAudioPlaying,
    isAudioLoading,
    audioProgress,
  } = useContext(MusicContext);

  const handlePlayPause = isAudioPlaying
    ? handleAudioPause
    : () => {
        if (currentTrack?.isExternal) {
          getTrack(currentTrack?.videoId);
          setCurrentTrack({ ...currentTrack, isExternal: false });
        } else {
          handleAudioPlay();
        }
      };

  return (
    <div className="flex justify-start items-center flex-col w-full h-screen p-6 bg-gradient-to-b from-primary-bg to-body-bg dark:from-primary-bg-dark dark:to-body-bg-dark overflow-y-auto no-scrollbar gap-4">
      <div className="flex flex-col w-full items-center justify-between">
        <img
          src={currentTrack?.image}
          alt="Track Cover"
          className="w-full h-full aspect-square border-none rounded-xl bg-secondary-bg dark:bg-secondary-bg-dark"
        />
        <div className="flex flex-col items-start justify-start w-full px-2 pt-4 gap-2">
          <span className="text-2xl">{currentTrack?.title}</span>
          <span className="text-sm text-gray-500">{currentTrack?.artists}</span>
        </div>
      </div>

      <div className="flex flex-col w-full px-4 py-2">
        <AudioProgressBar
          position={audioProgress?.position}
          duration={audioProgress?.duration}
          seekTo={seekTo}
        />
      </div>

      <div className="flex justify-between items-center w-full px-8">
        <button
          onClick={() => setLoopAudio((prev) => !prev)}
          className={`transition-colors duration-200 ease-in-out ${
            loopAudio ? "text-green-500" : "text-black dark:text-white"
          }`}
        >
          <i className="fa fa-repeat text-2xl" title="Repeat Mode"></i>
        </button>

        <span className="flex items-center justify-center rounded-full p-4 bg-black dark:bg-white">
          <button
            className="w-6 h-6"
            title="Play/Pause"
            onClick={handlePlayPause}
          >
            <svg
              role="img"
              aria-hidden="true"
              viewBox="0 0 24 24"
              className={`fill-white dark:fill-black ${
                isAudioLoading && "animate-pulse"
              }`}
            >
              {isAudioPlaying ? (
                <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
              ) : (
                <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
              )}
            </svg>
          </button>
        </span>

        <button
          className="w-6 h-6"
          title="Play Next"
          onClick={handleNextAudioTrack}
        >
          <svg
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="fill-black dark:fill-white"
          >
            <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TrackDeck;

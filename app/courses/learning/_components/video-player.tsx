import React from "react";
import Player from "react-player";

const VideoPlayer = ({ videoUrl, idAsset }:any) => {
  return (
    <div className="video-player">
      <Player url={videoUrl} width="100%" height="100%" controls={true} />
    </div>
  );
};

export default VideoPlayer
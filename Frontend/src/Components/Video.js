import React from "react";

function Video() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Make the div take the full screen height
        backgroundColor: "#000",
        overflow: "hidden", // Prevent overflow when the video doesn't fit
        position: "relative",
      }}
    >
      <video
        src="./assests/home_page_video.mp4"
        type="video/mp4"
        autoPlay
        loop
        muted
        style={{
          width: "100%", // Make the video stretch to fill the width
          height: "100%", // Ensure the video fills the height of the container
          objectFit: "cover", // Maintain aspect ratio and fill the container without distortion
          position: "absolute", // Position video in the background
          top: "0",
          left: "0",
        }}
      />
      <div className="video-overlay" style={{
        position: "absolute", // Position the text on top of the video
        top: "20%", // Center vertically
        left: "50%", // Center horizontally
        transform: "translate(-50%, -50%)", // Offset the transform to truly center
        textAlign: "center",
        color: "#fff",
      }}>
        <h1>PUSH YOUR LIMITS.</h1>
        <h1 className="highlight">EVERYDAY!</h1>
        <h1 className="span"><span>WITH GYM-X</span></h1>
      </div>
    </div>
  );
}

export default Video;

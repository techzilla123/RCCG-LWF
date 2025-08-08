import * as React from "react";

export function AboutImage() {
  const [showVideo, setShowVideo] = React.useState(false);
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    let timer;

    if (!showVideo) {
      // Show image for 10 seconds before playing video
      timer = setTimeout(() => {
        setShowVideo(true);
      }, 10000);
    }

    return () => clearTimeout(timer);
  }, [showVideo]);

  const handleVideoEnd = () => {
    setShowVideo(false); // Switch back to image after video ends
  };

  return (
    <>
      {showVideo ? (
        <video
          ref={videoRef}
          src="/herovid/whats.mp4"
          muted
          autoPlay
          onEnded={handleVideoEnd}
          className="object-contain self-center my-auto aspect-[1.13] min-w-[280px] w-[600px] max-w-full transition-transform duration-300 hover:scale-105 shadow-2xl rounded-2xl glow"
        />
      ) : (
        <img
          src="/0O0A7266.JPG"
          alt="About section illustration"
          className="object-contain self-center my-auto aspect-[1.13] min-w-[280px] w-[600px] max-w-full transition-transform duration-300 hover:scale-105 shadow-2xl rounded-2xl glow"
        />
      )}
    </>
  );
}

import { useProgress } from "@react-three/drei";
import { usePlay } from "../contexts/context";

export const Overlay = () => {
  const redirectToPage = () => {
    window.location.href = "https://siochang.vercel.app/";
  };
  const { progress } = useProgress();
  const { play, end, setPlay, hasScroll } = usePlay();
  return (
    <div
      className={`overlay ${play ? "overlay--disable" : ""}
    ${hasScroll ? "overlay--scrolled" : ""}`}
    >
      <div
        className={`loader ${progress === 100 ? "loader--disappear" : ""}`}
      />
      {progress === 100 && (
        <div className={`intro ${play ? "intro--disappear" : ""}`}>
          <h1 className="logo">
            Sio Chang
            <div className="spinner">
              <div className="spinner__image" />
            </div>
          </h1>
          <p className="intro__scroll">Scroll to begin the journey</p>
          <button
            className="explore"
            onClick={() => {
              setPlay(true);
            }}
          >
            Explore
          </button>
        </div>
      )}
      <div className={`outro ${end ? "outro--appear" : ""}`}>
        <p className="outro__text">Wish you had a great flight with us...Checkout my details below.</p>
        <div style={{ pointerEvents: 'auto' }}>
          <button className="explore" onClick={redirectToPage}>My Details</button>
        </div>
      </div>
    </div>
  );
};
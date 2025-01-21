import React, { useState, useEffect } from "react";
import "./StoryModal.css";

const StoryModal = ({ story, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const SLIDE_DURATION = 5000; // 5 seconds

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 100);
      setProgress((elapsedTime / SLIDE_DURATION) * 100);
    }, 100);

    if (elapsedTime >= SLIDE_DURATION) {
      setElapsedTime(0);
      setProgress(0);
      if (currentSlide < story.slides.length - 1) {
        setCurrentSlide((prev) => prev + 1);
      } else {
        onClose();
      }
    }

    //clears the interval when the useEffect re runs eg- because of dependency change
    return () => clearInterval(interval);
  }, [isPlaying, elapsedTime, currentSlide]);

  const handleNext = () => {
    if (currentSlide < story.slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
      setElapsedTime(0);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
      setElapsedTime(0);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const slide = story.slides[currentSlide];

  return (
    <div className="story-modal">
      <button className="close-btn" onClick={onClose}>
        ✖
      </button>
      <div className="progress-container">
        {story.slides.map((_, index) => (
          <div
            key={index}
            className={`progress-bar ${index <= currentSlide ? "active" : ""}`}
          >
            <div
              className="progress"
              style={{
                width:
                  index === currentSlide
                    ? `${progress}%`
                    : index < currentSlide
                    ? "100%"
                    : "0%",
              }}
            ></div>
          </div>
        ))}
      </div>
      <div className="modal-content">
        <div className="controls">
          <button className="prev_btn" onClick={handlePrev}>
            ◀
          </button>
          <button className="pause_btn" onClick={togglePlayPause}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button className="next_btn" onClick={handleNext}>
            ▶
          </button>
        </div>
        <div>
          <img src={slide.image} alt="Slide" />
        </div>
      </div>
      {slide.link && (
        <a href={slide.link} target="_blank">
          <button>{slide.button_text || "Learn More"}</button>
        </a>
      )}
    </div>
  );
};

export default StoryModal;

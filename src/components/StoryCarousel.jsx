import React from "react";
import "./StoryCarousel.css";

const StoryCarousel = ({ stories, onOpenStory }) => {
  return (
    <div className="story-carousel">
      {stories
        .sort((a, b) => a.order - b.order)
        .map((story) => (
          <>
            <div className="story-div">
              <div
                key={story.id}
                className="story-thumbnail"
                style={{ borderColor: story.ringColor }}
                onClick={() => onOpenStory(story)}
              >
                <img src={story.thumbnail} alt={story.name} />
              </div>
              <span style={{ color: story.nameColor }}>{story.name}</span>
            </div>
          </>
        ))}
    </div>
  );
};

export default StoryCarousel;
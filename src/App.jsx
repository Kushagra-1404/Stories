import React, { useState } from "react";
import StoryCarousel from "./components/StoryCarousel";
import StoryModal from "./components/StoryModal";
import storyData from "./assets/data.json";
import "./App.css";

const App = () => {
  const [selectedStory, setSelectedStory] = useState(null);

  const handleOpenStory = (story) => {
    setSelectedStory(story);
  };

  const handleCloseStory = () => {
    setSelectedStory(null);
  };

  return (
    <div className="app">
      <h1>Story Carousel</h1>
      <StoryCarousel
        stories={storyData.details}
        onOpenStory={handleOpenStory}
      />
      {selectedStory && (
        <StoryModal story={selectedStory} onClose={handleCloseStory} />
      )}
    </div>
  );
};

export default App;

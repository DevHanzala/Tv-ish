import React, { useState } from 'react';

// ✅ Define the component properly
const SnipsOpen = ({
  backgroundImage,
  liked,
  handleLike,
  likeCount,
  showComments,
  setShowComments,
  commentCount,
  handleShare,
  handleMoreOptions,
  avatar,
  username,
  description,
  subscribed,
  onSubscribeToggle,
}) => {
  return (
    <div
      className="relative w-full h-screen bg-black overflow-hidden flex justify-center items-center font-sans"
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* Your existing JSX inside here */}
    </div>
  );
};

// ✅ ReelScroller component (already fine)
const ReelScroller = () => {
  const [subscribedStates, setSubscribedStates] = useState({});

  const toggleSubscribe = (id) => {
    setSubscribedStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div
      style={{
        height: '100vh',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
      }}
    >
      {reels.map((reel) => (
        <SnipsOpen
          key={reel.id}
          {...reel}
          subscribed={!!subscribedStates[reel.id]}
          onSubscribeToggle={() => toggleSubscribe(reel.id)}
        />
      ))}
    </div>
  );
};

export default ReelScroller;

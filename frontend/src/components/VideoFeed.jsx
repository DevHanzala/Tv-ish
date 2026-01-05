import React, { useState, useEffect, useRef } from 'react';
import SnipsOpen from '../pages/snips_open';

const videosData = [
  {
    id: 1,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    avatar: 'https://randomuser.me/api/portraits/women/79.jpg',
    likes: '1.2K',
    comments: [
      { id: 101, user: 'alice', text: 'Amazing video!' },
      { id: 102, user: 'bob', text: 'So cute!' },
      { id: 103, user: 'charlie', text: 'Love it!' },
    ],
    description: 'Big Buck Bunny is amazing!',
    username: 'bunnylover',
  },
  {
    id: 2,
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    likes: '980',
    comments: [
      { id: 201, user: 'dave', text: 'Beautiful flower!' },
      { id: 202, user: 'emma', text: 'So colorful!' },
      { id: 203, user: 'frank', text: 'Nature is the best.' },
      { id: 204, user: 'grace', text: 'Wow!' },
      { id: 205, user: 'harry', text: 'Nice shot!' },
    ],
    description: 'Look at this beautiful flower',
    username: 'naturefan',
  },
  {
    id: 3,
    videoUrl: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    likes: '2.5K',
    comments: [
      { id: 301, user: 'ian', text: 'Great trailer!' },
      { id: 302, user: 'jess', text: 'I want to watch this movie.' },
      { id: 303, user: 'kate', text: 'Epic scenes!' },
      { id: 304, user: 'leo', text: 'Amazing quality.' },
      { id: 305, user: 'mia', text: 'Can’t wait!' },
      { id: 306, user: 'nick', text: 'So intense.' },
      { id: 307, user: 'olivia', text: 'Best trailer ever.' },
      { id: 308, user: 'peter', text: 'Love the soundtrack.' },
      { id: 309, user: 'quinn', text: 'Nice effects!' },
      { id: 310, user: 'rachel', text: 'Very well done.' },
    ],
    description: 'Sintel Trailer',
    username: 'moviebuff',
  },
];

const VideoFeed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const children = Array.from(container.children);
    const viewportHeight = window.innerHeight;

    let bestIndex = 0;
    let maxVisibleHeight = 0;

    children.forEach((child, index) => {
      const rect = child.getBoundingClientRect();
      const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);

      if (visibleHeight > maxVisibleHeight) {
        maxVisibleHeight = visibleHeight;
        bestIndex = index;
      }
    });

    setCurrentIndex(bestIndex);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen overflow-y-scroll snap-y snap-mandatory hide-scrollbar"
      style={{
        scrollSnapType: 'y mandatory',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {videosData.map((video, index) => (
        <div
          key={video.id}
          className="w-full h-screen snap-start"
          style={{ scrollSnapAlign: 'start' }}
        >
          <SnipsOpen
            backgroundImage={video.videoUrl}
            avatar={video.avatar}
            likes={video.likes}
            comments={video.comments}
            description={video.description}
            username={video.username}
            isActive={index === currentIndex}
            onSubscribeClick={(subscribed) =>
              console.log(`${video.username} subscribed: ${subscribed}`)
            }
          />
        </div>
      ))}
    </div>
  );
};

export default VideoFeed;

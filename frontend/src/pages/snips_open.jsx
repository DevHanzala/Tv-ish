import React, { useState, useEffect, useRef } from 'react';

const SnipsOpen = ({
  backgroundImage,
  avatar,
  likes = '0',
  comments = [],
  description = '',
  username = 'Username',
  onSubscribeClick = () => {},
}) => {
  const parseCount = (count) => {
    if (typeof count === 'string') {
      if (count.toUpperCase().includes('K')) {
        return parseFloat(count) * 1000;
      }
      return parseInt(count) || 0;
    }
    return count;
  };

  const initialLikes = parseCount(likes);
  const initialComments = Array.isArray(comments) ? comments : [];

  const [likeCount, setLikeCount] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [commentCount, setCommentCount] = useState(initialComments.length);
  const [commentsList, setCommentsList] = useState(initialComments);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const commentInputRef = useRef(null);
  const commentEndRef = useRef(null);

  const preventScrollRef = useRef(false);

  const [shareDropdownOpen, setShareDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const shareRef = useRef(null);
  const moreRef = useRef(null);

  const [toastVisible, setToastVisible] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    function handleClickOutside(event) {
      if (shareRef.current && !shareRef.current.contains(event.target) && shareDropdownOpen) {
        setShareDropdownOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target) && moreDropdownOpen) {
        setMoreDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [shareDropdownOpen, moreDropdownOpen]);

  useEffect(() => {
    if (showComments && commentEndRef.current && !preventScrollRef.current) {
      commentEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    preventScrollRef.current = false;
  }, [commentsList, showComments]);

  useEffect(() => {
    if (toastVisible) {
      const timer = setTimeout(() => setToastVisible(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [toastVisible]);

  // ✅ Auto Play/Pause video when visible
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.muted = false;
          video.play();
          setIsPlaying(true);
        } else {
          video.muted = true;
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.8 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleVideoClick = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleLike = () => {
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    setLiked(!liked);
  };

  const toggleShowComments = () => {
    preventScrollRef.current = true;
    setShowComments((prev) => !prev);

    if (!showComments) {
      setTimeout(() => {
        if (commentInputRef.current) {
          commentInputRef.current.focus({ preventScroll: true });
        }
      }, 100);
    }
  };

  const closeComments = () => {
    setShowComments(false);
  };

  const toggleShareDropdown = () => {
    if (!shareDropdownOpen && moreDropdownOpen) setMoreDropdownOpen(false);
    setShareDropdownOpen((prev) => !prev);
  };

  const toggleMoreDropdown = () => {
    if (!moreDropdownOpen && shareDropdownOpen) setShareDropdownOpen(false);
    setMoreDropdownOpen((prev) => !prev);
  };

  const handleSubscribe = () => {
    if (!subscribed) {
      setSubscribed(true);
      onSubscribeClick(true);
    } else {
      if (window.confirm('Are you sure you want to unsubscribe?')) {
        setSubscribed(false);
        onSubscribeClick(false);
      }
    }
  };

  const handleNewCommentChange = (e) => setNewComment(e.target.value);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    preventScrollRef.current = true;

    const comment = { id: Date.now(), user: username, text: newComment.trim() };
    setCommentsList((prev) => [...prev, comment]);
    setCommentCount((prev) => prev + 1);
    setNewComment('');

    setTimeout(() => {
      if (commentInputRef.current) {
        commentInputRef.current.focus({ preventScroll: true });
      }
    }, 100);
  };

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setToastVisible(true);
      setShareDropdownOpen(false);
    });
  };

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`,
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex justify-center items-center font-sans select-none">
      {/* Desktop blur sides */}
      <div className="hidden lg:flex absolute inset-0 z-0">
        <div className="w-1/2 h-full overflow-hidden">
          <video
            src={backgroundImage}
            className="w-full h-full object-cover blur-lg scale-110 opacity-40"
            autoPlay
            muted
            loop
            playsInline
            draggable={false}
          />
        </div>
        <div className="w-1/2 h-full overflow-hidden">
          <video
            src={backgroundImage}
            className="w-full h-full object-cover blur-lg scale-110 opacity-40"
            autoPlay
            muted
            loop
            playsInline
            draggable={false}
          />
        </div>
      </div>

      {/* Main video and controls */}
      <div className="relative z-10 w-full h-screen lg:max-w-[600px] lg:h-full rounded-xl overflow-hidden shadow-xl">
        <video
          ref={videoRef}
          src={backgroundImage}
          className="w-full h-full object-contain lg:object-cover cursor-pointer"
          autoPlay
          loop
          playsInline
          draggable={false}
          onClick={handleVideoClick}
          title={isPlaying ? 'Pause video' : 'Play video'}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

        {/* Right side controls */}
        <div className="absolute right-3 bottom-24 flex flex-col items-center gap-6 text-white z-10">
          {/* Like */}
          <div
            className="flex flex-col items-center cursor-pointer transition-transform active:scale-90"
            onClick={handleLike}
            title={liked ? 'Unlike' : 'Like'}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleLike()}
            aria-pressed={liked}
            aria-label={liked ? 'Unlike video' : 'Like video'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={liked ? 'red' : 'white'}
              className={`w-7 h-7 transition-transform duration-300 ${liked ? 'scale-125' : ''}`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.22 2.56C11.59 5.01 13.26 4 15 4 17.5 4 19.5 6 19.5 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className="text-xs mt-1 font-semibold">{likeCount.toLocaleString()}</span>
          </div>

          {/* Comment */}
          <div
            className="flex flex-col items-center cursor-pointer transition-transform active:scale-90"
            onClick={toggleShowComments}
            title="Comments"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleShowComments()}
            aria-expanded={showComments}
            aria-controls="comments-section"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" className="w-7 h-7" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 2H4a2 2 0 00-2 2v20l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z" />
            </svg>
            <span className="text-xs mt-1 font-semibold">{commentCount.toLocaleString()}</span>
          </div>

          {/* Share */}
          <div ref={shareRef} className="relative flex flex-col items-center transition-transform active:scale-90">
            <button
              onClick={toggleShareDropdown}
              title="Share"
              aria-haspopup="true"
              aria-expanded={shareDropdownOpen}
              className="focus:outline-none cursor-pointer"
              aria-label="Share options"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="white" className="w-7 h-7" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a2.5 2.5 0 000-1.39l7.02-4.11a2.5 2.5 0 10-.91-1.41l-7.02 4.11a2.5 2.5 0 100 3.98l7.02 4.11c.36.21.76.32 1.18.32a2.5 2.5 0 100-5z" />
              </svg>
            </button>

            {shareDropdownOpen && (
              <div
                role="menu"
                aria-label="Share options"
                className="absolute bottom-12 right-0 flex flex-col bg-black bg-opacity-90 rounded-lg p-2 w-40 shadow-lg"
              >
                <button
                  onClick={() => window.open(shareUrls.facebook, '_blank', 'noopener')}
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-800"
                  role="menuitem"
                  type="button"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                    alt="Facebook"
                    className="w-5 h-5"
                    draggable={false}
                  />
                  Facebook
                </button>
                <button
                  onClick={() => window.open(shareUrls.whatsapp, '_blank', 'noopener')}
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-800"
                  role="menuitem"
                  type="button"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp"
                    className="w-5 h-5"
                    draggable={false}
                  />
                  WhatsApp
                </button>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-800"
                  role="menuitem"
                  type="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="white" className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M16 1H4a2 2 0 00-2 2v14h2V3h12V1zm3 4H8a2 2 0 00-2 2v14a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2zm0 16H8V7h11v14z" />
                  </svg>
                  Copy Link
                </button>
              </div>
            )}
          </div>

          {/* More */}
          <div ref={moreRef} className="relative flex flex-col items-center transition-transform active:scale-90">
            <button
              onClick={toggleMoreDropdown}
              title="More"
              aria-haspopup="true"
              aria-expanded={moreDropdownOpen}
              className="focus:outline-none cursor-pointer"
              aria-label="More options"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="white" className="w-7 h-7" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="5" cy="12" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="19" cy="12" r="2" />
              </svg>
            </button>

            {moreDropdownOpen && (
              <div
                role="menu"
                aria-label="More options"
                className="absolute bottom-12 right-0 flex flex-col bg-black bg-opacity-90 rounded-lg p-2 w-44 shadow-lg"
              >
                <button
                  onClick={() => alert('Report clicked')}
                  className="px-3 py-2 rounded hover:bg-gray-800 text-left"
                  role="menuitem"
                  type="button"
                >
                  Report
                </button>
                <button
                  onClick={() => alert('Block clicked')}
                  className="px-3 py-2 rounded hover:bg-gray-800 text-left"
                  role="menuitem"
                  type="button"
                >
                  Block
                </button>
                <button
                  onClick={() => alert('Save clicked')}
                  className="px-3 py-2 rounded hover:bg-gray-800 text-left"
                  role="menuitem"
                  type="button"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom overlay */}
        <div className="absolute bottom-0 w-full px-5 pb-5 pt-2 bg-gradient-to-t from-black/90 to-transparent text-white flex flex-col space-y-1 z-10">
          <div className="flex items-center gap-3">
            <img
              src={avatar}
              alt={`${username}'s avatar`}
              className="w-10 h-10 rounded-full border-2 border-red-600 object-cover flex-shrink-0"
              draggable={false}
            />
            <div className="flex-1 flex flex-col justify-center overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="font-semibold truncate">{username}</span>
                <button
                  onClick={handleSubscribe}
                  className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
                    subscribed ? 'bg-gray-600 text-white' : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                  type="button"
                  aria-pressed={subscribed}
                  aria-label={subscribed ? 'Unsubscribe' : 'Subscribe'}
                >
                  {subscribed ? 'Subscribed' : 'Subscribe'}
                </button>
              </div>
              <p className="text-sm truncate">{description}</p>
            </div>
          </div>
        </div>

        {/* Comments panel */}
        {showComments && (
          <section
            id="comments-section"
            className="absolute bottom-0 left-0 w-full max-h-64 bg-black bg-opacity-95 text-white p-4 overflow-y-auto z-20 flex flex-col"
            aria-live="polite"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">Comments ({commentCount.toLocaleString()})</h3>
              <button
                onClick={closeComments}
                aria-label="Close comments"
                className="text-xl font-bold leading-none hover:text-red-600"
                type="button"
              >
                &times;
              </button>
            </div>
            <ul className="flex-grow overflow-y-auto space-y-2 mb-2">
              {commentsList.length === 0 ? (
                <li className="text-gray-400 italic">No comments yet.</li>
              ) : (
                commentsList.map((c) => (
                  <li key={c.id} className="break-words">
                    <strong>{c.user}:</strong> {c.text}
                  </li>
                ))
              )}
              <div ref={commentEndRef} />
            </ul>

            <form onSubmit={handleAddComment} className="mt-2 flex gap-2" aria-label="Add a comment form">
              <input
                ref={commentInputRef}
                type="text"
                value={newComment}
                onChange={handleNewCommentChange}
                placeholder="Add a comment..."
                className="flex-grow rounded px-3 py-1 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                aria-label="Add a comment"
                autoComplete="off"
              />
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition-colors"
                aria-label="Post comment"
              >
                Post
              </button>
            </form>
          </section>
        )}

        {/* Toast notification */}
        {toastVisible && (
          <div
            role="alert"
            aria-live="assertive"
            className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-5 py-2 rounded-lg shadow-lg z-50"
          >
            Link copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
};

export default SnipsOpen;




    // Demo wrapper for testing
    //const DemoSnipsOpen = () => {
    //return (
        //<SnipsOpen
    //backgroundImage="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    //avatar="https://randomuser.me/api/portraits/men/32.jpg"
    //likes="12K"
    //comments="3"
    //description="Amazing short video about nature and adventure!"
    //username="naturelover"
    //onSubscribeClick={(subscribed) =>
        //alert(subscribed ? 'Subscribed!' : 'Unsubscribed!')
    //}
    ///>

    //);
    //};

    //export default DemoSnipsOpen;

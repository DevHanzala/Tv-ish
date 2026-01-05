import React from 'react';

const notifications = {
  today: [
    {
      id: 1,
      title: 'Check our new arrival',
      subtitle: 'Favourites Places - 2h ago',
      image:
        'https://upload.wikimedia.org/wikipedia/en/2/28/Back_to_the_Future_%281985%29_-_Theatrical_Poster.jpg',
      read: false,
    },
    {
      id: 2,
      title: 'Top trending',
      subtitle: 'Favourites Places - 2h ago',
      image:
        'https://upload.wikimedia.org/wikipedia/en/5/54/Angel_Black_Movie_Poster.jpg',
      read: true,
    },
  ],
  yesterday: [
    {
      id: 6,
      title: 'New suggestion for you',
      subtitle: 'Favourites Places - 1 day ago',
      image:
        'https://upload.wikimedia.org/wikipedia/en/3/35/Inception_%282010%29_theatrical_poster.jpg',
      read: false,
    },
  ],
  thisWeek: [
    {
      id: 3,
      title: 'You may like it',
      subtitle: 'Favourites Places - 3 days ago',
      image:
        'https://upload.wikimedia.org/wikipedia/en/4/41/Stranger_Things_logo.png',
      read: false,
    },
    {
      id: 4,
      title: 'Watch it now',
      subtitle: 'Favourites Places - 4 days ago',
      image:
        'https://upload.wikimedia.org/wikipedia/en/9/90/Avengers_Endgame_poster.jpg',
      read: false,
    },
    {
      id: 5,
      title: 'Check our new arrival',
      subtitle: 'Favourites Places - 5 days ago',
      image:
        'https://upload.wikimedia.org/wikipedia/en/e/ee/Uplikan_poster.jpg',
      read: true,
    },
  ],
};

const Notification = ({ onClose }) => {
  const totalNotifications =
    notifications.today.length +
    notifications.yesterday.length +
    notifications.thisWeek.length;

  return (
    <div className="fixed top-0 right-0 w-full h-screen md:max-w-md md:h-[60vh] md:mt-20 bg-black text-white p-4 shadow-lg z-50 overflow-y-auto scrollbar-hide scroll-smooth">
      {/* Close Button for Desktop */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-xl font-bold hover:text-red-600 md:block hidden"
        aria-label="Close notifications"
      >
        &times;
      </button>

      {/* Header */}
      <h2 className="text-red-600 text-2xl font-bold mb-1">Notifications</h2>
      <p className="text-sm text-gray-400 mb-6">
        You have{' '}
        <span className="text-blue-600 font-semibold">{totalNotifications} Notifications</span> today.
      </p>

      {/* Section Reuse Function */}
      {['today', 'yesterday', 'thisWeek'].map((sectionKey) => {
        const labelMap = {
          today: 'Today',
          yesterday: 'Yesterday',
          thisWeek: 'This Week',
        };
        return (
          <div key={sectionKey} className="mt-6">
            <h3 className="text-white text-lg font-semibold mb-3">{labelMap[sectionKey]}</h3>
            <div className="space-y-4">
              {notifications[sectionKey].map(({ id, title, subtitle, image, read }) => (
                <div key={id}>
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-3 h-3 rounded-full mt-1 ${read ? 'bg-transparent' : 'bg-blue-600'}`}
                    />
                    <img
                      src={image}
                      alt={title}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex flex-col">
                      <a
                        href="#"
                        className={`text-sm font-semibold ${read ? 'text-gray-400' : 'text-blue-600 hover:underline'}`}
                      >
                        {title}
                      </a>
                      <span className="text-xs text-gray-400">{subtitle}</span>
                    </div>
                  </div>
                  <hr className="border-gray-700 mt-3" />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Notification;

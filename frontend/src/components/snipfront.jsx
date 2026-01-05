import React, { useState, useEffect, useRef } from 'react';

const SnipFront = () => {
  const [emojis, setEmojis] = useState([]);
  const [autoLoveEmojis, setAutoLoveEmojis] = useState([]);
  const [displayedChats, setDisplayedChats] = useState([]);

  const chatContainerRef = useRef(null);
  const emojiList = ['😂', '😍', '❤️', '👏', '🤝', '🔥'];

  const allChats = [
    { name: 'Roy Tang Qi', msg: 'Kalimantan Hadir', avatar: 'https://i.pravatar.cc/40?img=1' },
    { name: 'Rahman Bushi', msg: 'Wih Keren Bangeeeet', avatar: 'https://i.pravatar.cc/40?img=2' },
    { name: 'Yono Spakbor', msg: 'Gilaas, ini yang ditunggu tunggu', avatar: 'https://i.pravatar.cc/40?img=3' },
    { name: 'Ruly Chakram', msg: 'Mbak Is, Aku Padamuuu', avatar: 'https://i.pravatar.cc/40?img=4' },
    { name: 'Budi Keyboar', msg: 'Kayak konser setengah abad!! 🔥🔥🔥🔥🔥', avatar: 'https://i.pravatar.cc/40?img=5' },
    { name: 'Bambang Sanex', msg: 'Akay betul itu bud.', avatar: 'https://i.pravatar.cc/40?img=6' },
  ];

  const sendEmoji = (emoji) => {
    const id = Date.now();
    setEmojis((prev) => [...prev, { id, symbol: emoji }]);
    setTimeout(() => {
      setEmojis((prev) => prev.filter((e) => e.id !== id));
    }, 5000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const loveEmojis = ['❤️', '😍'];
      const randomEmoji = loveEmojis[Math.floor(Math.random() * loveEmojis.length)];
      const leftPos = Math.random() * 90;

      setAutoLoveEmojis((prev) => [...prev, { id, symbol: randomEmoji, left: leftPos }]);

      setTimeout(() => {
        setAutoLoveEmojis((prev) => prev.filter((e) => e.id !== id));
      }, 5000);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let index = 0;
    const maxMessages = allChats.length * 3;

    const interval = setInterval(() => {
      setDisplayedChats((prev) => {
        const next = [...prev, allChats[index]];
        if (next.length > maxMessages) {
          return next.slice(next.length - maxMessages);
        }
        return next;
      });

      index = (index + 1) % allChats.length;
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!chatContainerRef.current) return;
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [displayedChats]);

  return (
    <div className="relative w-full h-[60vh] pt-16 bg-black text-white overflow-hidden flex flex-col items-center justify-start">
      {/* Background */}
      <img
        src="/images/concert-bg.jpg"
        alt="Concert Background"
        className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 z-0"
      />

      {/* Click Emojis */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {emojis.map((emoji) => (
          <span
            key={emoji.id}
            className="absolute text-3xl sm:text-4xl animate-floating-unique"
            style={{
              left: `${Math.random() * 90}%`,
              bottom: '0%',
              transformOrigin: 'center center',
            }}
          >
            {emoji.symbol}
          </span>
        ))}
      </div>

      {/* Auto Emojis ❤️ 😍 */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {autoLoveEmojis.map(({ id, symbol, left }) => (
          <span
            key={id}
            className="absolute text-4xl animate-floating-unique"
            style={{
              left: `${left}%`,
              bottom: '0%',
              transformOrigin: 'center center',
              color: symbol === '❤️' ? '#FF4D6D' : '#ff66cc',
              textShadow: '0 0 5px #FF4D6D, 0 0 10px #FF4D6D',
            }}
          >
            {symbol}
          </span>
        ))}
      </div>

      {/* Tablet Frame - Smaller & spaced */}
      <div className="mt-2 mb-4">
        <div
          className="relative z-10 w-[50vw] max-w-[500px] rounded-2xl overflow-hidden shadow-2xl bg-black animate-pulse-slow"
          style={{ aspectRatio: '3 / 2' }}
        >
          <img
            src="/images/concert-frame.jpg"
            alt="Live Concert Frame"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Emoji Reaction Bar */}
      <div className="absolute bottom-20 left-4 z-40 bg-black/70 px-3 py-2 rounded-md flex items-center gap-3 shadow-md backdrop-blur-sm">
        {emojiList.slice(0, 4).map((emoji, index) => (
          <div
            key={index}
            onClick={() => sendEmoji(emoji)}
            className="flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-125 hover:animate-pulse-fast"
          >
            <span className="text-lg sm:text-xl">{emoji}</span>
            <span className="text-[10px] text-gray-300 mt-1">{index + 1}</span>
          </div>
        ))}
      </div>

      {/* Chat Box */}
      <div
        ref={chatContainerRef}
        className="scroll-container absolute bottom-8 right-4 sm:right-8 z-40 w-[40vw] max-w-[300px] flex flex-col gap-2 max-h-[200px] overflow-y-auto"
      >
        {displayedChats.map((chat, index) => (
          <div
            key={index}
            className="flex items-start gap-2 bg-black/50 backdrop-blur-md px-3 py-2 rounded-lg shadow-sm transition duration-500"
          >
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-7 h-7 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="text-xs font-semibold leading-tight">
                {chat.name}
              </div>
              <div className="text-xs text-gray-100 leading-tight">{chat.msg}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Styles */}
      <style>{`
        .scroll-container::-webkit-scrollbar {
          display: none;
        }
        .scroll-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes floating-unique {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          50% { transform: translateY(-300px) rotate(15deg); opacity: 0.8; }
          100% { transform: translateY(-600px) rotate(-15deg); opacity: 0; }
        }

        .animate-floating-unique {
          animation: floating-unique 5s ease-in-out forwards;
        }

        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
          }
          50% {
            transform: scale(1.02);
            box-shadow: 0 0 25px rgba(255, 255, 255, 0.25);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        @keyframes pulse-fast {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 2px rgba(255,255,255,0));
          }
          50% {
            transform: scale(1.2);
            filter: drop-shadow(0 0 8px rgba(255,255,255,0.7));
          }
        }

        .animate-pulse-fast {
          animation: pulse-fast 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default SnipFront;

// import React, { useRef, useEffect, useState } from 'react';

// // Sample video data with video URLs for playback
// const videos = [
//   {
//     title: "Rick Astley - Never Gonna Give You Up",
//     channel: "RickAstleyVEVO",
//     description: "A classic 80s music video that became an internet meme.",
//     thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
//     videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//   },
//   {
//     title: "PSY - GANGNAM STYLE",
//     channel: "officialpsy",
//     description: "The global hit that took the world by storm with its catchy beat.",
//     thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg",
//     videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
//   },
//   {
//     title: "Luis Fonsi - Despacito ft. Daddy Yankee",
//     channel: "LuisFonsiVEVO",
//     description: "A record-breaking song with a vibrant rhythm.",
//     thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/hqdefault.jpg",
//     videoUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
//   },
//   // Duplicate the videos to ensure enough content for scrolling
//   {
//     title: "Rick Astley - Never Gonna Give You Up",
//     channel: "RickAstleyVEVO",
//     description: "A classic 80s music video that became an internet meme.",
//     thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
//     videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//   },
//   {
//     title: "PSY - GANGNAM STYLE",
//     channel: "officialpsy",
//     description: "The global hit that took the world by storm with its catchy beat.",
//     thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg",
//     videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
//   },
//   {
//     title: "Luis Fonsi - Despacito ft. Daddy Yankee",
//     channel: "LuisFonsiVEVO",
//     description: "A record-breaking song with a vibrant rhythm.",
//     thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/hqdefault.jpg",
//     videoUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
//   },
// ];

// const VideoSection = () => {
//   const scrollRef = useRef(null);
//   const [isScrolling, setIsScrolling] = useState(false);

//   // Handle infinite scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       if (!scrollRef.current || isScrolling) return;

//       const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

//       // If scrolled to the end (right side)
//       if (scrollLeft + clientWidth >= scrollWidth - 1) {
//         setIsScrolling(true);
//         scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
//       }
//       // If scrolled to the start (left side)
//       else if (scrollLeft <= 1) {
//         setIsScrolling(true);
//         scrollRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
//       }
//     };

//     const onScrollEnd = () => {
//       setIsScrolling(false);
//     };

//     const ref = scrollRef.current;
//     ref.addEventListener('scroll', handleScroll);
//     ref.addEventListener('scrollend', onScrollEnd);

//     return () => {
//       ref.removeEventListener('scroll', handleScroll);
//       ref.removeEventListener('scrollend', onScrollEnd);
//     };
//   }, [isScrolling]);

//   // Handle arrow button clicks for scrolling
//   const scrollLeft = () => {
//     if (scrollRef.current) {
//       const { scrollLeft, clientWidth } = scrollRef.current;
//       scrollRef.current.scrollTo({
//         left: scrollLeft - clientWidth,
//         behavior: 'smooth',
//       });
//     }
//   };

//   const scrollRight = () => {
//     if (scrollRef.current) {
//       const { scrollLeft, clientWidth } = scrollRef.current;
//       scrollRef.current.scrollTo({
//         left: scrollLeft + clientWidth,
//         behavior: 'smooth',
//       });
//     }
//   };

//   return (
//     <div className="p-4 relative">
//       <h2 className="text-2xl font-bold mb-4 text-center">Top Popular Videos</h2>
//       <div className="relative">
//         {/* Left Arrow */}
//         <button
//           onClick={scrollLeft}
//           className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 hover:bg-gray-300 z-10"
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M15 19l-7-7 7-7"
//             />
//           </svg>
//         </button>

//         {/* Video Section */}
//         <div
//           ref={scrollRef}
//           className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide space-x-4"
//           style={{ scrollBehavior: 'smooth' }}
//         >
//           {videos.map((video, index) => (
//             <div
//               key={index}
//               className="min-w-[300px] snap-center bg-white rounded-lg shadow-md overflow-hidden relative"
//             >
//               <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
//                 <div className="relative">
//                   <img
//                     src={video.thumbnail}
//                     alt={video.title}
//                     className="w-full h-40 object-cover"
//                   />
//                   {/* Play Button Overlay */}
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <svg
//                       className="w-12 h-12 text-white opacity-80 hover:opacity-100"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path d="M8 5v14l11-7z" />
//                     </svg>
//                   </div>
//                 </div>
//               </a>
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold truncate">{video.title}</h3>
//                 <p className="text-sm text-gray-600">{video.channel}</p>
//                 <p className="text-sm text-gray-500 mt-1">{video.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Right Arrow */}
//         <button
//           onClick={scrollRight}
//           className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 hover:bg-gray-300 z-10"
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M9 5l7 7-7 7"
//             />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };

// // Explicitly export as default for Vite compatibility
// export default VideoSection;











import React, { useState, useEffect, useRef } from 'react';

// Mock API base URL for fetching YouTube links (replace with your actual admin panel API)
const BASE_URL = 'https://mock-admin-api.example.com/';

// Static fallback YouTube video data
const fallbackVideos = [
  {
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Rick Astley - Never Gonna Give You Up
    subheading: 'Iconic 80s Hit',
    description: 'A classic 80s music video that became an internet meme.',
  },
  {
    videoUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0', // PSY - Gangnam Style
    subheading: 'Viral Dance Sensation',
    description: 'The global hit that took the world by storm with its catchy beat.',
  },
  {
    videoUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk', // Luis Fonsi - Despacito
    subheading: 'Latin Pop Anthem',
    description: 'A record-breaking song with a vibrant rhythm.',
  },
  {
    videoUrl: 'https://www.youtube.com/watch?v=JGwWNGJdvx8', // Ed Sheeran - Shape of You
    subheading: 'Modern Pop Classic',
    description: 'A chart-topping hit with a romantic vibe.',
  },
  {
    videoUrl: 'https://www.youtube.com/watch?v=OPf0YbXqDm0', // Mark Ronson ft. Bruno Mars - Uptown Funk
    subheading: 'Funky Dance Anthem',
    description: 'A high-energy track with a retro vibe that dominated the charts.',
  },
  {
    videoUrl: 'https://www.youtube.com/watch?v=Zi_XLOBDo_Y', // Adele - Hello
    subheading: 'Soulful Ballad',
    description: 'A powerful comeback single with emotional depth and stunning vocals.',
  },
  {
    videoUrl: 'https://www.youtube.com/watch?v=rexKqvgPVuA', // The Weeknd - Blinding Lights
    subheading: 'Synthwave Hit',
    description: 'An 80s-inspired track that became a global sensation.',
  },
];

// Component for playing the video on click
const VideoPlayer = ({ videoUrl, onClose }) => {
  // Extract YouTube video ID from URL
  const getYouTubeId = (url) => {
    const regExp = /^(?:.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=))([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
  };

  const videoId = getYouTubeId(videoUrl);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg p-4 w-full max-w-3xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
        >
          ✕
        </button>
        {/* YouTube Iframe */}
        {videoId ? (
          <iframe
            className="w-full h-96 rounded-lg"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="text-center text-red-500">Invalid YouTube URL</div>
        )}
      </div>
    </div>
  );
};

const VideoSection = () => {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const carouselRef = useRef(null);

  // State to track the number of visible items based on screen size
  const [visibleItems, setVisibleItems] = useState(1);

  // Fetch YouTube video links from the admin panel API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`${BASE_URL}youtube-links`, {
          headers: {
            Authorization: 'Bearer YOUR_API_TOKEN', // Replace with your API token
          },
        });
        const data = await response.json();
        // Mock data structure: assuming API returns an array of objects with videoUrl, subheading, and description
        const formattedVideos = data.map((item, index) => ({
          videoUrl: item.videoUrl, // YouTube URL
          subheading: item.subheading || `Subheading ${index + 1}`,
          description: item.description || `Description for video ${index + 1}`,
        }));
        setVideos(formattedVideos);
      } catch (error) {
        console.error('Error fetching videos, using fallback data:', error);
        setVideos(fallbackVideos); // Use static fallback data if API fails
      }
    };
    fetchVideos();
  }, []);

  // Determine the number of visible items based on screen size
  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth >= 1024) {
        setVisibleItems(3); // lg: 3 items
      } else if (window.innerWidth >= 768) {
        setVisibleItems(2); // md: 2 items
      } else {
        setVisibleItems(1); // sm and below: 1 item
      }
    };

    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

  // Ensure we have enough clones to make the loop seamless
  const clonesPerSide = visibleItems * 2; // Clone enough items to cover the visible area during transition
  const extendedVideos = [
    ...videos.slice(-clonesPerSide),
    ...videos,
    ...videos.slice(0, clonesPerSide),
  ];

  // Start at the first real item (after the cloned items at the start)
  useEffect(() => {
    if (videos.length > 0) {
      setCurrentIndex(clonesPerSide);
    }
  }, [videos.length, visibleItems]);

  // Manual scroll handlers
  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  // Extract YouTube video ID for embedding
  const getYouTubeId = (url) => {
    const regExp = /^(?:.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=))([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
  };

  if (videos.length < 1) return <div className="text-center text-gray-500">Loading videos...</div>;

  // Calculate the percentage to shift per item based on the number of visible items
  const itemWidthPercentage = 100 / visibleItems;

  // Calculate the real index for rendering purposes (maps extendedVideos back to videos)
  const realIndex = (index) => {
    const totalRealItems = videos.length;
    const adjustedIndex = (index - clonesPerSide + totalRealItems) % totalRealItems;
    return adjustedIndex < 0 ? adjustedIndex + totalRealItems : adjustedIndex;
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Top Popular Videos</h2>
      <div className="relative flex items-center">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-0 z-10 bg-gray-200 rounded-full p-2 transform -translate-y-1/2 top-1/2 hover:bg-gray-300"
        >
          <span className="text-xl">←</span>
        </button>

        {/* Carousel Container */}
        <div className="overflow-hidden w-full">
          <div
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * itemWidthPercentage}%)`,
            }}
          >
            {extendedVideos.map((video, index) => (
              <div
                key={`${realIndex(index)}-${index}`} // Use a unique key for each item
                className="flex-shrink-0 w-full sm:w-full md:w-1/2 lg:w-1/3" // Full width on mobile, 1/2 on md, 1/3 on lg
                onClick={() => setSelectedVideo(video.videoUrl)}
              >
                <div className="rounded-lg p-4 shadow-md h-75 flex flex-col justify-between transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer mx-auto sm:max-w-full md:max-w-[90%] lg:max-w-[90%]">
                  <div className="relative">
                    {/* YouTube Iframe for Hover Play */}
                    {getYouTubeId(video.videoUrl) ? (
                      <iframe
                        className="w-full h-48 rounded-lg"
                        src={`https://www.youtube.com/embed/${getYouTubeId(video.videoUrl)}?mute=1&controls=0&showinfo=0&rel=0&iv_load_policy=3`}
                        title={video.subheading}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        onMouseEnter={(e) => e.target.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')}
                        onMouseLeave={(e) => e.target.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')}
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-300 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">Invalid YouTube URL</span>
                      </div>
                    )}
                  </div>
                  {/* Subheading */}
                  <h3 className="mt-2 font-semibold text-lg">{video.subheading || 'Untitled'}</h3>
                  {/* Description */}
                  <p className="mt-1 text-sm text-gray-600">{video.description || 'No description available'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-0 z-10 bg-gray-200 rounded-full p-2 transform -translate-y-1/2 top-1/2 hover:bg-gray-300"
        >
          <span className="text-xl">→</span>
        </button>
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <VideoPlayer
          videoUrl={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
};

export default VideoSection;
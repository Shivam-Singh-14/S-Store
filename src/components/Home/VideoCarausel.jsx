import React, { useState, useRef } from 'react';
import { FaPlay } from 'react-icons/fa';

// // import React, { useState, useEffect, useRef } from 'react';

// // // Mock API base URL for fetching YouTube links (replace with your actual admin panel API)
// // const BASE_URL = 'https://mock-admin-api.example.com/';

// // // Static fallback YouTube video data
// // const fallbackVideos = [
// //   {
// //     videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Rick Astley - Never Gonna Give You Up
// //     date: '20 Jan',
// //     category: 'Music',
// //     title: 'Never Gonna Give You Up',
// //     author: 'Rick Astley',
// //     publishDate: 'Jan 20, 2022',
// //   },
// //   {
// //     videoUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0', // PSY - Gangnam Style
// //     date: '15 Jul',
// //     category: 'Music',
// //     title: 'Gangnam Style',
// //     author: 'PSY',
// //     publishDate: 'Jul 15, 2012',
// //   },
// //   {
// //     videoUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk', // Luis Fonsi - Despacito
// //     date: '12 Jan',
// //     category: 'Music',
// //     title: 'Despacito',
// //     author: 'Luis Fonsi',
// //     publishDate: 'Jan 12, 2017',
// //   },
// //   {
// //     videoUrl: 'https://www.youtube.com/watch?v=JGwWNGJdvx8', // Ed Sheeran - Shape of You
// //     date: '30 Jan',
// //     category: 'Music',
// //     title: 'Shape of You',
// //     author: 'Ed Sheeran',
// //     publishDate: 'Jan 30, 2017',
// //   },
// // ];

// // // Component for playing the video on click
// // const VideoPlayer = ({ videoUrl, onClose }) => {
// //   // Extract YouTube video ID from URL
// //   const getYouTubeId = (url) => {
// //     const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
// //     const match = url.match(regExp);
// //     return match && match[2].length === 11 ? match[2] : null;
// //   };

// //   const TAX_RATE = 0.1;
// //   const videoId = getYouTubeId(videoUrl);

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
// //       <div className="relative bg-white rounded-lg p-4 w-full max-w-3xl">
// //         {/* Close Button */}
// //         <button
// //           onClick={onClose}
// //           className="absolute top-2 right-2 bg-gray-200 rounded-full p-2"
// //         >
// //           ✕
// //         </button>
// //         {/* YouTube Iframe */}
// //         {videoId ? (
// //           <iframe
// //             className="w-full h-96 rounded-lg"
// //             src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
// //             title="YouTube video player"
// //             frameBorder="0"
// //             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// //             allowFullScreen
// //           />
// //         ) : (
// //           <div className="text-center text-red-500">Invalid YouTube URL</div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // const VideoCarousel = () => {
// //   const [videos, setVideos] = useState([]);
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [selectedVideo, setSelectedVideo] = useState(null);
// //   const carouselRef = useRef(null);

// //   // Fetch YouTube video links from the admin panel API
// //   useEffect(() => {
// //     const fetchVideos = async () => {
// //       try {
// //         // Replace with your actual API endpoint
// //         const response = await fetch(`${BASE_URL}youtube-links`, {
// //           headers: {
// //             Authorization: 'Bearer YOUR_API_TOKEN', // Replace with your API token
// //           },
// //         });
// //         const data = await response.json();
// //         // Mock data structure: assuming API returns an array of objects with videoUrl and metadata
// //         const formattedVideos = data.map((item, index) => ({
// //           videoUrl: item.videoUrl, // YouTube URL
// //           date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short' }),
// //           category: item.category || 'Uncategorized',
// //           title: item.title || `Video ${index + 1}`,
// //           author: item.author || 'Admin',
// //           publishDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
// //         }));
// //         setVideos(formattedVideos);
// //       } catch (error) {
// //         console.error('Error fetching videos, using fallback data:', error);
// //         setVideos(fallbackVideos); // Use static fallback data if API fails
// //       }
// //     };
// //     fetchVideos();
// //   }, []);

// //   // Auto-scroll effect
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setCurrentIndex((prevIndex) => {
// //         const nextIndex = prevIndex + 1;
// //         if (nextIndex >= videos.length - 2) {
// //           return 0; // Loop back to start
// //         }
// //         return nextIndex;
// //       });
// //     }, 3000); // Scroll every 3 seconds

// //     return () => clearInterval(interval); // Cleanup on unmount
// //   }, [videos.length]);

// //   // Manual scroll handlers
// //   const handleNext = () => {
// //     setCurrentIndex((prevIndex) => {
// //       const nextIndex = prevIndex + 1;
// //       if (nextIndex >= videos.length - 2) {
// //         return 0;
// //       }
// //       return nextIndex;
// //     });
// //   };

// //   const handlePrev = () => {
// //     setCurrentIndex((prevIndex) => {
// //       const prevIndexValue = prevIndex - 1;
// //       if (prevIndexValue < 0) {
// //         return videos.length - 3;
// //       }
// //       return prevIndexValue;
// //     });
// //   };

// //   // Extract YouTube video ID for embedding
// //   const getYouTubeId = (url) => {
// //     const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
// //     const match = url.match(regExp);
// //     return match && match[2].length === 11 ? match[2] : null;
// //   };

// //   if (videos.length < 3) return <div className="text-center text-gray-500">Loading videos...</div>;

// //   return (
// //     <div className="max-w-7xl mx-auto p- conditionals4">
// //       <h2 className="text-2xl font-bold text-center mb-4">Top Popular Articles</h2>
// //       <div className="relativeStriveToBeHealthy relative flex items-center">
// //         {/* Left Arrow */}
// //         <button
// //           onClick={handlePrev}
// //           className="absolute left-0 z-10 bg-gray-200 rounded-full p-2 transform -translate-y-1/2 top-1/2"
// //         >
// //           <span className="text-xl">←</span>
// //         </button>

// //         {/* Carousel Container */}
// //         <div className="flex space-x-4 overflow-hidden w-full">
// //           <div
// //             ref={carouselRef}
// //             className="flex transition-transform duration-500 ease-in-out"
// //             style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
// //           >
// //             {videos.map((video, index) => (
// //               <div
// //                 key={index}
// //                 className="relative w-1/3 flex-shrink-0 px-2 sm:w-full md:w-1/2 lg:w-1/3"
// //                 onClick={() => setSelectedVideo(video.videoUrl)}
// //               >
// //                 <div className="bg-gray-100 rounded-lg p-4 shadow-md">
// //                   <div className="relative">
// //                     {/* Date Badge */}
// //                     <span className="absolute top-2 left-2 bg-white rounded-full px-2 py-1 text-sm font-medium">
// //                       {video.date || 'N/A'}
// //                     </span>
// //                     {/* YouTube Iframe for Hover Play */}
// //                     {getYouTubeId(video.videoUrl) ? (
// //                       <iframe
// //                         className="w-full h-48 rounded-lg"
// //                         src={`https://www.youtube.com/embed/${getYouTubeId(video.videoUrl)}?mute=1&controls=0&showinfo=0&rel=0&iv_load_policy=3`}
// //                         title={video.title}
// //                         frameBorder="0"
// //                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// //                         onMouseEnter={(e) => e.target.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')}
// //                         onMouseLeave={(e) => e.target.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')}
// //                       />
// //                     ) : (
// //                       <div className="w-full h-48 bg-gray-300 rounded-lg flex items-center justify-center">
// //                         <span className="text-gray-500">Invalid YouTube URL</span>
// //                       </div>
// //                     )}
// //                     {/* Category Badge */}
// //                     <span className="absolute bottom-2 right-2 bg-white rounded-full px-2 py-1 text-sm font-medium">
// //                       {video.category || 'Uncategorized'}
// //                     </span>
// //                   </div>
// //                   {/* Title */}
// //                   <h3 className="mt-2 font-semibold text-lg">{video.title || 'Untitled'}</h3>
// //                   {/* Continue Reading Link */}
// //                   <a href="#" className="text-blue-500 text-sm hover:underline">
// //                     Continue Reading →
// //                   </a>
// //                   {/* Author and Publish Date */}
// //                   <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
// //                     <span>© by {video.author || 'Unknown'}</span>
// //                     <div className="flex items-center space-x-2">
// //                       <span>{video.publishDate || 'N/A'}</span>
// //                       <span className="flex items-center">
// //                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
// //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
// //                         </svg>
// //                         0
// //                       </span>
// //                       <span className="flex items-center">
// //                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
// //                         </svg>
// //                         0
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Right Arrow */}
// //         <button
// //           onClick={handleNext}
// //           className="absolute right-0 z-10 bg-gray-200 rounded-full p-2 transform -translate-y-1/2 top-1/2"
// //         >
// //           <span className="text-xl">→</span>
// //         </button>
// //       </div>

// //       {/* Video Player Modal */}
// //       {selectedVideo && (
// //         <VideoPlayer
// //           videoUrl={selectedVideo}
// //           onClose={() => setSelectedVideo(null)}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default VideoCarousel;




// import React, { useState, useEffect, useRef } from 'react';

// // Mock API base URL for fetching YouTube links (replace with your actual admin panel API)
// const BASE_URL = 'https://mock-admin-api.example.com/';

// // Static fallback YouTube video data
// const fallbackVideos = [
//   {
//     videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Rick Astley - Never Gonna Give You Up
//     subheading: 'Iconic 80s Hit',
//     description: 'A classic 80s music video that became an internet meme.',
//   },
//   {
//     videoUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0', // PSY - Gangnam Style
//     subheading: 'Viral Dance Sensation',
//     description: 'The global hit that took the world by storm with its catchy beat.',
//   },
//   {
//     videoUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk', // Luis Fonsi - Despacito
//     subheading: 'Latin Pop Anthem',
//     description: 'A record-breaking song with a vibrant rhythm.',
//   },
//   {
//     videoUrl: 'https://www.youtube.com/watch?v=JGwWNGJdvx8', // Ed Sheeran - Shape of You
//     subheading: 'Modern Pop Classic',
//     description: 'A chart-topping hit with a romantic vibe.',
//   },
//   {
//     videoUrl: 'https://www.youtube.com/watch?v=OPf0YbXqDm0', // Mark Ronson ft. Bruno Mars - Uptown Funk
//     subheading: 'Funky Dance Anthem',
//     description: 'A high-energy track with a retro vibe that dominated the charts.',
//   },
//   {
//     videoUrl: 'https://www.youtube.com/watch?v=Zi_XLOBDo_Y', // Adele - Hello
//     subheading: 'Soulful Ballad',
//     description: 'A powerful comeback single with emotional depth and stunning vocals.',
//   },
//   {
//     videoUrl: 'https://www.youtube.com/watch?v=rexKqvgPVuA', // The Weeknd - Blinding Lights
//     subheading: 'Synthwave Hit',
//     description: 'An 80s-inspired track that became a global sensation.',
//   },
// ];

// // Component for playing the video on click
// const VideoPlayer = ({ videoUrl, onClose }) => {
//   // Extract YouTube video ID from URL
//   const getYouTubeId = (url) => {
//     const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
//     const match = url.match(regExp);
//     return match && match[2].length === 11 ? match[2] : null;
//   };

//   const videoId = getYouTubeId(videoUrl);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//       <div className="relative bg-white rounded-lg p-4 w-full max-w-3xl">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 bg-gray-200 rounded-full p-2"
//         >
//           ✕
//         </button>
//         {/* YouTube Iframe */}
//         {videoId ? (
//           <iframe
//             className="w-full h-96 rounded-lg"
//             src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
//             title="YouTube video player"
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           />
//         ) : (
//           <div className="text-center text-red-500">Invalid YouTube URL</div>
//         )}
//       </div>
//     </div>
//   );
// };

// const VideoCarousel = () => {
//   const [videos, setVideos] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const carouselRef = useRef(null);

//   // State to track the number of visible items based on screen size
//   const [visibleItems, setVisibleItems] = useState(1);

//   // Fetch YouTube video links from the admin panel API
//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         // Replace with your actual API endpoint
//         const response = await fetch(`${BASE_URL}youtube-links`, {
//           headers: {
//             Authorization: 'Bearer YOUR_API_TOKEN', // Replace with your API token
//           },
//         });
//         const data = await response.json();
//         // Mock data structure: assuming API returns an array of objects with videoUrl, subheading, and description
//         const formattedVideos = data.map((item, index) => ({
//           videoUrl: item.videoUrl, // YouTube URL
//           subheading: item.subheading || `Subheading ${index + 1}`,
//           description: item.description || `Description for video ${index + 1}`,
//         }));
//         setVideos(formattedVideos);
//       } catch (error) {
//         console.error('Error fetching videos, using fallback data:', error);
//         setVideos(fallbackVideos); // Use static fallback data if API fails
//       }
//     };
//     fetchVideos();
//   }, []);

//   // Determine the number of visible items based on screen size
//   useEffect(() => {
//     const updateVisibleItems = () => {
//       if (window.innerWidth >= 1024) {
//         setVisibleItems(3); // lg: 3 items
//       } else if (window.innerWidth >= 768) {
//         setVisibleItems(2); // md: 2 items
//       } else {
//         setVisibleItems(1); // sm and below: 1 item
//       }
//     };

//     updateVisibleItems();
//     window.addEventListener('resize', updateVisibleItems);
//     return () => window.removeEventListener('resize', updateVisibleItems);
//   }, []);

//   // Ensure we have enough clones to make the loop seamless
//   const clonesPerSide = visibleItems * 2; // Clone enough items to cover the visible area during transition
//   const extendedVideos = [
//     ...videos.slice(-clonesPerSide),
//     ...videos,
//     ...videos.slice(0, clonesPerSide),
//   ];

//   // Start at the first real item (after the cloned items at the start)
//   useEffect(() => {
//     if (videos.length > 0) {
//       setCurrentIndex(clonesPerSide);
//     }
//   }, [videos.length, visibleItems]);

//   // Manual scroll handlers
//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => prevIndex + 1);
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) => prevIndex - 1);
//   };

//   // Extract YouTube video ID for embedding
//   const getYouTubeId = (url) => {
//     const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
//     const match = url.match(regExp);
//     return match && match[2].length === 11 ? match[2] : null;
//   };

//   if (videos.length < 1) return <div className="text-center text-gray-500">Loading videos...</div>;

//   // Calculate the percentage to shift per item based on the number of visible items
//   const itemWidthPercentage = 100 / visibleItems;

//   // Calculate the real index for rendering purposes (maps extendedVideos back to videos)
//   const realIndex = (index) => {
//     const totalRealItems = videos.length;
//     const adjustedIndex = (index - clonesPerSide + totalRealItems) % totalRealItems;
//     return adjustedIndex < 0 ? adjustedIndex + totalRealItems : adjustedIndex;
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       <h2 className="text-2xl font-bold text-center mb-4">Top Popular Videos</h2>
//       <div className="relative flex items-center">
//         {/* Left Arrow */}
//         <button
//           onClick={handlePrev}
//           className="absolute left-0 z-10 bg-gray-200 rounded-full p-2 transform -translate-y-1/2 top-1/2"
//         >
//           <span className="text-xl">←</span>
//         </button>

//         {/* Carousel Container */}
//         <div className="overflow-hidden w-full">
//           <div
//             ref={carouselRef}
//             className="flex transition-transform duration-500 ease-in-out"
//             style={{
//               transform: `translateX(-${currentIndex * itemWidthPercentage}%)`,
//             }}
//           >
//             {extendedVideos.map((video, index) => (
//               <div
//                 key={`${realIndex(index)}-${index}`} // Use a unique key for each item
//                 className="flex-shrink-0 w-full sm:w-full md:w-1/2 lg:w-1/3" // Full width on mobile, 1/2 on md, 1/3 on lg
//                 onClick={() => setSelectedVideo(video.videoUrl)}
//               >
//                 <div className="rounded-lg p-4 shadow-md h-75 flex flex-col justify-between transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer mx-auto sm:max-w-full md:max-w-[90%] lg:max-w-[90%]">
//                   <div className="relative">
//                     {/* YouTube Iframe for Hover Play */}
//                     {getYouTubeId(video.videoUrl) ? (
//                       <iframe
//                         className="w-full h-48 rounded-lg"
//                         src={`https://www.youtube.com/embed/${getYouTubeId(video.videoUrl)}?mute=1&controls=0&showinfo=0&rel=0&iv_load_policy=3`}
//                         title={video.subheading}
//                         frameBorder="0"
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                         onMouseEnter={(e) => e.target.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')}
//                         onMouseLeave={(e) => e.target.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')}
//                       />
//                     ) : (
//                       <div className="w-full h-48 bg-gray-300 rounded-lg flex items-center justify-center">
//                         <span className="text-gray-500">Invalid YouTube URL</span>
//                       </div>
//                     )}
//                   </div>
//                   {/* Subheading */}
//                   <h3 className="mt-2 font-semibold text-lg">{video.subheading || 'Untitled'}</h3>
//                   {/* Description */}
//                   <p className="mt-1 text-sm text-gray-600">{video.description || 'No description available'}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right Arrow */}
//         <button
//           onClick={handleNext}
//           className="absolute right-0 z-10 bg-gray-200 rounded-full p-2 transform -translate-y-1/2 top-1/2"
//         >
//           <span className="text-xl">→</span>
//         </button>
//       </div>

//       {/* Video Player Modal */}
//       {selectedVideo && (
//         <VideoPlayer
//           videoUrl={selectedVideo}
//           onClose={() => setSelectedVideo(null)}
//         />
//       )}
//     </div>
//   );
// };

// // export default VideoCarousel;

import React, { useState, useEffect, useRef } from 'react';

// Mock API base URL for fetching YouTube links (replace with your actual admin panel API)
const BASE_URL = 'https://mock-admin-api.example.com/';

// Static fallback YouTube video data
const fallbackVideos = [
  {
    id: 1,
    title: 'Never Gonna Give You Up',
    description: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
    thumbnail: '/images/video1.jpg',
    videoId: 'dQw4w9WgXcQ',
    date: '20 Jan',
    category: 'Music',
    author: 'Rick Astley',
    publishDate: 'Jan 20, 2022'
  },
  {
    id: 2,
    title: 'Gangnam Style',
    description: 'PSY - Gangnam Style (Official Music Video)',
    thumbnail: '/images/video2.jpg',
    videoId: '9bZkp7q19f0',
    date: '15 Jul',
    category: 'Music',
    author: 'PSY',
    publishDate: 'Jul 15, 2012'
  },
  {
    id: 3,
    title: 'Despacito',
    description: 'Luis Fonsi - Despacito ft. Daddy Yankee',
    thumbnail: '/images/video3.jpg',
    videoId: 'kJQP7kiw5Fk',
    date: '12 Jan',
    category: 'Music',
    author: 'Luis Fonsi',
    publishDate: 'Jan 12, 2017'
  }
];

const VideoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const carouselRef = useRef(null);

  // Auto-scroll effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= mockVideos.length - 2) {
          return 0; // Loop back to start
        }
        return nextIndex;
      });
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Manual scroll handlers
  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= mockVideos.length - 2) {
        return 0;
      }
      return nextIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const prevIndexValue = prevIndex - 1;
      if (prevIndexValue < 0) {
        return mockVideos.length - 3;
      }
      return prevIndexValue;
    });
  };

  return (
    <div className="w-full px-0">
      <h2 className="text-2xl font-bold text-center mb-4">Top Popular Videos</h2>
      <div className="relative flex items-center w-full">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-2 z-10 bg-gray-200 rounded-full p-2 transform -translate-y-1/2 top-1/2"
        >
          <span className="text-xl">←</span>
        </button>

        {/* Carousel Container */}
        <div className="overflow-hidden w-full px-4 sm:px-6 lg:px-8">
          <div
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {mockVideos.map((video, index) => (
              <div
                key={`${realIndex(index)}-${index}`} // Use a unique key for each item
                className="flex-shrink-0 w-full sm:w-3/4 md:w-1/3 lg:w-1/4" // Adjusted widths: 100% on mobile, 75% on sm, 33% on md, 25% on lg
                onClick={() => setSelectedVideo(video.videoUrl)}
              >
                <div className="rounded-lg p-4 shadow-md h-75 flex flex-col justify-between transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer mx-auto sm:max-w-[90%] md:max-w-[80%] lg:max-w-[80%]">
                  <div className="relative">
                    {/* Date Badge */}
                    <span className="absolute top-2 left-2 bg-white rounded-full px-2 py-1 text-sm font-medium">
                      {video.date}
                    </span>
                    {/* Video Thumbnail */}
                    <div className="relative w-full h-48 rounded-lg overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <FaPlay className="text-white text-4xl" />
                      </div>
                    </div>
                    {/* Category Badge */}
                    <span className="absolute bottom-2 right-2 bg-white rounded-full px-2 py-1 text-sm font-medium">
                      {video.category}
                    </span>
                  </div>
                  {/* Title */}
                  <h3 className="mt-2 font-semibold text-lg">{video.title}</h3>
                  {/* Description */}
                  <p className="text-gray-600 text-sm mt-1">{video.description}</p>
                  {/* Author and Publish Date */}
                  <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                    <span>© by {video.author}</span>
                    <span>{video.publishDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-2 z-10 bg-gray-200 rounded-full p-2 transform -translate-y-1/2 top-1/2"
        >
          <span className="text-xl">→</span>
        </button>
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg p-4 w-full max-w-3xl">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-2 right-2 bg-gray-200 rounded-full p-2"
            >
              ✕
            </button>
            <iframe
              className="w-full h-96 rounded-lg"
              src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
              title={selectedVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCarousel;
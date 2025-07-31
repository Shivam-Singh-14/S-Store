import React from 'react';
import { FaPlay } from 'react-icons/fa';

// Mock video data
const mockVideos = [
  {
    id: 1,
    title: "How to Style Your Home",
    description: "Learn the best tips and tricks for home decoration",
    thumbnail: "/images/video-thumbnails/home-style.jpg",
    videoId: "dQw4w9WgXcQ"
  },
  {
    id: 2,
    title: "Latest Fashion Trends",
    description: "Discover the hottest fashion trends of the season",
    thumbnail: "/images/video-thumbnails/fashion-trends.jpg",
    videoId: "dQw4w9WgXcQ"
  },
  {
    id: 3,
    title: "Tech Gadgets Review",
    description: "In-depth review of the latest tech gadgets",
    thumbnail: "/images/video-thumbnails/tech-review.jpg",
    videoId: "dQw4w9WgXcQ"
  }
];

const VideoCarousel = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Featured Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockVideos.map((video) => (
          <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <a
                href={`https://www.youtube.com/watch?v=${video.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300"
              >
                <FaPlay className="text-white text-4xl" />
              </a>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
              <p className="text-gray-600 text-sm">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel; 
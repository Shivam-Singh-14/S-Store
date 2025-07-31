import React, { useState } from 'react';

const Videos = () => {
  const [editingVideo, setEditingVideo] = useState(null);

  // Dummy video data for demonstration
  const [videos, setVideos] = useState([
    {
      id: 1,
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // Replace with actual video URL
      title: 'Product Review',
      description: 'A comprehensive review of our latest product.',
      category: 'Reviews',
    },
    {
      id: 2,
      videoUrl: 'https://www.w3schools.com/html/movie.mp4', // Replace with actual video URL
      title: 'Tutorial Video',
      description: 'Learn how to use the new feature.',
      category: 'Tutorials',
    },
  ]);

  // State for form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    video: null,
  });

  const handleAddVideoClick = () => {
    setEditingVideo({ id: null }); // Indicate adding a new video
    setFormData({ // Clear form data
      title: '',
      description: '',
      category: '',
      video: null,
    });
  };

  const handleCancelClick = () => {
    setEditingVideo(null); // Hide the form
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVideoChange = (file) => {
    setFormData(prev => ({
      ...prev,
      video: file
    }));
  };

  const handleCreateVideo = () => {
    // Handle video creation logic here
    console.log('Creating video with data:', formData);
    // In a real application, you would send formData to your backend API

    // For now, let's simulate adding the new video to the list (without actual upload handling)
    const newVideo = {
      id: videos.length + 1, // Simple ID generation
      videoUrl: formData.video ? URL.createObjectURL(formData.video) : '', // Create object URL for preview
      title: formData.title,
      description: formData.description,
      category: formData.category,
    };
    setVideos([...videos, newVideo]);

    // Close form and clear data after submission
    setEditingVideo(null);
    setFormData({
      title: '',
      description: '',
      category: '',
      video: null,
    });
  };

  // Placeholder for future edit functionality
  const handleEditClick = (video) => {
    // TODO: Implement edit functionality
    console.log('Edit video:', video);
     setEditingVideo(video);
    setFormData({
      title: video.title,
      description: video.description,
      category: video.category,
      video: null, // Video file handling for edit needs to be implemented
    });
  };

  // Placeholder for future delete functionality
  const handleDeleteClick = (videoId) => {
    // TODO: Implement delete functionality
    console.log('Delete video with ID:', videoId);
    setVideos(videos.filter(video => video.id !== videoId));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Video Management</h1>
        {!editingVideo && (
          <button
            onClick={handleAddVideoClick}
            className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add New Video
          </button>
        )}
      </div>

      {/* Add/Edit Video Form */}
      {editingVideo && (
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">{editingVideo.id === null ? 'Add New Video' : 'Edit Video'}</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                ></textarea>
              </div>
            </div>

            <div>
              <label htmlFor="video-file" className="block text-sm font-medium text-gray-700">
                Video File
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <input
                  type="file"
                  name="video-file"
                  id="video-file"
                  accept="video/*"
                  onChange={(e) => handleVideoChange(e.target.files[0])}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0 file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </div>
              {formData.video && (
                <p className="mt-2 text-sm text-gray-500">Selected file: {formData.video.name}</p>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancelClick}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleCreateVideo}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {editingVideo.id === null ? 'Create' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video List Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Video
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                 <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                {/* Add Actions column for Edit/Delete if needed later */}
                <th className="relative px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {videos.map((video) => (
                <tr key={video.id}>
                   <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-20 w-32 ">
                         <video controls src={video.videoUrl} className="h-full w-full rounded-md object-cover"></video>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{video.title}</div>
                  </td>
                   <td className="px-4 sm:px-6 py-4 ">
                    <div className="text-sm text-gray-500 line-clamp-2">{video.description}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {video.category}
                    </span>
                  </td>
                  {/* Add Edit/Delete buttons here */}
                   <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                     <button onClick={() => handleEditClick(video)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                     <button onClick={() => handleDeleteClick(video.id)} className="text-red-600 hover:text-red-900">Delete</button>
                   </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Videos;

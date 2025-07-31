import React, { useState } from 'react';

const Banners = () => {
  const [editingBanner, setEditingBanner] = useState(null);

  // Dummy banner data for demonstration
  const [banners, setBanners] = useState([
    {
      id: 1,
      imageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
      heading: 'Summer Sale',
      description: 'Get up to 50% off on all summer collection!',
      category: 'Summer',
    },
    {
      id: 2,
      imageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
      heading: 'New Arrivals',
      description: 'Check out our latest products.',
      category: 'New Arrivals',
    },
  ]);

  // State for form data (similar to ProductManagement)
  const [formData, setFormData] = useState({
    heading: '',
    description: '',
    category: '',
    image: null,
  });

  const handleAddBannerClick = () => {
    setEditingBanner({ id: null }); // Indicate adding a new banner
    setFormData({ // Clear form data
      heading: '',
      description: '',
      category: '',
      image: null,
    });
  };

  const handleCancelClick = () => {
    setEditingBanner(null); // Hide the form
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (file) => {
    setFormData(prev => ({
      ...prev,
      image: file
    }));
  };

  const handleCreateBanner = () => {
    // Handle banner creation logic here
    console.log('Creating banner with data:', formData);
    // In a real application, you would send formData to your backend API

    // For now, let's simulate adding the new banner to the list (without image handling)
    const newBanner = {
      id: banners.length + 1, // Simple ID generation
      imageUrl: formData.image ? URL.createObjectURL(formData.image) : '', // Create object URL for preview
      heading: formData.heading,
      description: formData.description,
      category: formData.category,
    };
    setBanners([...banners, newBanner]);

    // Close form and clear data after submission
    setEditingBanner(null);
    setFormData({
      heading: '',
      description: '',
      category: '',
      image: null,
    });
  };

  // Placeholder for future edit functionality
  const handleEditClick = (banner) => {
    // TODO: Implement edit functionality
    console.log('Edit banner:', banner);
    setEditingBanner(banner);
    setFormData({
      heading: banner.heading,
      description: banner.description,
      category: banner.category,
      image: null, // Image handling for edit needs to be implemented
    });
  };

  // Placeholder for future delete functionality
  const handleDeleteClick = (bannerId) => {
    // TODO: Implement delete functionality
    console.log('Delete banner with ID:', bannerId);
    setBanners(banners.filter(banner => banner.id !== bannerId));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Banner Management</h1>
        {!editingBanner && (
          <button
            onClick={handleAddBannerClick}
            className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add New Banner
          </button>
        )}
      </div>

      {/* Add/Edit Banner Form */}
      {editingBanner && (
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">{editingBanner.id === null ? 'Add New Banner' : 'Edit Banner'}</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="heading" className="block text-sm font-medium text-gray-700">
                  Heading
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="heading"
                    id="heading"
                    value={formData.heading}
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
              <label htmlFor="banner-image" className="block text-sm font-medium text-gray-700">
                Banner Image
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <input
                  type="file"
                  name="banner-image"
                  id="banner-image"
                  onChange={(e) => handleImageChange(e.target.files[0])}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0 file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </div>
              {formData.image && (
                <p className="mt-2 text-sm text-gray-500">Selected file: {formData.image.name}</p>
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
                onClick={handleCreateBanner}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {editingBanner.id === null ? 'Create' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Banner List Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Heading
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
              {banners.map((banner) => (
                <tr key={banner.id}>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-md object-cover" src={banner.imageUrl} alt="" />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{banner.heading}</div>
                  </td>
                   <td className="px-4 sm:px-6 py-4 ">
                    <div className="text-sm text-gray-500 line-clamp-2">{banner.description}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {banner.category}
                    </span>
                  </td>
                  {/* Add Edit/Delete buttons here */}
                   <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                     <button onClick={() => handleEditClick(banner)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                     <button onClick={() => handleDeleteClick(banner.id)} className="text-red-600 hover:text-red-900">Delete</button>
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

export default Banners;

import React, { useState } from 'react';

const Enquiry = () => {
  // State for form data
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    emailAddress: '',
    companyName: '',
    productName: '',
    productCategory: '',
    requirements: '',
  });

  // State for submission status
  const [submitted, setSubmitted] = useState(false);

  // Categories for dropdown
  const categories = [
    'Electronics',
    'Desktop Items',
    'Office Utility & Stationary',
    'Combo Gift Set',
    'Drinkware',
    'Diaries & Planners',
    'Bags',
    'Rewards & Recognition',
    'Eco Friendly',
    'Pens',
  ];

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for required fields
    if (
      !formData.fullName ||
      !formData.contactNumber ||
      !formData.emailAddress ||
      !formData.companyName
    ) {
      alert('Please fill all required fields.');
      return;
    }

    try {
      // Mock API call to send data to backend
      // Updated to use jsonplaceholder.typicode.com for testing
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        // Reset form after submission
        setFormData({
          fullName: '',
          contactNumber: '',
          emailAddress: '',
          companyName: '',
          productName: '',
          productCategory: '',
          requirements: '',
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Fill the form for Bulk Product Enquiry
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Full Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Contact Number<span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Email Address<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Company Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Product Name */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Product Category */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Product Category</label>
          <select
            name="productCategory"
            value={formData.productCategory}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">--Please Select--</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Requirements in Detail */}
        <div className="sm:col-span-2">
          <label className="block text-sm text-gray-700 mb-1">Requirements in Detail</label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          SUBMIT
        </button>
      </div>

      {/* Success Message */}
      {submitted && (
        <div className="mt-4 p-3 border border-green-500 text-green-700 rounded-md">
          Thank you for your message. It has been sent.
        </div>
      )}
    </div>
  );
};

export default Enquiry;

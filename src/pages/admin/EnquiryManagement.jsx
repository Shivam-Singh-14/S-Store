import React, { useState, useEffect } from 'react';
// import { getEnquiries, deleteEnquiry } from '../../utils/api'; // Uncomment and implement API calls later

const EnquiryManagement = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dummy enquiry data for demonstration
  const dummyEnquiries = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      subject: 'Product Inquiry',
      message: 'I have a question about product ID 123.',
      date: '2023-10-27',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      subject: 'Order Status',
      message: 'Could you please provide an update on my order #ABC123?',
      date: '2023-10-26',
    },
  ];

  useEffect(() => {
    // In a real application, you would fetch data from your API here
    // fetchEnquiries();
    // For now, use dummy data:
    setEnquiries(dummyEnquiries);
    setLoading(false);
  }, []);

  // const fetchEnquiries = async () => {
  //   try {
  //     const data = await getEnquiries();
  //     setEnquiries(data);
  //     setLoading(false);
  //   } catch (err) {
  //     setError('Failed to fetch enquiries');
  //     setLoading(false);
  //   }
  // };

  // const handleDeleteEnquiry = async (enquiryId) => {
  //   if (window.confirm('Are you sure you want to delete this enquiry?')) {
  //     try {
  //       await deleteEnquiry(enquiryId);
  //       setEnquiries(enquiries.filter(enquiry => enquiry.id !== enquiryId));
  //     } catch (err) {
  //       setError('Failed to delete enquiry');
  //     }
  //   }
  // };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading enquiries...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Enquiry Management</h1>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                 <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                 <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                {/* Add Actions column for Delete if needed later */}
                {/*
                <th className="relative px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
                */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {enquiries.map((enquiry) => (
                <tr key={enquiry.id}>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{enquiry.name}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{enquiry.email}</div>
                  </td>
                   <td className="px-4 sm:px-6 py-4 ">
                    <div className="text-sm text-gray-900 line-clamp-2">{enquiry.subject}</div>
                  </td>
                   <td className="px-4 sm:px-6 py-4 ">
                    <div className="text-sm text-gray-500 line-clamp-2">{enquiry.message}</div>
                  </td>
                   <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{enquiry.date}</div>
                  </td>
                  {/* Add Delete button here if needed */}
                   {/*
                   <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                     <button onClick={() => handleDeleteEnquiry(enquiry.id)} className="text-red-600 hover:text-red-900">Delete</button>
                   </td>
                   */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EnquiryManagement; 
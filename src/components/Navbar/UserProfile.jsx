// import React, { useState, useEffect } from 'react';

// // Define the base URL for the API
// const BASE_URL = 'https://api.escuelajs.co/api/v1';

// // Component to fetch and display user profile information
// const UserProfile = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch user data from the API
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`${BASE_URL}/users`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch user data');
//         }

//         const data = await response.json();
//         setUsers(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-2xl font-medium text-gray-600">Loading...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-2xl font-medium text-red-500">Error: {error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-4 font-poppins">
//       <h2 className="text-3xl font-bold text-center mb-8 text-[#212121]">User Profiles</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {users.map((user) => (
//           <div
//             key={user.id}
//             className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-xl"
//           >
//             {/* User Avatar */}
//             <img
//               src={user.avatar}
//               alt={`${user.name}'s avatar`}
//               className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-[#1976D2]"
//             />
//             {/* User Name */}
//             <h3 className="text-xl font-semibold text-[#212121] mb-2">{user.name}</h3>
//             {/* User Email */}
//             <p className="text-sm text-gray-600 mb-1">
//               <span className="font-medium">Email:</span> {user.email}
//             </p>
//             {/* User Role */}
//             <p className="text-sm text-gray-600 mb-1">
//               <span className="font-medium">Role:</span> {user.role}
//             </p>
//             {/* Registration Date */}
//             <p className="text-sm text-gray-600 mb-4">
//               <span className="font-medium">Joined:</span>{' '}
//               {new Date(user.creationAt).toLocaleDateString('en-US', {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric',
//               })}
//             </p>
//             {/* View Profile Button */}
//             <button
//               onClick={() => alert(`Viewing profile for ${user.name}`)} // Placeholder for profile navigation
//               className="bg-[#1976D2] hover:bg-[#1565C0] text-white px-4 py-2 rounded-md text-sm font-medium"
//             >
//               View Full Profile
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserProfile;






import React, { useState, useEffect } from 'react';

// Define the base URL for the API
const BASE_URL = 'https://api.escuelajs.co/api/v1';

// Utility function to get data from localStorage
const getFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error fetching ${key} from localStorage:`, error);
    return null;
  }
};

// Component to fetch and display the signed-in user's profile
const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data based on email from localStorage
  useEffect(() => {
    const fetchUserByEmail = async () => {
      try {
        setLoading(true);

        // Get the signed-in user's email from localStorage
        const userData = getFromStorage('user');
        const userEmail = userData?.email;

        if (!userEmail) {
          throw new Error('No signed-in user found in localStorage');
        }

        // Fetch all users from the API
        const response = await fetch(`${BASE_URL}/users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const users = await response.json();

        // Find the user with the matching email
        const matchedUser = users.find((u) => u.email.toLowerCase() === userEmail.toLowerCase());

        if (!matchedUser) {
          throw new Error('User not found in the API');
        }

        setUser(matchedUser);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserByEmail();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-medium text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-medium text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 font-poppins">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Avatar */}
          <img
            src={user.avatar}
            alt={`${user.name}'s avatar`}
            className="w-32 h-32 rounded-full object-cover border-4 border-[#1976D2]"
          />
          {/* User Info */}
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-bold text-[#212121]">{user.name}</h2>
            <p className="text-lg text-gray-600 mt-1">{user.email}</p>
            <p className="text-md text-gray-500 mt-2">
              <span className="font-medium">Role:</span> {user.role}
            </p>
            <p className="text-md text-gray-500 mt-1">
              <span className="font-medium">Joined:</span>{' '}
              {new Date(user.creationAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-200" />

        {/* Additional Details */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#212121]">Account Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">User ID:</span> {user.id}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Last Updated:</span>{' '}
                {new Date(user.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center md:justify-start space-x-4">
          <button
            onClick={() => alert('Edit Profile functionality coming soon!')}
            className="bg-[#1976D2] hover:bg-[#1565C0] text-white px-6 py-2 rounded-md text-sm font-medium"
          >
            Edit Profile
          </button>
          <button
            onClick={() => alert('Change Password functionality coming soon!')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md text-sm font-medium"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
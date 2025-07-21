import { useState, useEffect } from 'react';
import axios from 'axios';

const UserUpdateModal = ({ open, onClose, onSuccess, userId }: any) => {
  console.log("UserUpdateModal opened with userId:", userId);


  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoadingUser(true);
      const accessToken = localStorage.getItem('accessToken');
      try {
        console.log("Fetching user data for userId:", userId);
        const response = await axios.get(`http://localhost:8080/api/admin/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        console.log("Fetched user data:", response.data);


        const user = response.data.data || response.data.result || response.data;


        setEmail(user.email || '');
        setRole(user.role || '');
      }
      catch (error) {
        console.error("Error fetching user data:", error);

        setEmail('');
        setRole('');
      } finally {
        setLoadingUser(false);
      }
    };

    if (userId) {
      fetchUserData();
    } else {


      setEmail('');
      setRole('');
    }
  }, [userId]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {

        email,
        role,
      };

      console.log('Updating user with payload:', payload);
   const res = await axios.put(`http://localhost:8080/api/admin/users/${userId}`, payload, {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

      console.log('User updated successfully', res.data);
      onSuccess(res.data);
      handleClose();
    } catch (err) {
      console.error('User update failed', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {

    setEmail('');
    setRole('');
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-[#052535] mb-6">
          Update User Info
        </h2>

        {loadingUser ? (
          <p className="text-center text-gray-600">Loading user data...</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">



            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-semibold text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                disabled={isSubmitting}
                className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 placeholder-gray-500 border-none outline-none focus:ring-2 focus:ring-[#052535]"
              />
            </div>


            <div className="flex flex-col gap-2">
              <label htmlFor="role" className="font-semibold text-gray-700">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={isSubmitting}
                className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 border-none outline-none focus:ring-2 focus:ring-[#052535]"
              >
                <option value="">Select role</option>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>


            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="px-6 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 rounded-full bg-[#052535] text-white font-semibold hover:bg-[#03415a] transition disabled:opacity-60"
              >
                {isSubmitting ? 'Updating...' : 'Update'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserUpdateModal;


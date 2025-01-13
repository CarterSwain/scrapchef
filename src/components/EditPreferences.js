import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditPreferences = ({ user }) => {
  const [preferences, setPreferences] = useState({ diet: '', allergies: [] });
  const [updatedPreferences, setUpdatedPreferences] = useState({ diet: '', allergies: [] });
  const [isEditing, setIsEditing] = useState(false); // Tracks editing state
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/users/${user.uid}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const userData = response.data;
        if (userData) {
          setPreferences({
            diet: userData.diet || 'OMNIVORE',
            allergies: userData.allergies || [],
          });
          setUpdatedPreferences({
            diet: userData.diet || 'OMNIVORE',
            allergies: userData.allergies || [],
          });
        }
      } catch (err) {
        console.error('Error fetching preferences:', err.message);
        setError('Failed to load preferences. Please try again later.');
      }
    };

    fetchPreferences();
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
    setSuccess(false); // Clear success message on new edit
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedPreferences(preferences); // Reset changes
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5001/api/users/${user.uid}/preferences`, updatedPreferences, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setPreferences(updatedPreferences); // Update local state
      setIsEditing(false);
      setSuccess(true); // Show success message
    } catch (err) {
      console.error('Error saving preferences:', err.message);
      setError('Failed to save preferences. Please try again.');
    }
  };

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPreferences((prev) => ({ ...prev, [name]: value }));
  };

  const handleAllergiesChange = (e) => {
    const { value } = e.target;
    setUpdatedPreferences((prev) => ({
      ...prev,
      allergies: value.split(',').map((item) => item.trim()), // Convert comma-separated string to array
    }));
  };

  return (
    <div className="mt-6 bg-green-300 p-4 rounded-lg shadow-md w-full max-w-md">
      <h3 className="text-xl font-semibold mb-4">Edit Preferences</h3>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Preferences updated successfully!</p>}
      {isEditing ? (
        <div>
          <label className="block mb-2 font-semibold">
            Diet Type:
            <select
              name="diet"
              value={updatedPreferences.diet}
              onChange={handlePreferenceChange}
              className="block w-full mt-1 p-2 border rounded"
            >
              <option value="VEGAN">Vegan</option>
              <option value="VEGETARIAN">Vegetarian</option>
              <option value="OMNIVORE">Omnivore</option>
              <option value="PESCATARIAN">Pescatarian</option>
            </select>
          </label>
          <label className="block mb-2 font-semibold">
            Ingredients to Avoid (comma-separated):
            <input
              type="text"
              value={updatedPreferences.allergies.join(', ')}
              onChange={handleAllergiesChange}
              className="block w-full mt-1 p-2 border rounded"
            />
          </label>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-400 text-white rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>
            <strong>Diet Type:</strong> {preferences.diet}
          </p>
          <p>
            <strong>Ingredients to Avoid:</strong>{' '}
            {preferences.allergies.length > 0 ? preferences.allergies.join(', ') : 'None'}
          </p>
          <button
            onClick={handleEdit}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Edit Preferences
          </button>
        </div>
      )}
    </div>
  );
};

export default EditPreferences;

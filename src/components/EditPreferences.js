import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditPreferences = ({ uid }) => {
  const [preferences, setPreferences] = useState({ diet: 'OMNIVORE', allergies: [] });
  const [updatedPreferences, setUpdatedPreferences] = useState({ diet: 'OMNIVORE', allergies: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch preferences when component mounts or `uid` changes
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        if (!uid) {
          console.error('UID is undefined');
          return;
        }

        console.log('Fetching preferences for UID:', uid);

        setLoading(true); // Set loading state
        const response = await axios.get(`http://localhost:5001/api/users/${uid}/preferences`, {
          headers: { 'Content-Type': 'application/json' },
        });

        const preferencesData = response.data;
        console.log('Fetched preferences:', preferencesData);

        if (preferencesData) {
          setPreferences({
            diet: preferencesData.diet || 'OMNIVORE',
            allergies: preferencesData.allergies || [],
          });
          setUpdatedPreferences({
            diet: preferencesData.diet || 'OMNIVORE',
            allergies: preferencesData.allergies || [],
          });
        }
      } catch (err) {
        console.error('Error fetching preferences:', err.message);
        setError('Failed to load preferences. Please try again later.');
      } finally {
        setLoading(false); // Clear loading state
      }
    };

    if (uid) fetchPreferences();
  }, [uid]);

  // Handle edit mode
  const handleEdit = () => {
    setIsEditing(true);
    setSuccess(false); // Clear success message on new edit
  };

  // Handle cancel
  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedPreferences(preferences); // Reset changes
  };

  // Handle save preferences
  const handleSave = async () => {
    try {
      console.log('Saving updated preferences for UID:', uid);

      setLoading(true); // Set loading state
      await axios.put(
        `http://localhost:5001/api/users/${uid}/preferences`,
        updatedPreferences,
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('Preferences saved:', updatedPreferences);

      setPreferences(updatedPreferences); // Update local state
      setIsEditing(false);
      setSuccess(true); // Show success message
      setError(null); // Clear any previous error
    } catch (err) {
      console.error('Error saving preferences:', err.message);
      setError('Failed to save preferences. Please try again.');
    } finally {
      setLoading(false); // Clear loading state
    }
  };

  // Handle changes to the diet field
  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPreferences((prev) => ({ ...prev, [name]: value }));
  };

  // Handle changes to the allergies field
  const handleAllergiesChange = (e) => {
    const { value } = e.target;
    setUpdatedPreferences((prev) => ({
      ...prev,
      allergies: value.split(',').map((item) => item.trim()),
    }));
  };

  return (
    <div className="mt-6 bg-green-300 p-4 rounded-lg shadow-md w-full max-w-md">
      <h3 className="text-xl font-semibold mb-4">Edit Preferences</h3>
      {loading && <p className="text-gray-500">Loading...</p>}
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
              disabled={loading}
              className="px-4 py-2 bg-gray-400 text-white rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className={`px-4 py-2 rounded-md text-white font-semibold shadow-md ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 transition'
              }`}
            >
              {loading ? 'Saving...' : 'Save'}
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

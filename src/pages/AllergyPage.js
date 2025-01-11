import React, { useState } from "react";
import { useRouter } from "next/router";

function AllergyPage() {
  const [allergies, setAllergies] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  // Handles adding a new allergy
  const handleAddAllergy = () => {
    if (inputValue.trim() && !allergies.includes(inputValue.trim())) {
      setAllergies([...allergies, inputValue.trim()]);
      setInputValue(""); // Clear the input field
    }
  };

  // Handles removing an allergy
  const handleRemoveAllergy = (item) => {
    setAllergies(allergies.filter((allergy) => allergy !== item));
  };

  // Handles saving data to the database
  const handleSave = async () => {
    const { diet } = router.query; // Get the diet from the query params
    try {
      const response = await fetch("/api/saveUserPreferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ diet, allergies }),
      });

      if (response.ok) {
        router.push("/dashboard"); // Redirect to the dashboard or home
      } else {
        console.error("Failed to save user preferences.");
      }
    } catch (error) {
      console.error("Error saving user preferences:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-yellow-300 text-black py-8 px-4">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-8">Add allergies or ingredients you avoid.</h1>

      {/* Input Field */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="ex. Gluten, Egg, Pork, Salt..."
          className="w-64 p-2 border rounded-md text-black"
        />
        <button
          onClick={handleAddAllergy}
          className="p-2 bg-black text-white rounded-full hover:bg-gray-800"
        >
          +
        </button>
      </div>

      {/* Allergy Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {allergies.map((item, index) => (
          <div
            key={index}
            className="flex items-center bg-white text-black px-4 py-1 rounded-full shadow"
          >
            {item}
            <button
              onClick={() => handleRemoveAllergy(item)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="px-6 py-2 bg-green-500 text-white font-medium rounded-lg shadow hover:bg-green-700"
      >
        Save Preferences
      </button>

      {/* Skip Button */}
      <button
        onClick={() => router.push("/dashboard")}
        className="mt-4 text-blue-600 underline hover:text-blue-800"
      >
        Skip
      </button>
    </div>
  );
}

export default AllergyPage;

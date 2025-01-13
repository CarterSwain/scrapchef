const RecipeDisplay = ({ recipe, loading, error }) => {
    return (
      <div className="mt-8 p-6 bg-white text-gray-900 rounded-xl shadow-2xl max-w-3xl border border-gray-200">
        {loading && (
          <div className="flex flex-col items-center justify-center">
            <svg
              className="animate-spin h-8 w-8 text-blue-500 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="text-lg font-medium text-blue-600">Generating your recipe...</p>
          </div>
        )}
  
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md border border-red-200">
            <p className="text-lg font-medium">{error}</p>
          </div>
        )}
  
        {recipe && (
          <>
            <h3 className="text-3xl font-extrabold text-green-700 mb-6 text-center capitalize">
              {recipe.recipeName}
            </h3>
            <p className="text-lg leading-relaxed text-gray-800 whitespace-pre-wrap">
              {recipe.recipeDetails}
            </p>
            <div className="mt-6 text-center">
              <button
                className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
                onClick={() => window.print()}
              >
                Print Recipe
              </button>
            </div>
          </>
        )}
      </div>
    );
  };
  
  export default RecipeDisplay;
  

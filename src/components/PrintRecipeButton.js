import React from "react";

const PrintRecipeButton = ({ recipe }) => {
  const printRecipe = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>${recipe.name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
            h1 { font-size: 24px; margin-bottom: 10px; }
            p { font-size: 16px; }
          </style>
        </head>
        <body>
          <h1>${recipe.name}</h1>
          <p>${recipe.details}</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="mt-4">
    <button
      onClick={printRecipe}
      className="px-6 py-2 bg-orange text-white font-semibold rounded-md hover:bg-garden transition"
    >
      Print Recipe
    </button>
    </div>
  );
};

export default PrintRecipeButton;

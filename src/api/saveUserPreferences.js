import prisma from "../../lib/prisma"; // Adjust path as necessary

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { diet, allergies } = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: { email: req.user.email }, // Assuming you're using a session to track the logged-in user
        data: {
          diet,
          allergies,
        },
      });

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user preferences:", error);
      res.status(500).json({ error: "Failed to update user preferences" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

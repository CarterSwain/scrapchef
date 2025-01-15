import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const deleteUser = async () => {
    try {
      // Replace `1` with the `id` of the user you want to delete
      const userIdToDelete = 9;
  
      // Delete related preferences first
      await prisma.preferences.deleteMany({
        where: { userId: userIdToDelete },
      });
  
      // Now delete the user
      await prisma.user.delete({
        where: { id: userIdToDelete },
      });
  
      console.log(`User with ID ${userIdToDelete} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting user:', error.message);
    } finally {
      await prisma.$disconnect();
    }
  };
  
  deleteUser();

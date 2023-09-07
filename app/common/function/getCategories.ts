import prisma from "@/lib/prismadb";
import { Category } from "@prisma/client";

export default async function getCategories({ collectionId }: any) {
  try {
    console.log(collectionId);
    const categoriesNull = await prisma.category.findMany({
      where: {
        OR: [{ collection_id: null }, { collection_id: collectionId }],
      },
    });

    const categories: Category[] = [...categoriesNull];

    return categories as Category[];
  } catch (error: any) {
    console.log(error);
    return null;
  }
}

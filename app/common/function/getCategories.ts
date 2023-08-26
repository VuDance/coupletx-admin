import prisma from "@/lib/prismadb";
import { Category } from "@prisma/client";

export default async function getCategories({ collectionId }: any) {
  try {
    console.log(collectionId);
    const categoriesNull = await prisma.category.findMany({
      where: {
        collection_id: null,
      },
    });
    const categoriesNotNull = await prisma.category.findMany({
      where: {
        collection_id: collectionId,
      },
    });

    const categories: Category[] = [...categoriesNull, ...categoriesNotNull];

    return categories as Category[];
  } catch (error: any) {
    console.log(error);
    return null;
  }
}

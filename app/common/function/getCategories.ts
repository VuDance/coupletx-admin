import prisma from "@/lib/prismadb";
import { Category } from "@prisma/client";

export default async function getCategories() {
  try {
    const categories = await prisma.category.findMany();

    return categories as Category[];
  } catch (error: any) {
    console.log(error);
    return null;
  }
}

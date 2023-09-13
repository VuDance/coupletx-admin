import prisma from "@/lib/prismadb";
import axios from "axios";

export default async function createProduct(data: any) {
  try {
    const res = await axios.post("/api/products/create", data, {
      headers: {
        authorization: data.token,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error;
  }
}

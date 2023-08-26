import prisma from "@/lib/prismadb";
import axios from "axios";

export default async function updateProduct(data: any) {
  try {
    // console.log(data);
    const res = await axios.put("/api/products/update", data, {
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

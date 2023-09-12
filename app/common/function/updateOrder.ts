import { authOptions } from "@/pages/api/auth/[...nextauth]";
import axios from "axios";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

export async function updateOrder(id: string, status: string) {
  const session: any = getServerSession(authOptions);
  const data = { id: id, status: status };
  await axios.put("/api/updateOrder", data, {
    headers: {
      authorization: session?.accessToken,
    },
  });
}

import { get_post_api } from "@/services/get_post_api";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método no disponible" });
  }

  try {
    const { id, user_id } = req.query;
    if (
      Array.isArray(id) ||
      id === undefined ||
      Array.isArray(user_id) ||
      user_id === undefined
    ) {
      return res
        .status(400)
        .json({ message: "No puede ser un Array o Undefined" });
    }

    const post = await get_post_api(user_id, id);
    console.log(post);
    return res.status(200).json(post);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al obtener los posts", error });
  }
}

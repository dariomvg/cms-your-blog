import { get_posts_api } from "@/services/get_posts_api";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método no disponible" });
  }

  try {
    const { id } = req.query;
    if (Array.isArray(id) || id === undefined) {
      return res
        .status(400)
        .json({ message: "No puede ser un Array o Undefined" });
    }

    const posts = await get_posts_api(id);
    return res.status(200).json(posts);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al obtener los posts", error });
  }
}

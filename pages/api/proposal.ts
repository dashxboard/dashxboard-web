import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== "POST") {
    return response.status(405).json({ message: "Method Not Allowed" });
  }

  const secret = request.headers.authorization?.split(" ")[1];
  if (secret !== process.env.REVALIDATE_SECRET) {
    return response.status(401).json({ message: "Invalid Token" });
  }

  const { proposal } = request.body;
  if (!proposal) {
    return response.status(400).json({ message: "Proposal ID Not Found" });
  }

  try {
    await Promise.all([
      response.revalidate("/"),
      response.revalidate(`/proposal/${proposal}`),
    ]);
    response.json({ revalidated: true });
  } catch (err) {
    response.status(500).json({ error: "Error Revalidating" });
  }
}

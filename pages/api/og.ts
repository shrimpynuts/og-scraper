import type { NextApiRequest, NextApiResponse } from "next";
import ogs from "open-graph-scraper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;
  const { url } = query;

  if (
    !url ||
    typeof url !== "string" ||
    !url.length ||
    !url.toLowerCase().startsWith("http")
  )
    return res.status(400).json({ error: "Must provide valid URL" });

  const options = { url };
  const data = await ogs(options);
  const { error, result, response } = data;
  if (error) return res.status(500).json({ error: "Error fetching data" });
  return res.status(200).json(result);
}

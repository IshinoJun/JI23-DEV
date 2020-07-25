import { NextApiResponse, NextApiRequest } from "next";
import DevClient from "./DevClient";
import { isContact } from "../../utils/TypeGuardUtils";

const preview = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const devClient = new DevClient();

  const { contact } = req.query;

  if (typeof contact !== "string" || !isContact(JSON.parse(contact))) {
    return res.status(401).json({ message: `Invalid query` });
  }

  const post = await devClient.createContact(JSON.parse(contact));

  if (!post) return res.status(401).json({ message: "Invalid contact" });

  res.writeHead(307, { Location: `/contact/success` });

  res.end("Contact enabled");
};

export default preview;

import { NextApiResponse, NextApiRequest } from "next";
import DevCMS from "./DevCMS";
import { isContact } from "../../utils/TypeGuardUtils";

const contact = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const devCMS = new DevCMS();

  // クエリのチェック
  if (!isContact(req.body)) {
    return res.status(400).json({ statusCode: 400, message: "Bad Request" });
  }

  const resCMS = await devCMS.createContact(req.body);

  // CMS側で正しく作成されたかチェック
  if (resCMS !== "Created") {
    return res
      .status(500)
      .json({ statusCode: 500, message: "500 Internal Server Error" });
  }

  res.status(200).json({ statusCode: 200, message: "OK" });

  res.end("Contact enabled");
};

export default contact;

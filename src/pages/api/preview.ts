import { NextApiResponse, NextApiRequest } from "next";
import DevClient from "../../api/DevClient";

const preview = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY ?? "";
  const devClient = new DevClient();

  const { id, draftKey, secret } = req.query;

  // クエリの確認
  if (
    secret !== SECRET_KEY ||
    typeof id !== "string" ||
    typeof draftKey !== "string"
  ) {
    return res.status(401).json({
      message: `Invalid query, ${SECRET_KEY}`,
    });
  }

  const post = await devClient.getBlogPreview(id, draftKey);

  // エラー処理
  if (!post) return res.status(401).json({ message: "Invalid draft key" });

  // プレビューデータを格納
  res.setPreviewData({
    draftKey: req.query.draftKey,
    id: req.query.id,
  });

  // 詳細ページへリダイレクト
  res.writeHead(307, { Location: `/blogs/${id}` });

  res.end("Preview mode enabled");
};

export default preview;

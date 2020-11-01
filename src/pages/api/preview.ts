import { NextApiResponse, NextApiRequest } from 'next';
import DevCMS from './DevCMS';

const preview = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const SECRET_KEY = process.env.SECRET_KEY ?? '';
  const devCMS = new DevCMS();

  const { id, draftKey, secret } = req.query;

  if (
    secret !== SECRET_KEY ||
    typeof id !== 'string' ||
    typeof draftKey !== 'string'
  ) {
    return res.status(401).json({
      message: `Invalid query, ${SECRET_KEY}`,
    });
  }

  const post = await devCMS.getBlogPreview(id, draftKey);

  if (!post) return res.status(401).json({ message: 'Invalid draft key' });

  res.setPreviewData({
    draftKey: req.query.draftKey,
    id: req.query.id,
  });

  res.writeHead(307, { Location: `/blogs/${id}` });

  return res.end('Preview mode enabled');
};

export default preview;

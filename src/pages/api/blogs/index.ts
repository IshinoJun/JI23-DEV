import { NextApiResponse, NextApiRequest } from 'next';
import { isBlogs } from '../../../utils/TypeGuardUtils';
import DevCMS from '../DevCMS';

const contact = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const devCMS = new DevCMS();

  // クエリのチェック
  if (!isBlogs(req.body)) {
    return res.status(404).end();
  }

  const blogs = await devCMS.getBlogs(req.body);

  res.status(200).json(blogs);

  return res.end('Contact enabled');
};

export default contact;

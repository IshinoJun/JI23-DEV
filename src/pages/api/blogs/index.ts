import { NextApiResponse, NextApiRequest } from 'next';
import { isBlogsQuery } from '../../../utils/TypeGuardUtils';
import DevCMS from '../DevCMS';

const getSearchBlogs = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const devCMS = new DevCMS();

  // クエリのチェック
  if (!isBlogsQuery(req.body)) {
    return res.status(404).end();
  }

  const blogs = await devCMS.getBlogs(req.body);

  return res.status(200).json(blogs);
};

export default getSearchBlogs;

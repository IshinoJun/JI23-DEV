import { NextApiRequest, NextApiResponse } from 'next';
import { DevCMS } from '../../../clients';
import { isBlogsQuery } from '../../../utils/TypeGuardUtils';

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

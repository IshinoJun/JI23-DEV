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
    res.status(404).end();
    return;
  }

  const blogs = await devCMS.getBlogs(req.body);
  res.status(200).json(blogs);
  return;
};

export default getSearchBlogs;

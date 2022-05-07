import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { DevCMS } from '../../clients';
import { isContact } from '../../utils/TypeGuardUtils';

const contact: NextApiHandler<Response> = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const devCMS = new DevCMS();

  // クエリのチェック
  if (!isContact(req.body)) {
    return res.status(404).end();
  }

  await devCMS.createContact(req.body);

  res.status(200).json({ statusCode: 200, message: 'OK' });

  return res.end('Contact enabled');
};

export default contact;

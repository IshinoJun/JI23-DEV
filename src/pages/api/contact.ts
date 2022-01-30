import { NextApiRequest, NextApiResponse } from 'next';
import { DevCMS } from '../../clients';
import { isContact } from '../../utils/TypeGuardUtils';

const contact = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const devCMS = new DevCMS();

  // クエリのチェック
  if (!isContact(req.body)) {
    res.status(404).end();
    return;
  }

  await devCMS.createContact(req.body);

  res.status(200).json({ statusCode: 200, message: 'OK' });

  res.end('Contact enabled');
  return;
};

export default contact;

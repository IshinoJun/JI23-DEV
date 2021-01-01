import { google } from 'googleapis';
import { isEmpty } from 'lodash';

const getTopArticle = async () => {
  console.log(process.env.GOOGLE_APPLICATION_PRIVATE_KEY);
  const client = await google.auth.getClient({
    scopes: 'https://www.googleapis.com/auth/analytics.readonly',
    credentials: {
      client_email: process.env.GOOGLE_APPLICATION_CLIENT_EMAIL,
      private_key: (process.env.GOOGLE_APPLICATION_PRIVATE_KEY ?? '').replace(
        /\\n/gm,
        '\n',
      ),
    },
  });

  const analyticsreporting = google.analyticsreporting({
    version: 'v4',
    auth: client,
  });

  const res = await analyticsreporting.reports.batchGet({
    requestBody: {
      reportRequests: [
        {
          viewId: '224793094',
          dateRanges: [
            {
              startDate: '30daysAgo',
              endDate: '1daysAgo',
            },
          ],
          dimensions: [
            {
              name: 'ga:pagePath',
            },
          ],
          metrics: [
            {
              expression: 'ga:pageviews',
            },
          ],
          orderBys: [
            {
              fieldName: 'ga:pageviews',
              sortOrder: 'DESCENDING',
            },
          ],
          pageSize: 3,
          dimensionFilterClauses: [
            {
              filters: [
                {
                  dimensionName: 'ga:pagePath',
                  operator: 'REGEXP',
                  expressions: ['^/blogs/[0-9a-zA-Z\\-]+$'],
                },
              ],
            },
          ],
        },
      ],
    },
  });

  return res.data;
};

const getTopArticlePaths = async (): Promise<string[]> => {
  const topArticle = await getTopArticle();

  const ids: string[] = [];
  const rows = topArticle.reports
    ? topArticle.reports[0]?.data?.rows ?? []
    : [];

  rows.forEach((row) => {
    if (row.dimensions && !isEmpty(row.dimensions)) {
      ids.push(row.dimensions[0].replace('/blogs/', ''));
    }
  });

  return ids;
};

export { getTopArticle, getTopArticlePaths };

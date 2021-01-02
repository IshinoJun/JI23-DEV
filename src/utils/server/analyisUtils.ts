// eslint-disable-next-line camelcase
import { analyticsreporting_v4, google } from 'googleapis';
import { isEmpty } from 'lodash';

// eslint-disable-next-line camelcase
const getTopArticle = async (): Promise<analyticsreporting_v4.Schema$GetReportsResponse> => {
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
          viewId: process.env.GOOGLE_ANALYTICS_VIEW_ID,
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

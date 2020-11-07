interface HeadParams {
  id?: string;
  title?: string;
  type: 'website' | 'article';
  description?: string;
  url: string;
}

export default HeadParams;

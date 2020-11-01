interface HeadProps {
  id?: string;
  title: string;
  type: 'website' | 'article';
  description?: string;
  url: string;
}

export default HeadProps;

import BlogsQuery from '../models/BlogsQuery';
import Contact from '../models/Contact';

interface PreviewData {
  draftKey: string;
  id: string;
}

const isPreviewData = (item: unknown): item is PreviewData => {
  const target = item as PreviewData;

  return (
    'id' in target &&
    typeof target.id === 'string' &&
    !!target.id &&
    'draftKey' in target &&
    typeof target.draftKey === 'string' &&
    !!target.draftKey
  );
};

const isContact = (item: unknown): item is Contact => {
  const target = item as Contact;

  return (
    'name' in target &&
    typeof target.name === 'string' &&
    !!target.name &&
    'email' in target &&
    typeof target.email === 'string' &&
    !!target.email &&
    'body' in target &&
    typeof target.body === 'string' &&
    !!target.body
  );
};

const isBlogs = (item: unknown): item is BlogsQuery => {
  const target = item as BlogsQuery;

  return (
    ('tagId' in target &&
      (typeof target.tagId === 'string' ||
        typeof target.tagId === 'undefined')) ||
    ('keyword' in target &&
      (typeof target.keyword === 'string' ||
        typeof target.keyword === 'undefined'))
  );
};

export { isPreviewData, isContact, isBlogs };

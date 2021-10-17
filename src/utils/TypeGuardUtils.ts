import { Blog, BlogsQuery, Contact, Tag } from '../models';

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

const isBlogsQuery = (item: unknown): item is BlogsQuery => {
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

const isTag = (item: unknown): item is Tag => {
  const target = item as Tag;

  return (
    'id' in target &&
    typeof target.id === 'string' &&
    'name' in target &&
    typeof target.name === 'string'
  );
};

const isTags = (item: unknown): item is Tag[] => {
  const target = item as Tag[];

  return target.some((t) => isTag(t));
};

const isBlog = (item: unknown): item is Blog => {
  const target = item as Blog;

  return (
    ('title' in target &&
      typeof target.title === 'string' &&
      'content' in target &&
      typeof target.content === 'string') ||
    ('title' in target &&
      typeof target.title === 'string' &&
      'content' in target &&
      typeof target.content === 'string' &&
      'tags' in target &&
      isTags(target.tags))
  );
};

export { isPreviewData, isContact, isBlogsQuery, isBlog, isTags, isTag };

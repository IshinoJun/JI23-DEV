import Link from 'next/link';
import React from 'react';
import ArrayList from '../../models/Array';
import Tag from '../../models/Tag';
import style from './BlogTagList.module.scss';

interface Props {
  tags: ArrayList<Tag>;
}

const BlogTagList: React.FC<Props> = (props) => {
  const { tags } = props;

  return (
    <div className={style.tagWrapper}>
      <h2>Tags</h2>
      <ul>
        {tags.contents.map((tag) => (
          <li key={tag.id}>
            <Link href={`/blogs/tags/${tag.id}/page/1`}>{tag.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogTagList;

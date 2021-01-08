import React from 'react';
import ArrayList from '../../models/Array';
import Tag from '../../models/Tag';
import style from './BlogTagList.module.scss';
import Tags from './Tags';

interface Props {
  tags: ArrayList<Tag>;
}

const BlogTagList: React.FC<Props> = (props) => {
  const { tags } = props;

  return (
    <div className={style.tagWrapper}>
      <h2>Tags</h2>
      <Tags tags={tags.contents} tagsPosition="center" />
    </div>
  );
};

export default BlogTagList;

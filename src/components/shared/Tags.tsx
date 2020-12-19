import Link from 'next/link';
import React from 'react';
import Tag from '../../models/Tag';
import style from './Tags.module.scss';

interface Props {
  tags?: Tag[];
  tagsPosition: 'center' | 'left' | 'right';
  styleProps?: React.CSSProperties;
}
const Tags: React.FC<Props> = (props: Props) => {
  const { tags, tagsPosition, styleProps } = props;

  return tags ? (
    <div
      style={{ textAlign: tagsPosition, ...styleProps }}
      className={style.tags}
    >
      {tags.map((tag) => (
        <Link href={`/blogs/tags/${tag.id}/page/1`} key={tag.id}>
          <a className={style.tag}>
            <span>{tag.name}</span>
          </a>
        </Link>
      ))}
    </div>
  ) : null;
};

export default Tags;

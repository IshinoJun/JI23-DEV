import Link from 'next/link';
import React from 'react';
import Tag from '../../models/Tag';
import style from './Tags.module.scss';

interface Props {
  tags?: Tag[];
  tagsPosition: 'center' | 'left' | 'right';
  styleProps?: React.CSSProperties;
  doLink?: boolean;
}
const Tags: React.FC<Props> = (props: Props) => {
  const { tags, tagsPosition, styleProps, doLink } = props;

  return tags ? (
    <div style={{ textAlign: tagsPosition, ...styleProps }}>
      {tags.map((tag) => (
        <React.Fragment key={tag.id}>
          {doLink ? (
            <Link href={`/blogs/tags/${tag.id}/page/1`}>
              <a className={style.tag}>
                <span>{tag.name}</span>
              </a>
            </Link>
          ) : (
            <span className={style.tag}>{tag.name}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  ) : null;
};

export default Tags;

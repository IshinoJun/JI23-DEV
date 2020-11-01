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

  return (
    <div
      style={{ textAlign: tagsPosition, ...styleProps }}
      className={style.tags}
    >
      {tags?.map((tag) => (
        <p key={tag.name} className={style.tag}>
          <span>{tag.name}</span>
        </p>
      ))}
    </div>
  );
};

export default Tags;

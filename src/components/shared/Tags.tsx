import React from "react";
import Tag from "../../models/Tag";
import style from "./Tags.module.scss";

interface Props {
  tags?: Tag[];
  tagsPosition: "center" | "left" | "right";
}
const Tags: React.FC<Props> = (props: Props) => {
  const { tags, tagsPosition } = props;

  return (
    <div style={{ textAlign: tagsPosition }} className={style.tags}>
      {tags?.map((tag, index) => (
        <p key={index} className={style.tag}>
          <span>#</span>
          <span>{tag.name}</span>
        </p>
      ))}
    </div>
  );
};

export default Tags;

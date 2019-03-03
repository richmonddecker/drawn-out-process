import React from "react";
import { Link } from "react-router-dom";

const IndexThumb = ({ member, category }) => {
  console.log("MEMBER IS: ", member)
  return (
    <div className="indexThumb">
      <div>
        <Link to={`${category}/${member.tag}`}>
        <img src={member.thumbnail} width={200} height={200} alt={member.title} />
        </Link>

        <h4>{member.title}</h4>
        <p>{member.phrase}</p>
      </div>
    </div>
  
);};

export default IndexThumb;
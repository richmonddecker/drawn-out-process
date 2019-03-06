import React from "react";
import { Link } from "react-router-dom";

const IndexThumb = ({ member, category }) => (
  <div className="indexThumb">
    <Link to={`${category}/${member.tag}`}>
      <div>
      
        <img src={member.thumbnail} width={200} height={200} alt={member.title} />
        

        <h4>{member.title}</h4>
        <p>{member.phrase}</p>
      </div>
    </Link>
  </div>
);

export default IndexThumb;
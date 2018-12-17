import React from 'react';
import videos from '../scripts/videos';
import '../styles/App.css';

const Repetitive = (props) => {
  const name = props.match.params.name;
  console.log("NAME IS: ", name);
  return (
    <div class="fill-screen">
      <video class="fit-square" autoPlay loop muted>
          <source src={videos[name]} type='video/mp4'/>
      </video>
    </div>
  );
}

export default Repetitive;

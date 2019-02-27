import React from "react";
import { connect } from "react-redux";
import { setCurrentElement, setCurrentInteractivity } from "../actions/interface";
import "../styles/App.css";

class HomePage extends React.Component {
  render() {
    return (
      <div className="page home">
        <h1 className="pageTitle">Drawn Out Process</h1>
        <br />
        <p>
          Welcome,
          <span style={{color: "orange"}}> friend</span>!
          This website is a technical artistic project by
          <span style={{color: "orange"}}> Justin Richmond-Decker</span>. 
          The goal is to provide you with an immersive and captivating visual experience.
        </p>
        <p>
          The site features both interactive and passive content, and gives you a high degree of control to curate and customize your own session.
          Here
          <span style={{color: "orange"}}> you are encouraged to play around with the configurations</span>,
          to see what interesting effects you can achieve.
        </p>
        <p>
          If you are using a phone or tablet,
          <span style={{color: "orange"}}> please view this site with the screen turned sideways</span>.
          The sidebars will cause problems if the display is not wide enough.
        </p>
        <p>
          Please also note that
          <span style={{color: "orange"}}> this site may produce flashing effects and rapidly changing visuals</span>,
          which may cause certain individuals to experience astonishment and mesmerization.
          Go ahead and use the side bars to get started.
        </p>
      </div>
    );
  }

  componentDidMount() {
    this.props.setTheElement(this.props.category)
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  setTheElement: (category) => {
    dispatch(setCurrentElement("informative", "home", "Home"))
    dispatch(setCurrentInteractivity(false));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(HomePage);

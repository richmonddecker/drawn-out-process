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
          Welcome, friend! This website is a technical artistic project by Justin Richmond-Decker. 
          The goal is to provide you with an immersive and captivating visual experience.
        </p>
        <p>
          The site features both interactive and passive content, and gives you a high degree of control to curate and customize your own session.
          Here you are encouraged to play around with the configurations, to see what interesting effects you can achieve.
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

import React from "react";
import { Link, NavLink } from "react-router-dom";
import { NavItem, Nav, NavCard, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

class Navigation extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: true
    };
  }

  handleSelect(activeKey) {
    console.log("Activedd key is: ", activeKey);
    this.setState({ activeKey });
  }

  render() {
    //console.log("ACTIVE KEY IS: ", this.state.activeKey);
    return (
      <div className="sidenav">
        <Nav pills vertical>
          <NavItem>
            <NavLink to="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/creative">Creative</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/repetitive">Repetitive</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/repetitive/kochpinski">Kochpinski</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/repetitive/snowflake">Snowflake</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/repetitive/plasma-ball">Plasma Ball</NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}


export default Navigation;

import React from "react";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem, Panel, PanelGroup } from "react-bootstrap";

class Navigation extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {activeKey: "1"}; 
  }

  handleSelect(activeKey) {
    console.log("Activedd key is: ", activeKey);
    this.setState({ activeKey });
  }

  render() {
    return (
      <PanelGroup
        accordion
        id="accordion-controlled-example"
        activeKey={this.state.activeKey}
        onSelect={this.handleSelect}
      >
        <Panel eventKey="1">
          <Panel.Heading>
            <Panel.Title toggle>
              <Link to="/creative">Creative</Link>
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <ListGroup>
              <ListGroupItem>
                <Link to="/creative/chords">Chords</Link>
              </ListGroupItem>
            </ListGroup>
          </Panel.Collapse>
        </Panel>
        <Panel eventKey="2">
          <Panel.Heading>
            <Panel.Title toggle>
              <Link to="/repetitive">Repetitive</Link>
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <ListGroup>
              <ListGroupItem>
                <Link to="/reptitive/kochpinski">Kochpinski</Link>
              </ListGroupItem>
              <ListGroupItem>
                <Link to="/reptitive/snowflake">Snowflake</Link>
              </ListGroupItem>
              <ListGroupItem>
                <Link to="/reptitive/plasma-ball">Plasma Ball</Link>
              </ListGroupItem>
            </ListGroup>
          </Panel.Collapse>
        </Panel>
        <Panel eventKey="3">
          <Panel.Heading>
            <Panel.Title toggle>
              <Link to="/generative">Generative</Link>
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <ListGroup>
              <ListGroupItem>
                <Link to="/generative/nothing">Nothing</Link>
              </ListGroupItem>
            </ListGroup>
          </Panel.Collapse>
        </Panel>
      </PanelGroup>
    );
  }
}


export default Navigation;

import React from "react";
import { Card } from "./Card";
import { Form, Button, Input, Label } from "./FormElements";
import { Container, Title, Icon } from "./Layout";
import { Fragment } from "react";

const SharedExamples = () => {
  return (
    <div>
      <Fragment>
        <Title>This is a Title</Title>
        <Card>This is a card</Card>
        <Card centeredFlex>This is a centered card</Card>
        <Card>
          <span>These are icons</span>
          <div>
            <Icon className="fab fa-angellist"></Icon>
            <Icon medium className="fab fa-angellist"></Icon>
            <Icon big className="fab fa-angellist"></Icon>
            <Icon color="#000000" big className="fab fa-angellist"></Icon>{" "}
          </div>
        </Card>
        <Form>
          <Label>This is a label for the input field below</Label>
          <Input></Input>
          <Button>Default Button</Button>
          <Button dark>Dark Button</Button>
          <Button light>Light Button</Button>
          <Button green>Green Button</Button>
          <Button green mdText>
            Big Green Button
          </Button>
        </Form>

        <Container>
          <h2>This is a default container</h2>
          <div>Some Content</div>
          <ul>
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
          </ul>
        </Container>
        <Container centeredFlex>
          <h2>This is a centered container</h2>
          <div>Some Content</div>
          <ul>
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
          </ul>
        </Container>
      </Fragment>
    </div>
  );
};

export default SharedExamples;

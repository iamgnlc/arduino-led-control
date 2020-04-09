import React, { useReducer, useState } from "react";
import {
  ButtonGroup,
  Button,
  FormGroup,
  Label,
  Input,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Container,
} from "reactstrap";

import { GiLed } from "react-icons/gi";
import { FaCheck } from "react-icons/fa";

import LastAction from "./LastAction";

const initialState = {
  danger: "off",
  warning: "off",
  success: "off",
  lastAction: null,
};

function reducer(state, action) {
  return {
    ...state,
    [action.color]: action.status,
    lastAction: action.lastAction,
  };
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [blinkInterval, setBlinkInterval] = useState(500);

  const toggleLed = (color, status, value) => {
    if (!Array.isArray(status)) status = [status];

    status.forEach((status) => {
      const url = `${
        process.env.REACT_APP_SERVER_URL
      }/${color.toLowerCase()}/${status.toLowerCase()}/${value}`;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let state = { lastAction: data };
          if (data.code === 200) {
            state.color = color;
            state.status = status;
          }
          dispatch(state);
        });
    });
  };

  const toggle = (color) => {
    return (
      <ButtonGroup className="my-2">
        <Button
          size="lg"
          color={color}
          outline={state[color] === "on"}
          disabled={state[color] === "on"}
          onClick={() => toggleLed(color, ["stop", "on"])}
        >
          {state[color] === "on" && <FaCheck />} On
        </Button>
        <Button
          size="lg"
          color={color}
          outline={state[color] === "blink"}
          disabled={state[color] === "blink"}
          onClick={() => toggleLed(color, "blink", blinkInterval)}
        >
          {state[color] === "blink" && <FaCheck />} Blink
        </Button>
        <Button
          size="lg"
          color={color}
          outline={state[color] === "off"}
          disabled={state[color] === "off"}
          onClick={() => toggleLed(color, ["stop", "off"])}
        >
          {state[color] === "off" && <FaCheck />} Off
        </Button>
      </ButtonGroup>
    );
  };

  return (
    <Container className="h-100 d-flex align-items-center justify-content-center">
      <Card>
        <CardHeader>
          <h4 className="m-0 text-center">Arduino LED Control</h4>
        </CardHeader>
        <CardBody>
          <div className="d-flex justify-content-around flex-column flex-lg-row">
            {toggle("danger")}
            {toggle("warning")}
            {toggle("success")}
          </div>

          <FormGroup className="d-flex justify-content-center align-items-center flex-column">
            <Label>Blink interval</Label>
            <Input
              className="w-25 text-center"
              value={blinkInterval}
              type="number"
              min={100}
              onChange={(e) => setBlinkInterval(e.target.value)}
            />
          </FormGroup>

          <LastAction
            color={state?.lastAction?.color}
            status={state?.lastAction?.status}
          />
        </CardBody>
        <CardFooter>
          <h6 className="m-0 text-muted text-center">
            <GiLed /> &copy; GNLC
          </h6>
        </CardFooter>
      </Card>
    </Container>
  );
};

export default React.memo(App);

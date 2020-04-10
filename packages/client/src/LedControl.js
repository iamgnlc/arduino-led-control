import React, { Suspense, useReducer, useEffect, useCallback } from "react";
import {
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Container,
} from "reactstrap";
import { GiLed } from "react-icons/gi";
import LastAction from "./components/LastAction";
import Loading from "./components/Loading";

import { TOGGLE_LED, SET_BLINK } from "./actions.js";

const ToggleButtons = React.lazy(() => import("./components/ToggleButtons"));

const initialState = {
  danger: "off",
  warning: "off",
  success: "off",
  apiResponse: null,
  blinkInterval: 250,
};

function reducer(state, action) {
  switch (action.type) {
    case TOGGLE_LED:
      return {
        ...state,
        [action.color]: action.status,
        apiResponse: action.apiResponse,
      };
    case SET_BLINK:
      return {
        ...state,
        blinkInterval: Number(action.value),
      };
    default:
      return false;
  }
}

const LedControl = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
          let state = { type: TOGGLE_LED, apiResponse: data };
          if (data.code === 200) {
            state.color = color;
            state.status = status;
          }
          dispatch(state);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  };

  const setBlink = (value) => {
    dispatch({ type: SET_BLINK, value });
  };

  // Initialise board based on initial state.
  const initBoard = useCallback(() => {
    toggleLed("danger", ["stop", initialState["danger"]]);
    toggleLed("warning", ["stop", initialState["warning"]]);
    toggleLed("success", ["stop", initialState["success"]]);
  }, []);

  useEffect(() => {
    initBoard();
  }, [initBoard]);

  return (
    <Container className="h-100 d-flex align-items-center justify-content-center">
      <Card>
        <CardHeader>
          <h4 className="m-0 text-center">Arduino LED Control</h4>
        </CardHeader>
        <CardBody>
          <div className="d-flex justify-content-around flex-column flex-lg-row">
            <Suspense fallback={<Loading />}>
              <ToggleButtons
                color="danger"
                status={state["danger"]}
                blinkInterval={state.blinkInterval}
                toggleLed={toggleLed}
              />
              <ToggleButtons
                color="warning"
                status={state["warning"]}
                blinkInterval={state.blinkInterval}
                toggleLed={toggleLed}
              />
              <ToggleButtons
                color="success"
                status={state["success"]}
                blinkInterval={state.blinkInterval}
                toggleLed={toggleLed}
              />
            </Suspense>
          </div>

          <FormGroup className="d-flex justify-content-center align-items-center flex-column">
            <Label>Blink interval</Label>
            <InputGroup className="w-50">
              <Input
                className="w-25 text-center"
                value={state.blinkInterval}
                type="number"
                min={100}
                onChange={(e) => setBlink(e.target.value)}
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>ms</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>

          <LastAction
            color={state?.apiResponse?.color}
            status={state?.apiResponse?.status}
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

export default React.memo(LedControl);

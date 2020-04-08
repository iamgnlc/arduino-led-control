import React, { useReducer } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Container,
  Table,
} from "reactstrap";

const initialState = {
  red: false,
  yellow: false,
  green: false,
  lastAction: null,
};

function reducer(state, action) {
  return {
    ...state,
    [action.color]: !state[action.color],
    lastAction: action.lastAction,
  };
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleLed = (color, status) => {
    const url = `${
      process.env.REACT_APP_SERVER_URL
    }/${color.toLowerCase()}/${status.toLowerCase()}/`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let state = { lastAction: data };
        if (data.code === 200) state.color = color;
        dispatch(state);
      });
  };

  const setStatus = (color) => {
    return state[color] ? "Off" : "On";
  };

  return (
    <Container className="h-100 d-flex align-items-center justify-content-center flex-column">
      <Card>
        <CardHeader>
          <h4 className="m-0 text-center">Arduino LED Control</h4>
        </CardHeader>
        <CardBody>
          <Button
            block
            size="lg"
            color="danger"
            onClick={() => toggleLed("red", setStatus("red"))}
          >
            {setStatus("red")}
          </Button>
          <Button
            block
            size="lg"
            color="warning"
            onClick={() => toggleLed("yellow", setStatus("yellow"))}
          >
            {setStatus("yellow")}
          </Button>
          <Button
            block
            size="lg"
            color="success"
            onClick={() => toggleLed("green", setStatus("green"))}
          >
            {setStatus("green")}
          </Button>
          <Table bordered size="sm" className="my-2">
            <thead>
              <tr>
                <th colSpan="2">Last Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="text-muted">
                  Result
                </th>
                <td>{state?.lastAction?.message || "-"}</td>
              </tr>
              <tr>
                <th scope="row" className="text-muted">
                  Color
                </th>
                <td>{state?.lastAction?.color || "-"}</td>
              </tr>
              <tr>
                <th scope="row" className="text-muted">
                  Status
                </th>
                <td>{state?.lastAction?.status || "-"}</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
        <CardFooter>
          <h6 className="m-0 text-muted">&copy; GNLC</h6>
        </CardFooter>
      </Card>
    </Container>
  );
};

export default React.memo(App);

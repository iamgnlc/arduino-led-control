import React from "react";
import { ButtonGroup, Button, Col } from "reactstrap";

const ToggleButtons = (props) => {
  const { color, status, blinkInterval, toggleLed } = props;

  return (
    <Col>
      <ButtonGroup className="my-2 w-100" size="lg">
        <Button
          color={color}
          outline={status === "on"}
          disabled={status === "on"}
          onClick={() => toggleLed(color, ["stop", "on"])}
        >
          On
        </Button>
        <Button
          color={color}
          outline={status === "blink"}
          disabled={status === "blink"}
          onClick={() => toggleLed(color, "blink", blinkInterval)}
        >
          Blink
        </Button>
        <Button
          color={color}
          outline={status === "off"}
          disabled={status === "off"}
          onClick={() => toggleLed(color, ["stop", "off"])}
        >
          Off
        </Button>
      </ButtonGroup>
    </Col>
  );
};

export default React.memo(ToggleButtons);

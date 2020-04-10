import React from "react";
import { ButtonGroup, Button } from "reactstrap";
import { FaCheck } from "react-icons/fa";

const ToggleButtons = (props) => {
  const { color, status, blinkInterval, toggleLed } = props;

  return (
    <ButtonGroup className="toggle-buttons my-2" size="lg">
      <Button
        color={color}
        outline={status === "on"}
        disabled={status === "on"}
        onClick={() => toggleLed(color, ["stop", "on"])}
      >
        {status === "on" && <FaCheck className="d-none d-md-inline" />} On
      </Button>
      <Button
        color={color}
        outline={status === "blink"}
        disabled={status === "blink"}
        onClick={() => toggleLed(color, "blink", blinkInterval)}
      >
        {status === "blink" && <FaCheck className="d-none d-md-inline" />} Blink
      </Button>
      <Button
        color={color}
        outline={status === "off"}
        disabled={status === "off"}
        onClick={() => toggleLed(color, ["stop", "off"])}
      >
        {status === "off" && <FaCheck className="d-none d-md-inline" />} Off
      </Button>
    </ButtonGroup>
  );
};

export default React.memo(ToggleButtons);

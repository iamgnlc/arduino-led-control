import React from "react";
import {
  Col,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

const BlinkInterval = (props) => {
  const { blinkInterval, setBlink } = props;

  return (
    <Col xs={12}>
      <FormGroup className="d-flex justify-content-center align-items-center flex-column m-0">
        <Label>Blink interval</Label>
        <InputGroup className="w-50">
          <Input
            className="w-25 text-center"
            value={blinkInterval}
            type="number"
            min={100}
            onChange={(e) => setBlink(e.target.value)}
          />
          <InputGroupAddon addonType="append">
            <InputGroupText>ms</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </FormGroup>
    </Col>
  );
};

export default React.memo(BlinkInterval);

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Board, Led } = require("johnny-five");

const board = new Board();
const ADDRESS = process.env.ADDRESS;
const PORT = process.env.PORT;

const Leds = require("./Leds");

// Ready.
board.on("ready", () => {
  const app = express();
  const leds = new Leds();

  const allowedStatuses = ["on", "off", "blink", "stop"];

  const isRequestValid = (color, status) => {
    return (
      color &&
      status &&
      allowedStatuses.includes(status) &&
      Object.keys(leds.colors).includes(color)
    );
  };

  const ledToggle = (color = null, status = null, value) => {
    if (isRequestValid(color, status)) {
      leds.colors[color][status](value);

      return { color, status, code: 200, message: "Success" };
    } else return { code: 405, message: "Not Allowed" };
  };

  app.use(cors());

  app.get("/", (req, res) => {
    res.send("Server running");
  });

  app.get("/:color/:status/:value?", (req, res) => {
    const { color, status, value } = req.params;
    console.log(`${color} => ${status}`);

    const response = ledToggle(color, status, value);

    res.json(response);
  });

  app.listen(PORT, ADDRESS, () => {
    // Actually turn the server on
    console.log(`Server running at http://${ADDRESS}:${PORT}/`);
  });
});

// Exit.
board.on("exit", () => {
  console.log("Shutting down leds.colors...");
  const leds = new Leds();
  leds.allOff();
});

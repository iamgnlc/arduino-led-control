require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Board, Led } = require("johnny-five");

const board = new Board();
const ADDRESS = process.env.ADDRESS;
const PORT = process.env.PORT;

// Ready.
board.on("ready", () => {
  const app = express();
  const leds = {
    success: new Led(11),
    warning: new Led(12),
    danger: new Led(13),
  };

  const ledToggle = (color = null, status = null, value) => {
    const allowedStatuses = ["on", "off", "blink", "stop"];

    if (!color || !status || !allowedStatuses.includes(status))
      return { code: 405, message: "Not Allowed" };

    leds[color][status](value);

    return { color, status, code: 200, message: "Success" };
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
  console.log("Shutting down leds...");
  new Led(11).stop().off();
  new Led(12).stop().off();
  new Led(13).stop().off();
});

const express = require("express");
const cors = require("cors");
const { Board, Led } = require("johnny-five");

const board = new Board();
const PORT = 3020;

// Ready.
board.on("ready", () => {
  const app = express();
  const leds = {
    green: new Led(11),
    yellow: new Led(12),
    red: new Led(13),
  };

  const ledToggle = (color = null, status = null) => {
    const allowedStatuses = ["on", "off"];

    if (!color || !status || !allowedStatuses.includes(status))
      return { code: 405, message: "Not Allowed" };

    leds[color][status]();

    return { color, status, code: 200, message: "Success" };
  };

  app.use(cors());

  app.get("/", (req, res) => {
    res.send("Server running");
  });

  app.get("/:color/:status/", (req, res) => {
    const { color, status } = req.params;
    console.log(`${color} => ${status}`);

    const response = ledToggle(color, status);

    res.json(response);
  });

  app.listen(PORT, () => {
    // Actually turn the server on
    console.log(`Server running at http://localhost:${PORT}/`);
  });
});

// Exit.
// board.on("exit", () => {
//   ledToggle("red", "off");
//   ledToggle("yellow", "off");
//   ledToggle("green", "off");
// });

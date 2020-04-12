const { Led } = require("johnny-five");

class Leds {
  constructor() {
    this.colors = {
      success: new Led(11),
      warning: new Led(12),
      danger: new Led(13),
    };
  }
  allOff() {
    Object.keys(this.colors).map((key) => {
      this.colors[key].stop().off();
    });
  }
}

module.exports = Leds;

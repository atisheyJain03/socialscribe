const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const path = require("path");
const { drawTextWithWordWrap } = require("../helper/utils");

const imagePath = path.resolve(__dirname, "../assets/images/profile.png");
const imagePath2 =
  "https://images.unsplash.com/photo-1716369415883-db404f0a8425?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// Load the image and draw text on it
loadImage(imagePath2)
  .then((image) => {
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");

    // Draw the image
    ctx.drawImage(image, 0, 0, image.width, image.height);

    // Set text properties
    ctx.fillStyle = "white"; // Text color
    ctx.font = "30px Arial"; // Font properties
    const text =
      "This is an example of text that will be wrapped within the given width of the canvas. It automatically breaks lines to fit the specified width.";

    // Draw the text
    const x = 50; // Starting x position
    const y = Math.max(image.height / 3, 50); // Starting y position
    const maxWidth = image.width - 300; // Maximum width for text wrapping
    console.log("🚀 ~ .then ~ image.width:", image.width);
    console.log("🚀 ~ .then ~ maxWidth:", maxWidth);
    const lineHeight = 40; // Line height for text

    drawTextWithWordWrap(ctx, text, x, y, maxWidth, lineHeight);

    // Save the canvas to a file
    const out = fs.createWriteStream(path.join(__dirname, "text-on-image.png"));
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on("finish", () => console.log("The PNG file was created."));
  })
  .catch((err) => {
    console.error("Failed to load the image:", err);
  });

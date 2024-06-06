const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const path = require("path");

const addTextToImage = async () => {
  try {
    const imagePath = path.resolve(__dirname, "../assets/images/profile.png");
    // Load the base image
    const image = await loadImage(
      "https://images.unsplash.com/photo-1716369415883-db404f0a8425?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    );

    // Create a new canvas with the same dimensions as the image
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");

    // Draw the image onto the canvas
    ctx.drawImage(image, 0, 0);

    // Add text on top of the image
    ctx.font = "42px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Hello, World!", 100, 50, 30);

    // Convert the canvas to a Buffer
    const buffer = canvas.toBuffer("image/jpeg");

    const outputPath = path.resolve(__dirname, "../assets/images/output.jpg");

    // Write the modified image to a file
    fs.writeFileSync(outputPath, buffer);

    console.log("Text added to image successfully!");
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

addTextToImage();

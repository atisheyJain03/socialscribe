const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const { drawTextWithWordWrap, getRandomElement } = require("../helper/utils");

const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { poetryImages } = require("../constants/constans");
// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

async function generatePoetryImage(text) {
  // Define the dimensions of the canvas
  const width = 600;
  const height = 600;
  const lineHeight = 24; // Line height for text

  // Create a new canvas
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  // Set the background color to white
  context.fillStyle = "white";
  context.fillRect(0, 0, width, height);

  // Fetch the image from Unsplash
  // const imageUrl = "https://source.unsplash.com/random/?painting";
  const imageUrl = getRandomElement(poetryImages);
  const image = await loadImage(imageUrl);

  // Calculate dimensions with padding
  const padding = 20;
  const paddedWidth = width - 2 * padding;
  const paddedHeight = height * 0.8 - 2 * padding;

  // Draw the image with padding
  context.drawImage(image, padding, padding, paddedWidth, paddedHeight);

  // Set the text properties
  context.fillStyle = "black"; // Text color
  context.font = "bold 22px 'Ubuntu Mono'";
  //   context.letterSpacing = 2;
  context.textBaseline = "middle";

  // Define the text to be written
  //   const text =
  //     "In the stillness of night, whispers dance, Echoes of dreams in a silent trance. Each page turned, a journey begins, Where destinies weave and light dims. In the pages of time, our stories are penned, Each word a whisper of the souls who've been.";

  drawTextWithWordWrap(
    context,
    text,
    20,
    height * 0.8,
    paddedWidth,
    lineHeight
  );
  // Write the text below the image
  //   context.fillText(text, 20, height * 0.75 + padding + 20); // Adding 20 pixels for spacing

  // Save the canvas to a file
  const buffer = canvas.toBuffer("image/jpeg");
  const randomId = uuidv4();

  const filePath = path.join(
    __dirname,
    `../personal/instaPosts/insta-${randomId}.jpg`
  );
  fs.writeFileSync(filePath, buffer);

  console.log("Image created and saved as output.png");
  return buffer;
}

module.exports = { generatePoetryImage };
// generatePoetryImage().catch((err) => console.error(err));

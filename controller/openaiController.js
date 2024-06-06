// const response = await openai.images.edit({
//   model: "dall-e-2",
//   image: fs.createReadStream("sunlit_lounge.png"),
//   mask: fs.createReadStream("mask.png"),
//   prompt: "A sunlit indoor lounge area with a pool containing a flamingo",
//   n: 1,
//   size: "1024x1024",
// });
// image_url = response.data[0].url;

const fs = require("fs");
const { default: OpenAI } = require("openai");

// Configure the OpenAI API with your API key
const api = new OpenAI({
  apiKey: "",
});

// Function to generate images using the DALL-E 2 model
const generateImagesWithDALLE2 = async (promptText) => {
  try {
    // // Make a request to the DALL-E 2 model endpoint with the prompt text
    // const response = await api.createEngine("dalle-2").generate({
    //   prompt: promptText,
    //   numResults: 1, // Number of images to generate
    //   returnType: "image", // Specify the return type as an image
    // });

    const response = await api.images.generate({
      model: "dall-e-3",
      //   image: fs.createReadStream("sunlit_lounge.png"),
      //   mask: fs.createReadStream("mask.png"),
      prompt: promptText,
      n: 1,
      size: "1024x1024",
    });

    const image_url = response.data[0].url;
    console.log("🚀 ~ generateImagesWithDALLE2 ~ image_url:", image_url);

    // Extract the generated image from the response
    const generatedImage = response.data[0].content;

    const outputFilePath = "generated_image.jpg";

    fs.writeFileSync(outputFilePath, Buffer.from(generatedImage, "base64"));

    // Save or display the generated image as needed
    // For example, you can save the image to a file or send it as a response in an HTTP server

    console.log("Image generated successfully.");
  } catch (error) {
    console.error("An error occurred while generating the image:", error);
  }
};

// Usage example:
const prompt =
  "A photo of indian cricketrer after winning indian election.and a quote by William Shakespeare";
generateImagesWithDALLE2(prompt);

const { FFCreator, FFScene, FFAlbum, FFText } = require("ffcreator");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const colors = require("colors/safe"); // Assuming you are using a color library for console output
const randomInt = require("random-int");

async function createInstagramReel(displayText) {
  try {
    const videoWidth = 700;
    const videoHeight = 1200;
    const tatalImages = 19;

    // Create FFCreator instance
    const creator = new FFCreator({
      height: videoHeight,
      width: videoWidth,
    });

    // Create scene
    const scene = new FFScene();
    scene.setBgColor("#000000");
    scene.setDuration(45);
    scene.setTransition("GridFlip", 2);
    creator.addChild(scene);

    // const randomNumber = Math.floor(Math.random() * 10) + 1;
    const randomNumber = randomInt(1, tatalImages);
    console.log("🚀 ~ createInstagramReel ~ randomNumber:", randomNumber);

    // Create a multi-photo Album
    const album = new FFAlbum({
      list: [
        path.join(
          __dirname,
          `../assets/images/naturedark/nature (${randomNumber()}).jpg`
        ),
        path.join(
          __dirname,
          `../assets/images/naturedark/nature (${randomNumber()}).jpg`
        ),
        path.join(
          __dirname,
          `../assets/images/naturedark/nature (${randomNumber()}).jpg`
        ),
        path.join(
          __dirname,
          `../assets/images/naturedark/nature (${randomNumber()}).jpg`
        ),
        path.join(
          __dirname,
          `../assets/images/naturedark/nature (${randomNumber()}).jpg`
        ),
      ], // Picture collection for album
      height: videoHeight * 2,
      width: videoWidth * 2,
    });
    album.setTransition("fadeIn"); // Set album switching animation
    album.setDuration(8); // Set the stay time of a single sheet
    album.setTransTime(1); // Set the duration of a single animation
    scene.addChild(album);

    const text = new FFText({
      text: displayText,
      x: 80,
      y: videoHeight / 3,
      fontSize: 50,
    });
    text.setColor("#ffffff");
    text.setBackgroundColor("#00000040");
    text.setWrap(videoWidth - 150);
    text.addEffect("fadeIn", 1, 1);
    text.setStyle({
      "font-family": "sans-serif",
      "font-weight": 500,
      "text-transform": "uppercase",
      "text-align": "justify",
    });

    scene.addChild(text);

    const outputPath = path.join(
      __dirname,
      "..",
      "personal",
      "instagram/reels/poetry",
      `rees-${uuidv4()}.mp4`
    );

    await new Promise((resolve, reject) => {
      creator.output(outputPath);
      creator.start();

      creator.on("start", () => {
        console.log(`FFCreator start`);
      });
      creator.on("error", (e) => {
        console.log(`FFCreator error: ${JSON.stringify(e)}`);
        reject(e);
      });
      creator.on("progress", (e) => {
        console.log(
          colors.yellow(
            `FFCreator progress: ${e.state} ${(e.percent * 100) >> 0}%`
          )
        );
      });
      creator.on("complete", (e) => {
        console.log(
          colors.magenta(
            `FFCreator completed: \n USEAGE: ${e.useage} \n PATH: ${e.output} `
          )
        );
        resolve();
      });
    });

    creator.closeLog(); // Close log (including perf)
    console.log("Video creation completed successfully.");
  } catch (err) {
    console.error("Error creating Instagram reel:", err);
  }
}

(async () => {
  const quotes = [
    `"It's the possibility of having a dream come true that makes life interesting. Pursue your dreams with passion and courage; the journey itself holds the magic and fulfillment."\n- Paulo Coelho, The Alchemist`,

    // `"You have within you right now, everything you need to deal with whatever the world can throw at you."\n- Brian Tracy, Eat That Frog!: 21 Great Ways to Stop Procrastinating and Get More Done in Less Time`,

    // `"The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well."\n- Ralph Waldo Emerson`,

    // `"In three words I can sum up everything I've learned about life: it goes on."\n- Robert Frost`,
  ];

  console.log(quotes); // Output the array to the console

  try {
    let i = 0;
    while (i < quotes.length) {
      const arr = [];
      arr.push(createInstagramReel(quotes[i++]));
      // if (i < quotes.length) {
      //   arr.push(createInstagramReel(quotes[i++]));
      // }
      // if (i < quotes.length) {
      //   arr.push(createInstagramReel(quotes[i++]));
      // }
      // if (i < quotes.length) {
      //   arr.push(createInstagramReel(quotes[i++]));
      // }

      console.log(`index  - ${i}`);

      await Promise.all(arr);
    }
    // for (let i = 0; i < reflectivePhrases.length; i++) {
    //   await createInstagramReel(reflectivePhrases[i]);
    // }
  } catch (error) {
    console.error("Error fetching random quote:", error);
  }
})();

require("dotenv").config();
const { IgApiClient } = require("instagram-private-api");

(async () => {})();

const postToInsta = async (imageBuffer, caption) => {
  const ig = new IgApiClient();
  ig.state.generateDevice(process.env.IG_USERNAME);
  // await ig.simulate.preLoginFlow();
  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
  console.log("logged in");

  await ig.publish.photo({
    file: imageBuffer,
    caption,
  });
};

module.exports = { postToInsta };

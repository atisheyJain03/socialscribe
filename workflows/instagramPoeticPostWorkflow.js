const { repairJson } = require("../helper/utils");
const { postToInsta } = require("../services/instaServices");
const { generatePoetryImage } = require("../services/instagramServicces");
const { generatePoeticQuote } = require("../services/openAIServices.cjs");

class SocialMediaPostWorkflow {
  #error;
  #generatedPostContent;
  #photoBuffer;

  constructor() {
    this.#error = null;
    this.#generatedPostContent = "";
    this.#photoBuffer = "";
  }

  async generatePostContent() {
    if (this.#error) {
      return this;
    }
    try {
      const response = await generatePoeticQuote();
      console.log(
        "🚀 ~ SocialMediaPostWorkflow ~ generatePostContent ~ response:",
        response
      );
      this.#generatedPostContent = response;
      console.log("Post content generated successfully");
    } catch (error) {
      this.#error = error;
    }
    return this;
  }

  async makePhotoPost() {
    if (this.#error) {
      return this;
    }
    try {
      const jsonData = repairJson(this.#generatedPostContent);
      const response = await generatePoetryImage(JSON.parse(jsonData).quote);
      this.#photoBuffer = response;
      console.log("Photo post created successfully ");
    } catch (error) {
      this.#error = error;
    }
    return this;
  }

  async postPhoto() {
    if (this.#error) {
      return this;
    }

    try {
      const jsonData = repairJson(this.#generatedPostContent);
      const caption = JSON.parse(jsonData).context;

      const response = await postToInsta(this.#photoBuffer, caption);
      console.log("Photo post posted successfully ");
    } catch (error) {
      this.#error = error;
    }
    return this;
  }

  async triggerWorkflow() {
    await this.generatePostContent();
    await this.makePhotoPost();
    await this.postPhoto();

    console.log({
      e: this.#error,
    });
  }
}

setInterval(() => {
  (async () => {
    const workflow = new SocialMediaPostWorkflow();
    await workflow.triggerWorkflow();
  })();
}, 30 * 60 * 1000);

(async () => {
  const workflow = new SocialMediaPostWorkflow();
  await workflow.triggerWorkflow();
})();

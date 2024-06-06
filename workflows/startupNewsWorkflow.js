class StartupNewsWorkflow {
  constructor(newsUrl) {
    this.newsUrl = newsUrl;
    this.error = null;
    this.scrappedArticle = "";
    this.generatedArticle = "";
    this.generatedTweet = "";
  }

  async scrapArticle() {
    if (this.error) {
      return this;
    }
    try {
      const scrappedArticle = await getArticleDetails(this.newsUrl);
      this.scrappedArticle = scrappedArticle;
    } catch (error) {
      this.error = error;
    }
    return this;
  }

  async rewriteArticle() {
    if (this.error) {
      return this;
    }
    try {
      const response = await openai.Completion.create({
        engine: "davinci",
        prompt: `Rewrite the following article: ${this.scrappedArticle}`,
        max_tokens: 500,
      });
      this.generatedArticle = response.choices[0].text.trim();
    } catch (error) {
      this.error = error;
    }
    return this;
  }

  async generateTweet() {
    if (this.error) {
      return this;
    }
    try {
      const response = await generateTweet(this.scrappedArticle);
      this.generatedTweet = response;
    } catch (error) {
      this.error = error;
    }
    return this;
  }
}

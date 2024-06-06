let Parser = require("rss-parser");
let parser = new Parser();

(async () => {
  let feed = await parser.parseURL(
    "https://www.youtube.com/watch?v=sL6SgDEHH00"
  );

  // let feed = await parser.parseURL("https://www.reddit.com/.rss");
  console.log(feed);

  //   feed.items.forEach((item) => {
  //     console.log(item.title + ":" + item.link);
  //   });
})();

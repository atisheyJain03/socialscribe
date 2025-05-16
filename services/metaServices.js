require("dotenv").config();
// const { GetAuthorizedFacebookPagesRequest } = require("instagram-graph-api");

const FB_APP_ID = process.env.FB_APP_ID;
const FB_APP_SECRET = process.env.FB_APP_SECRET;
const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

// const request = new GetAuthorizedFacebookPagesRequest(FB_ACCESS_TOKEN);
// console.log("🚀 ~ request:", request);

// request.execute().then((response) => {
//   console.log("🚀 ~ request.execute ~ response:", response);
//   const firstFacebookPage = response.getAuthorizedFacebookPages()[0].id;
//   console.log("🚀 ~ request.execute ~ firstFacebookPage:", firstFacebookPage);
// });

const FB = require("fb");

FB.setAccessToken(FB_ACCESS_TOKEN);
// FB.api(
//   "/sentifly/feed",
//   "POST",
//   { message: "Testing with api" },
//   function (response) {
//     console.log("🚀 ~ response:", response);
//     if (response.error) {
//       console.log("error occurred: " + response.error);
//       return;
//     }
//     console.log("successfully posted to page!");
//   }
// );

var body = "My first post using facebook-node-sdk";
FB.api("me/feed", "post", { message: body }, function (res) {
  if (!res || res.error) {
    console.log(!res ? "error occurred" : res.error);
    return;
  }
  console.log("Post Id: " + res.id);
});

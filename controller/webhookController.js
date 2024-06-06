const { StartupNewsWorkflow } = require("../workflows/startupNewsWorkflow");

async function rssWebhoook(req, res) {
  try {
    const data = req.body?.data?.items_new ?? [];

    for (let i = 0; i < data.length; i++) {
      const workFlow = new StartupNewsWorkflow(data[i].url);
      await workFlow.triggerWorkflow();
    }

    res.send("success");
  } catch (error) {
    console.error(error);
  }
}

module.exports = { rssWebhoook };

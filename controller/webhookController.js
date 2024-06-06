async function rssWebhoook(req, res) {
  try {
    const data = req.body?.data?.items_new ?? [];
    console.log("🚀 ~ rssWebhoook ~ data:", data);

    res.send("success");
  } catch (error) {
    console.error(error);
  }
}

module.exports = { rssWebhoook };

module.exports = {
    getIndex: (req, res) => {
      res.render("index.ejs");
    },
    //! temporary feed
    getFeed: (req, res) => {
      res.render("feed.ejs");
    },
  };
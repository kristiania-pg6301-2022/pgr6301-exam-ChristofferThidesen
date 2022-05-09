import express from "express";
import path from "path";

const app = express();

const articles = [
  {
    title: "News 1 - from server",
    article:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: "05 / 04 / 2022",
  },
  {
    title: "News 2 - from server",
    article:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: "05 / 04 / 2022",
  },
  {
    title: "News 3 - from server",
    article:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: "05 / 04 / 2022",
  },
];

app.get("/api/articles", (res) => {
  res.json(articles);
});

app.post("/api/articles", (req, res) => {
  const { title, article, date } = req.body;
  articles.push({ title, article, date });
  res.sendStatus(200);
});

app.use(express.static(path.resolve("..", "client", "dist")));

app.use((res) => {
  res.sendFile(path.resolve("..", "dist", "client", "index.html"));
});

const server = app.listen(3000, () => {
  console.log("listening on http://localhost:" + server.address().port);
});

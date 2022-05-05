import * as React from "react";
import * as ReactDom from "react-dom";
import {
  Routes,
  Route,
  Link,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";

const ARTICLES = [
  {
    title: "News 1",
    article:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: "05 / 04 / 2022",
  },
  {
    title: "News 2",
    article:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: "05 / 04 / 2022",
  },
  {
    title: "News 3",
    article:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: "05 / 04 / 2022",
  },
];

function FrontPage() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/articles"> Articles</Link>
        </li>

        <li>
          <Link to="/articles/new">New Articles</Link>
        </li>
      </ul>
    </div>
  );
}

// function ListArticles({ articleApi }) {
//   const [articles, setArticles] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const api = articleApi + articles;

//   useEffect(function () {
//     async function fetchData() {
//       try {
//         const response = await fetch(api);
//         console.log(api);
//         if (response.ok) {
//           const json = await response.json();

//           setArticles(json);
//         } else {
//           setError("An error occured");
//         }
//       } catch (err) {
//         setError(error.toString());
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, []);

//   if (loading) {
//     return <div className="loading">loading...</div>;
//   }

//   if (error) {
//     return <div>An error occured: {error}</div>;
//   }

function ListArticles({ articleApi }) {
  const [articles, setArticles] = useState();

  useEffect(async () => {
    setArticles(undefined);
    setArticles(await articleApi.listArticels());
  }, []);

  if (!articles) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Articles</h1>
      {articles.map((m) => (
        <div key={m.title}>
          {" "}
          <Card style={{ width: "18rem" }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
              <Card.Title>
                <>{m.title}</>
              </Card.Title>
              <Card.Text>
                <>{m.article}</>
              </Card.Text>
              <Card.Text>
                <>{m.date}</>
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </>
  );
}
function AddArticle({ articleApi }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [article, setArticle] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await articleApi.onAddArticle({ title, date, article });
    navigate("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Articles</h1>
      <div>
        <label>
          Title:{" "}
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
      </div>

      <div>
        <label>
          date: <input value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          article:{" "}
          <textarea
            value={article}
            onChange={(e) => setArticle(e.target.value)}
          />
        </label>
      </div>
      <button>Submit</button>
    </form>
  );
}

function Application() {
  const articleApi = {
    onAddArticle: async (m) => ARTICLES.push(m),
    listArticels: async () => ARTICLES,
  };

  return (
    <>
      <BrowserRouter>
        <Navbar expand="lg" variant="light" bg="light">
          <Container>
            <Routes>
              <Route path="/" element={<FrontPage />} />
              <Route
                path="/articles/new"
                element={<AddArticle articleApi={articleApi} />}
              />
              <Route
                path="/articles"
                element={<ListArticles articleApi={articleApi} />}
              />
            </Routes>
          </Container>
        </Navbar>
      </BrowserRouter>
    </>
  );
}

ReactDom.render(<Application />, document.getElementById("app"));

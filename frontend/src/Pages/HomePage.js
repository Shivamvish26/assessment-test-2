import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export default function HomePage() {
  const datapost = [
    {
      id: 1,
      title: "First Post for blog",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "Shivam",
      timestamp: "2023-10-01",
      status: "Published",
    },
    {
      id: 2,
      title: "Second Post for blog",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "Shivam",
      timestamp: "2023-10-05",
      status: "Draft",
    },
    {
      id: 3,
      title: "Third Post for blog",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "Shivam",
      timestamp: "2023-10-10",
      status: "Published",
    },
    {
      id: 4,
      title: "Fourth Post for blog",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "Shivam",
      timestamp: "2023-10-15",
      status: "Draft",
    },
  ];

  const [postData, setPostData] = useState([]);
  let token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(`http://localhost:5000/get-post`, {
          headers: {
            authorization: `bearer ${token}`,
          },
        });
        const data = await result.json();
        setTimeout(() => {
          setPostData(data.posts);
        }, 2000);
        console.log(data);
      } catch (error) {
        console.log("Error while fetching the data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="py-5">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <h1>Blogs</h1>
          </div>
          <div>
            <div className="container mt-4">
              <div className="row">
                {postData.length > 0 ? (
                  postData.map((post) => (
                    <div className="col-md-4 mb-4" key={post._id}>
                      <Link
                        to={`/post/${post._id}`}
                        className="text-decoration-none text-dark"
                      >
                        <div className="card h-100 shadow-sm">
                          <img
                            src={`http://localhost:5000/upload/${post.image}`}
                            className="card-img-top"
                            alt="post"
                            style={{ height: "200px", objectFit: "cover" }}
                          />

                          <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>

                            <p className="card-text">
                              {post.content
                                .replace(/<[^>]+>/g, "")
                                .slice(0, 80)}
                              ...
                            </p>
                          </div>

                          <div className="card-footer bg-white border-0">
                            <small className="text-muted d-block">
                              By {post.author}
                            </small>
                            <small className="text-muted">
                              {moment(post.updatedAt).format("DD MMM YYYY")}
                            </small>

                            <span
                              className={`badge ms-2 ${
                                post.status === "published"
                                  ? "bg-success"
                                  : "bg-warning text-dark"
                              }`}
                            >
                              {post.status}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <h5>Loading Posts...</h5>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

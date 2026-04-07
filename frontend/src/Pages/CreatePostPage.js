import React from "react";
import { Link } from "react-router-dom";

export default function CreatePostPage() {
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

  return (
    <>
      <div className="py-5">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <h1>Display All blogs</h1>
            <Link to="/add-post" className="btn btn-primary">
              Create New Post
            </Link>
          </div>
          <div>
            <table className="table table-bordered mt-4">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Author</th>
                  <th>Timestamp</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {datapost.map((post) => {
                  return (
                    <tr>
                      <td>{post.id}</td>
                      <td>{post.title}</td>
                      <td>{post.content}</td>
                      <td>{post.author}</td>
                      <td>{post.timestamp}</td>
                      <td>{post.status}</td>
                      <td className="d-flex">
                        <Link
                          to={`/edit-post/${post._id}`}
                          className="text-primary me-3"
                        >
                          <i className="bi bi-pencil-square fs-5"></i>
                        </Link>

                        <Link
                          to={`/delete-post/${post._id}`}
                          className="text-danger"
                        >
                          <i className="bi bi-trash fs-5"></i>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

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

  const [postData, setPostData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  let token = localStorage.getItem("token");

  // post ko delete kiye hai
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;
    try {
      let result = await fetch(`http://localhost:5000/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${token}`,
        },
      });
      let res = await result.json();
      console.log("data deleted", res);
      alert(res.message);
      setPostData(postData.filter((post) => post._id !== id));
    } catch (error) {
      console.log("Delete error", error);
    }
  };

  // search ko handle kiye hai
  const searchHandleproduct = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${token}`,
        },
      });
      let data = await result.json();
      console.log(data);
      setPostData(data.posts);
    } else {
      fetchData();
    }
  };

  // post ko fetch kiye hai
  const fetchData = async () => {
    try {
      const result = await fetch(
        `http://localhost:5000/my-posts/${user.name}`,
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        },
      );
      const data = await result.json();
      setPostData(data.posts);
    } catch (error) {
      console.log("Error while fetching the data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          <div className="text-center">
            <input
              className="form-control w-50"
              onChange={searchHandleproduct}
              type="text"
              placeholder="Search Product"
            />
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
                {postData.map((post) => {
                  return (
                    <tr key={post._id}>
                      <td>{post._id}</td>
                      <td>{post.title}</td>
                      <td>{post.content}</td>
                      <td>{post.author}</td>
                      <td>{moment(post.updatedAt).format("DD MMM YYYY")}</td>
                      <td>{post.status}</td>
                      <td className="d-flex">
                        <Link
                          to={`/edit-post/${post._id}`}
                          className="text-primary me-3"
                        >
                          <i className="bi bi-pencil-square fs-5"></i>
                        </Link>

                        <i
                          className="bi bi-trash fs-5 text-danger"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDelete(post._id)}
                        ></i>
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

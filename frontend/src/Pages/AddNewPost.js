import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Editor } from "react-simple-wysiwyg";

export default function AddNewPost() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [author, setAuthor] = useState(user?.name || "");
  const [status, setStatus] = useState("draft");
  let token = localStorage.getItem("token");


  const navigate = useNavigate();

  const handleSavePost = async (e) => {
    e.preventDefault();

    try {
      console.log("Form submit hua");

      const data = new FormData();
      data.append("title", title);
      data.append("content", content);
      data.append("author", author);
      data.append("status", status);
      data.append("image", image);
      let result = await fetch("http://localhost:5000/create", {
        method: "POST",
        body: data,
        headers: {
            authorization:`bearer ${token}`,
          },
      });
      let res = await result.json();
      console.log(res);
      console.log(res.message);
      setTitle("");
      setContent("");
      setAuthor("");
      setStatus("draft");
      setImage(null);
      navigate("/create");
    } catch (error) {
      console.log(error);
      console.log("Something went wrong");
    }
  };

  return (
    <>
      <div className="py-5">
        <div className="container">
          <h1>Add New Post</h1>
          <div>
            <form onSubmit={handleSavePost}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Post Title
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter post title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Content
                </label>
                <Editor
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Upload Image
                </label>
                <div className="input-group">
                  <input
                    type="file"
                    className="form-control"
                    placeholder="Upload an image"
                    required
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Author
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter author name"
                    required
                    disabled
                    value={author}
                    readOnly
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Status
                </label>
                <select
                  className="form-select"
                  required
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Save Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

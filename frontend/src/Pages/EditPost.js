import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Editor } from "react-simple-wysiwyg";

export default function EditPost() {
  let token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState("");
  const [author, setAuthor] = useState(user?.name || "");
  const [status, setStatus] = useState("draft");
  const { id } = useParams();

  const navigate = useNavigate();

  // post ko update karna kai liye
  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("content", content);
    data.append("author", author);
    data.append("status", status);
    if (image) {
      data.append("image", image);
    }
    let result = await fetch(`http://localhost:5000/edit-post/${id}`, {
      method: "PUT",
      body: data,
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    let res = await result.json();
    console.log(res);
    console.log("Post Updated", res.message);
    navigate("/create");
  };

  // data ko fetch karna kai liye
  useEffect(() => {
    const fetchPost = async () => {
      try {
        let res = await fetch(`http://localhost:5000/${id}`, {
          headers: {
            authorization: `bearer ${token}`,
          },
        });
        let data = await res.json();
        //yaha data set hoga
        setTitle(data.post.title);
        setContent(data.post.content);
        setAuthor(data.post.author);
        setStatus(data.post.status);
        // image bhi set hoga
        setOldImage(data.post.image);
        console.log("data fetched", data);
      } catch (error) {
        console.log("Error fetching post", error);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <>
      <div className="py-5">
        <div className="container">
          <h1>Update Post</h1>
          <div>
            <form onSubmit={handleUpdate}>
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
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                {oldImage && (
                  <div className="mt-3 mb-3">
                    <p className="small">Current Image:</p>
                    <img
                      src={`http://localhost:5000/upload/${oldImage}`}
                      alt="old"
                      width="150"
                      className="shadow-sm"
                    />
                  </div>
                )}
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
                Update Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

export default function SinglePostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [displayComment, SetDisplayComment] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  //   comment post ka integration
  const handlesubmitcomment = async (e) => {
    try {
      e.preventDefault();
      const userData = JSON.parse(localStorage.getItem("user"));
      let result = await fetch(`http://localhost:5000/api/comment/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: userData.name,
          text: comment,
        }),
      });
      result = await result.json();
      console.log(result);
      setComment("");
    } catch (error) {
      console.log("Error while submitting the comment", error);
    }
  };

  //   like count button ka integration
  const handleLike = async () => {
    const userData = JSON.parse(localStorage.getItem("user"));

    let res = await fetch(`http://localhost:5000/api/like/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userData.name,
      }),
    });

    let data = await res.json();
    console.log(data);
    if (data.message === "Post liked successfully") {
      setLikeCount((prev) => prev + 1);
      setLiked(true);
    } else {
      setLikeCount((prev) => prev - 1);
      setLiked(false);
    }
  };

  //   fetch comment ki api
  useEffect(() => {
    const fetchcomment = async () => {
      let result = await fetch(`http://localhost:5000/api/get-comment/${id}`);
      const data = await result.json();
      console.log("fetching the comment for the post", data);
      SetDisplayComment(data.comments);
    };
    fetchcomment();
  }, [id]);

  //   get all post ka data hai ye
  useEffect(() => {
    const fetchpost = async () => {
      try {
        let result = await fetch(`http://localhost:5000/${id}`);
        const data = await result.json();
        console.log(data);
        setTimeout(() => {
          setPost(data.post);
        }, 2000);
      } catch (error) {
        console.log("Error while fetching the post", error);
      }
    };

    fetchpost();
  }, [id]);

  //   like count ffetch
  useEffect(() => {
    const fetchLikes = async () => {
      let res = await fetch(`http://localhost:5000/api/count/${id}`);
      let data = await res.json();
      console.log("Total count", data.count);
      setLikeCount(data.count);
    };
    fetchLikes();
  }, [id]);

  if (!post) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className="container py-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-8">
          <div className="shadow p-3 rounded">
            <img
              src={
                post.image
                  ? `http://localhost:5000/upload/${post.image}`
                  : "https://via.placeholder.com/800x400"
              }
              style={{ width: "100%", height: "400px", objectFit: "cover" }}
              alt="post"
            />
            <h2 className="mt-3">{post.title}</h2>
            <div className="d-flex align-items-center justify-content-start gap-3">
              <p className="text-muted mb-2">
                By <strong>{post.author}</strong> •{" "}
                {moment(post.updatedAt).format("DD MMM YYYY")}
              </p>
              <i
                className={`bi ${liked ? "bi-heart-fill text-danger" : "bi-heart"}`}
                onClick={handleLike}
                style={{ cursor: "pointer", fontSize: "20px" }}
              ></i>
              <span className="ms-2">{likeCount}</span>
            </div>
            <p>{post.content}</p>
            <hr />
            {displayComment.map((c, index) => (
              <div key={index} className="bg-light p-3 rounded mb-2">
                <strong>{c.user}</strong>
                <p className="mb-0">{c.text}</p>
              </div>
            ))}
            <div className="mt-3">
              <textarea
                className="form-control mb-2"
                placeholder="Write a comment..."
                rows="3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <button className="btn btn-primary" onClick={handlesubmitcomment}>
                Add Comment
              </button>
            </div>
          </div>
        </div>
        {/* <div className="col-md-4">asd</div> */}
      </div>
    </div>
  );
}

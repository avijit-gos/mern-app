import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Post() {
  const [posts, setPosts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:3010/post/${localStorage.getItem("postId")}`)
      .then((res) => {
        console.log(res.data.result);
        setPosts(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const backToPage = () => {
    history.push("/home");
  };
  return (
    <div>
      <img src={posts.photo} alt="image" className="image1" />
      <p className="post_text">Company Name: {posts.company_name}</p>
      <p className="post_text">Address: {posts.address}</p>
      <p className="post_text">
        Country: {posts.country}, City: {posts.city}
      </p>
      <p className="post_text">{posts.description}</p>
      <button className="signup" onClick={backToPage}>
        Back
      </button>
    </div>
  );
}

export default Post;

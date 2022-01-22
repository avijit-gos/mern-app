/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import Post from "./Post";
import axios from "axios";
import { useHistory } from "react-router-dom";

function HomeResult() {
  const [posts, setPosts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:3010/${localStorage.getItem("userId")}`)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const clickCard = (id) => {
    localStorage.setItem("postId", id);
    history.push("/post");
  };

  return (
    <div className="post_container">
      <div>
        {(posts || []).length > 0 ? (
          <div className="card_box">
            {posts.map((post) => (
              <div
                className="card"
                key={[post._id]}
                onClick={() => clickCard(post._id)}
              >
                {<img src={post.photo} className="image" alt="image" />}
              </div>
            ))}
          </div>
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
}

export default HomeResult;

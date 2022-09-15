import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import "../CSS/Home.css";
import { Link } from "react-router-dom";
import { usercontext } from "../CONTEXT/Context";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Home = () => {
  let context4 = useContext(usercontext);
  const [count, setCount] = useState(0);
  const [flag3, setFlag3] = useState(false);

  const comment_fun = () => {
    context4.setCommentShow(!context4.commentshow);
  };
  const Like_fun = (index) => {
    if (context4.likeflag) {
      context4.post_data[index].likes++;
      context4.setLikeflag(!context4.likeflag);
    } else {
      context4.post_data[index].likes--;
      context4.setLikeflag(!context4.likeflag);
    }
  };
  const commentValue = (event, index) => {
    console.log("hello");
    if (event.key === "Enter") {
      let obj = {
        cmmnt_id: context4.post_data[index].comments.length + 1,
        user: context4.current_user,
        comment: event.target.value,
      };
      context4.post_data[index].comments.push(obj);
      context4.setPost_data(context4.post_data);
    } else {
      console.log("ooopss.....");
    }
    setCount(count + 1);
  };

  const showfriend = () => {
    setFlag3(!flag3);
  };
  const frnd = (name) =>{
  
      context4.post_data.forEach((val,index)=>{
        if(val.name === name){
           
          context4.post_data.splice(index,1);
        }
      })
      
      console.log( context4.post_data);


  
  }

  return (
    <>
      <Navbar />

      <div className="home">
      <div className="mute-unmute">
                <p>Do You want to mute Friends post ??click on the icon </p>
                <p><VisibilityIcon onClick={showfriend} /></p>
                
                {flag3 ? (
                  <>
                    {
                      context4.post_data.map((val,index)=>{
                        return(
                          <>
                            <p onClick={()=>{frnd(val.name)}}>
                            <VisibilityIcon/>
                              {
                               val.name
                              }
                            </p>
                          </>
                        )
                      })
                    }
                  </>
                ) : (
                  ""
                )}
              </div>
        {context4.post_data.map((val, index) => {
          return (
            <>
             
              <div className="card-1">
                <div className="post-heading">
                  <div>
                    {val.name === context4.current_user ? (
                      <>
                        <div>
                          <Link to="/Friends">
                            <img
                              src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
                              id="card-img"
                              alt="asdfa"
                            />
                          </Link>
                          <FiberManualRecordIcon sx={{ color: "green" }} />
                          <span color="green">Online</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <Link to="/Friends">
                            <img src={val.image} id="card-img" alt="asdfa" />
                          </Link>
                        </div>
                      </>
                    )}

                    <div>
                      <span style={{ fontSize: "30px", fontWeight: "bold" }}>
                        {val.name}
                      </span>
                      &emsp;
                      <span style={{ marginTop: "10px", fontSize: "20px" }}>
                        is With sonu and 17 others..
                      </span>
                    </div>
                  </div>
                  <div>
                    <MoreVertIcon />
                  </div>
                </div>

                <div className="content">
                  <pre className="cont">{val.post_content}</pre>
                </div>

                <div className="image-div">
                  <img src={val.image} alt="lsfa" id="img-1" />
                </div>

                <div className="like-comment">
                  <div>
                    {context4.likeflag ? (
                      <>
                        <FavoriteBorderIcon
                          onClick={() => {
                            Like_fun(index);
                          }}
                        />
                        <span>{val.likes} &emsp;Likes</span>
                      </>
                    ) : (
                      <>
                        <FavoriteIcon
                          onClick={() => {
                            Like_fun(index);
                          }}
                          sx={{ color: "red" }}
                        />
                        <span>{val.likes} &emsp;Likes</span>
                      </>
                    )}
                  </div>
                  <div>
                    <span>
                      <CommentIcon onClick={comment_fun} />
                    </span>

                    <span>{val.comments.length} &emsp;comments..</span>
                  </div>
                  <div>
                    <span>
                      <ShareIcon />
                    </span>
                    <span>Share </span>
                  </div>
                </div>
                {context4.commentshow ? (
                  <>
                    <div className="show-comment">
                      <div>
                        {val.comments.map((i) => {
                          return (
                            <>
                              <p
                                style={{
                                  backgroundColor: "rgb(199, 226, 226)",
                                  padding: "20px",
                                  color: "black",
                                }}
                              >
                                {i.user}/:&emsp;{i.comment}
                              </p>
                            </>
                          );
                        })}
                      </div>
                      <div>
                        <input
                          type="text"
                          id="comment-inp"
                          placeholder="Write a Comment !!"
                          onKeyPress={(event) => {
                            commentValue(event, index);
                          }}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  " "
                )}
              </div>
            </>
          );
        })}

        {/* ................... */}
      </div>
    </>
  );
};

export default Home;

import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { FireDb, auth } from "../Firebase/FirebaseConfig";
import { useSelector, useDispatch } from "react-redux";
import { setAllBlog, setLoading, updateLogin } from "../app/loginSlice";
import { store } from "../app/store";
import { Link } from "react-router-dom";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const MainPage = () => {
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.login);
  const searchkey = useSelector((state) => state.searchkey);
  const loading = useSelector((state) => state.loading);
  const getAllBlog = useSelector((state) => state.getAllBlog);

  const dispatch = useDispatch();
  const handleSignOut = () => {
    signOut(auth).then((val) => {
      console.log(val);
      dispatch(updateLogin());
      history("/");
    });
  };

  function getAllBlogs() {
    dispatch(setLoading(true));
    try {
      const q = query(collection(FireDb, "blogPost"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let blogArray = [];
        QuerySnapshot.forEach((doc) => {
          blogArray.push({ ...doc.data(), id: doc.id });
        });
        dispatch(setAllBlog(blogArray));
        // console.log(productsArray)
        dispatch(setLoading(false));
        console.log(getAllBlog);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h1>Sensitive Info</h1>
          <button onClick={handleSignOut}>Sign Out</button>
          <Link to="/user">
            <button>My Profile</button>
          </Link>
          <Link to="/createblog">
            <button className="bg-black text-white">Create New Blog</button>
          </Link>
          <ul>
            {getAllBlog.map((blog) => (
              <div key={blog.id}>
                <li key={blog.id}>
                  <img src={blog.thumbnail} alt="Blog Thumbnail" />
                </li>

                <li>Title : {blog.title}</li>
                <li>Description : {blog.description}</li>
                <li>BlogText : {blog.blogtext}</li>
              </div>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h1><Link to="/login">Login Agian</Link></h1>
        </>
      )}
    </div>
  );
};

export default MainPage;

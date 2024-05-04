import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FireDb, storage } from "../Firebase/FirebaseConfig";
import '../css/createblog.css'

const CreateBlog = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    thumbnail: "",
    title: "",
    description: "",
    blogtext: "",
    time: Timestamp.now(),
  });
  const [thumbnail, setThumbnail] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const addPost = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (
      blog.title === "" ||
      blog.description === "" ||
      blog.blogtext === "" ||
      !thumbnail
    ) {
      return alert("All fields are required");
    }

    uploadImage();
  };

  const uploadImage = () => {
    const imageRef = ref(storage, `blogimage/${thumbnail.name}`);
    uploadBytes(imageRef, thumbnail).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const productRef = collection(FireDb, "blogPost");
        try {
          addDoc(productRef, {
            thumbnail: url,
            title: blog.title,
            description: blog.description,
            blogtext: blog.blogtext,
            time: Timestamp.now(),
            date: new Date().toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }),
          });
          navigate("/mainpage");
          alert("Post Added Successfully");
        } catch (error) {
          console.error("Error adding document: ", error);
          alert("Failed to add post. Please try again later.");
        }
      });
    });
  };

  return (
    <div className="blogformcontainer">
      <form onSubmit={addPost}>
        <h1>Create New Blog</h1>
        <label className="flex flex-col ">
          <span className="text-white font-medium mb-4">Your Thumbnail</span>
          {thumbnail ? (
            <img
              className="thumbnail"
              src={URL.createObjectURL(thumbnail)}
              alt="thumbnail"
            />
          ) : (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files[0])}
              />
            </>
          )}
        </label>
        <label className="flex flex-col">
          <span className="text-white font-medium mb-4">Add Title</span>
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={handleChange}
            placeholder="Add your title.."
            className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-white font-medium mb-4">Add Description</span>
          <input
            type="text"
            name="description"
            value={blog.description}
            onChange={handleChange}
            placeholder="Add your description.."
            className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-white font-medium mb-4">Your Blog</span>
          <textarea
            rows="7"
            name="blogtext"
            value={blog.blogtext}
            onChange={handleChange}
            placeholder="What do you want to say?"
            className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
          />
        </label>
        <div className="btn-holder">
          <Link to="/">
            <button className="btn1">Cancel</button>
          </Link>
          <button className="btn1" type="submit">
            Add Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;

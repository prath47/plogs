import React, { useContext, useEffect, useState } from "react";
import HomePost from "../components/HomePost";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { URL } from "../url";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const { user } = useContext(UserContext)
  const [posts, setPosts] = useState([])
  const { search } = useLocation()
  const [noresult, setNoresult] = useState(false)
  const [loader, setLoader] = useState(false)
  const fetchPosts = async () => {
    setLoader(true)
    try {
      const res = await axios.get(URL + '/api/posts/' + search, { withCredentials: true })
      // console.log(res.data)
      if (res.data.length === 0) setNoresult(true)
      else setNoresult(false)
      setLoader(false)
      setPosts(res.data)
    } catch (error) {
      console.log(error)
      setLoader(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [search])
  return (
    <>
      <Navbar />

      <div className="px-8 md:px-[200px] min-h-80vh">
        {loader ? <div className="w-full h-[40vh] flex items-center justify-center"><Loader /></div> : !noresult ? posts.map((post) => (
          <div key={post._id}>
            <Link to={user ? `/posts/post/${post._id}` : '/login'}>
              <HomePost post={post} />
            </Link>
          </div>

        )) : <h1 className="w-full font-bold items-center flex justify-center">No Posts Found</h1>}
      </div>
      <Footer />
    </>
  );
};

export default Home;

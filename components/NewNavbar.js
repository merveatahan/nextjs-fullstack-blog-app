import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
import { motion } from "framer-motion";

import Link from "next/link";

function NewNavbar() {
  return (
    <div className="bg-gray-100 flex justify-between font-semibold">
      <div className="m-4 w-56">
        <h1>
          {" "}
          <a href="/">LOGO</a>{" "}
        </h1>
      </div>

      <div className="m-4">
        <ul className="flex justify-center ">
          <li className="mx-6">
            <a href="/"> Home </a>
          </li>
          <li className="mx-6">
            <a href="/NewBlogs">Blog</a>
          </li>
          <li className="mx-6">
            <a href="/NewCategories">Categories</a>
          </li>
        </ul>
      </div>
      <div className="flex items-center ">
        <div className="flex items-center ">
          <motion.div whileHover={{ scale: 1.04 }}>
            <AccountCircleIcon className="me-1 " />{" "}
            <a href="/NewLogIn">Log In</a>
          </motion.div>
          <span className="mx-2"> |</span>
          <motion.div whileHover={{ scale: 1.04 }}>
            <a href="/NewRegister">Register</a>
          </motion.div>
        </div>

        <motion.div whileHover={{ translateY: -1.2 }}>
          <InstagramIcon className="ml-6" />
        </motion.div>
        <motion.div whileHover={{ translateY: -1.2 }}>
          <YouTubeIcon className="ml-3" />
        </motion.div>
        <motion.div whileHover={{ translateY: -1.2 }}>
          <FacebookSharpIcon className="ml-3 me-3" />
        </motion.div>
      </div>
    </div>
  );
}

export default NewNavbar;

import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import DUMMY_DATA from "../../assets/dummy_data.json";
import Image from "next/image";

const UserId = () => {
  const { id } = useRouter().query;
  // perform task to get user details
  const [userData, setUserData] = useState({});
  useEffect(() => {
    console.log(DUMMY_DATA[0]);
    setUserData(DUMMY_DATA[0]);
  }, []);

  return (
    <div>
      {userData.id ? (
        <>
          <Image
            src={userData?.background_image}
            alt=""
            height={600}
            width={1800}
          />
          <Image width={200} height={200} src={userData?.imgUrl} alt="" />
          <h2>{userData.name}</h2>
          <h2>{userData.username}</h2>
          <p>{userData.email}</p>
          <p>{userData.bio}</p>
          <p>followers {userData.followers.length}</p>
          <p>following {userData.following.length}</p>
          <p>appreciations {userData.appreciations.length}</p>
          <p>Joined at {userData.joined_at}</p>
          <ul>
            Tags
            {userData.tags.map((tagName) => (
              <li key={tagName}>{tagName}</li>
            ))}
          </ul>
          <ul>
            Tech Stack
            {userData.tech_stack.map((stack) => (
              <li key={stack}>{stack}</li>
            ))}
          </ul>
          <h2>My Blogs</h2>
          {userData.blogs.map((blog) => (
            <Card key={blog.id}>
              <Image src={blog.cover_photo} width={200} height={200} alt="" />
              <h3>{blog.title}</h3>
              <p>{blog.subtitle}</p>
              <p>{blog.story}</p>
            </Card>
          ))}
        </>
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
};

export default UserId;

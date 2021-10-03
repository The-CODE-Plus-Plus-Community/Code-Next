import Link from "next/link";
import Image from "next/image";
import DUMMY_DATA from "../assets/dummy_data.json";
import { useEffect, useState } from "react";
import Card from "../components/Card";

export default function Home() {
  const [data, setData] = useState({});
  useEffect(() => {
    console.log(DUMMY_DATA[0]);
    setData(DUMMY_DATA[0]);
  }, []);
  return (
    <div>
      <h1>
        Code-NEXT | Welcome,{" "}
        <Link href={`/users/${data?.id}`} passHref={true}>
          <span style={{ color: "red" }}>{data?.name}</span>
        </Link>
      </h1>
      <button>Your drafts</button>
      <Link href="/write_article">Write an article</Link>
      <h2>Trending Articles</h2>
      {data?.blogs?.map((blog) => (
        <Card key={blog.id}>
          <Image src={blog.cover_photo} width={200} height={200} alt="" />
          <Link href={`/blogs/${blog.id}`} passHref={true}>
            <h3>{blog.title} - click me to watch full content</h3>
          </Link>
          <p>{blog.subtitle}</p>
          <p>{blog.story}</p>
        </Card>
      ))}
    </div>
  );
}

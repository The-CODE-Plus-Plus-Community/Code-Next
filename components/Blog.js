import React from "react";
import Link from "next/link";

const Blog = ({ res }) => {
  return (
    <div key={res.id}>
      <p>Created at:{new Date(res.created_time).toLocaleString()}</p>
      <p>Updated at:{new Date(res.last_edited_time).toLocaleString()}</p>
      TITLE:{" "}
      <Link passHref={true} href={`/blogs/${res.id}`}>
        {res.properties.Title.title[0].plain_text}
      </Link>
      <p>AUTHOR NAME: {res.properties.Author?.rich_text[0]?.plain_text}</p>
      <p>CONTENT: {res.properties.Content?.rich_text[0]?.plain_text}</p>
      TAGS:{" "}
      <ul>
        {res.properties.Tags.multi_select.map((t) => (
          <li key={t.id} style={{ color: t.color }}>
            {t.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;

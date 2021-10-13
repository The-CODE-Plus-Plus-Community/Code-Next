import React from "react";
import Blog from "../../components/Blog";

const BlogById = ({ response }) => {
  return <Blog res={response} />;
};

export default BlogById;

export async function getServerSideProps(context) {
  const { Client } = require("@notionhq/client");
  const { id } = context.query;

  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const response = await notion.pages.retrieve({
    page_id: id,
  });

  return {
    props: { response },
  };
}

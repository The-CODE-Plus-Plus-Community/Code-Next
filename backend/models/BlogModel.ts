export type Comments = {
  id: string;
  user_id: string;
  text: string;
}

export interface Blog {
  id: string;
  user_id: string;
  title: string;
  imgUrl: string;
  content: string;
  comments: Comments[];
  likes: string[];
}

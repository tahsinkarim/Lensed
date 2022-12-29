export interface ImageType {
  caption: string;
  comments: {
    userId: string;
    comment: string;
    date: Date;
  }[];
  date: Date;
  image: string;
  likes: {
    userId: string;
    date: Date;
  }[];
  postedBy: {
    email: string;
    img: string;
    name: string;
  };
  _id: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  date?: Date;
}

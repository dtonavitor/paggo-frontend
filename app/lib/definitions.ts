export type User = {
  id: string;
  email: string;
  password: string;
};

export type Ocr = {
  id: string;
  userId: string;
  image: string;
  text: string;
  createdAt: string;
}
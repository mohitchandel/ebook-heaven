export type Ebook = {
  title: string;
  id: string;
  description: string;
  author_id: string;
  author_name: string;
  ebook_file: string;
  thumbnail: string;
  uploadet_at: string | null;
};

export type ProfileType = {
  name: string;
  type: string;
  id: string;
  user_id: string;
};

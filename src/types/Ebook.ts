/**
 * The type `Ebook` represents the structure of an ebook object with specific properties such as title,
 * id, description, author details, file paths, and upload date.
 */
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

/**
 * The ProfileType type in TypeScript defines the structure of a profile with name, type, id, and user_id properties.
 */
export type ProfileType = {
  name: string;
  type: string;
  id: string;
  user_id: string;
};

export interface Item {
  comments: string | null;
  content: string;
  created_at: string;
  id: string;
  img_urls: string[];
  prompt: string;
  tags: string;
  title: string;
  updated_at: string;
  tag: string;
  nickname: string;
  avatar: string;
  starCount: number;
  favorite: boolean;
  reGenerated: boolean;
}

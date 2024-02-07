export interface newsType {
  _id: string;
  title: string;
  article_text: string;
  created_at: string;
  main_image: string;
  publish_date: string;
  author: string;
  tag: string[];
  // short_description?: string;
}

export interface detailNewsType {
  _id: string;
  title: string;
  article_text: string;
  created_at: string;
  main_image: string;
  publish_date: string;
  author: string;
  tag: string[];
  // scraped_at: string;
  // publisher: string;
}

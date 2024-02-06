export interface newsType {
  _id: string;
  title: string;
  description: string;
  created_at: string;
  header_image: string;
  published_at: string;
  author: string;
  short_description?: string;
}

export interface detailNewsType {
  _id: string;
  title: string;
  keywords: string[];
  description: string;
  header_image: string;
  scraped_at: string;
  author: string;
  publisher: string;
}

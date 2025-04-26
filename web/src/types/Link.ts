export type LinkData = {
  originalUrl: string;
  shortUrl: string;
};

export type Link = {
  id: string;
  originalUrl: string;
  shortUrl: string;
  accessNumber: number;
  createdAt: Date;
};

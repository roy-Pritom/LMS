export type TCourse = {
  name: string;
  description?: string;
  price: number;
  rating: number;
  lectures: number;
  timeDuration: number;
  discountPrice: number;
  language: string;
  article: number;
  resources: number;
  topics: string[];
};

export type TCourseFilterRequest = {
  searchTerm?: string | undefined;
  name?: string | undefined;
};

import { static_data } from "@data";

export interface InputFilterProps {
    setFilteredNews: React.Dispatch<
      React.SetStateAction<[] | static_data.news_init_type.NewsInitType>
    >;
  }
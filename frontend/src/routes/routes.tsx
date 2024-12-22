import NewsDetail from "@pages/news-datail[news-id]";
import Layout from "@layout/layout";
import BuySellDigitalCurrency from "@pages/buy-sell-digital-currency";
import ContactUsPage from "@pages/contact-us";
import HomePage from "@pages/home";
import LearningArticlesPage from "@pages/learning-articles";
import NewsPage from "@pages/news";
import OnlinePricesPage from "@pages/online-prices";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/news",
        element: <NewsPage />,
      },
      {
        path: "/learning-articles",
        element: <LearningArticlesPage />,
      },
      {
        path: "/online-prices",
        element: <OnlinePricesPage />,
      },
      {
        path: "/contact-us",
        element: <ContactUsPage />,
      },
      {
        path: "/buy-sell/digital-currency",
        element: <BuySellDigitalCurrency />,
      },
      {
        path: "/news/detail/:id",
        element: <NewsDetail />,
      },
    ],
  },
]);

import { createBrowserRouter } from "react-router";
import DetailPage from "./DetailPage";
import LandingPage from "./LandingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, Component: LandingPage },
      { path: "ai-audit/report", Component: DetailPage },
      { path: "*", Component: DetailPage },
    ],
  },
]);

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Accordion from "../components/common/accordion/index";

test("demo", () => {
  expect(true).toBe(true);
});

test("Renders the main page", () => {
  const props = {
    content: "content Accordion",
    title: "title",
  };
  render(<Accordion title={props.title} content={props.content} />);
  expect(true).toBeTruthy();
  expect(screen.getByText(props.content)).toBeInTheDocument();
});

import { test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("<App />", () => {
  test("should render app", async () => {
    render(<App />);
    expect(
      await screen.findByRole("heading", { name: "Todo-App" })
    ).toBeInTheDocument();
  });
});

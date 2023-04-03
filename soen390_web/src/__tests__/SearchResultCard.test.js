import React from "react";
import { render, screen } from "@testing-library/react";
import SearchResultCard from "../components/SearchResultCard";
import { MemoryRouter as Router } from "react-router-dom";

describe("SearchResultCard", () => {
  const data = {
    imageUrl: "https://example.com/profile.jpg",
    name: "John Doe",
    workPosition: "Software Engineer",
    address: "123 Main St, Anytown USA",
    connections: "500+",
  };

  test("renders user data", () => {
    render(<Router><SearchResultCard data={data} /></Router>);

    // Check that all data fields are displayed
    expect(screen.getByText(data.name)).toBeInTheDocument();
    expect(
      screen.getByText(`Work Position: ${data.workPosition}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Address: ${data.address}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Connections (like LinkedIn): ${data.connections}`)
    ).toBeInTheDocument();

    // Check that the avatar image is displayed and has the correct src attribute
    const avatarImg = screen.getByRole("img", { name: "Profile Picture" });
    expect(avatarImg).toBeInTheDocument();
    expect(avatarImg).toHaveAttribute("src", data.imageUrl);

    // Check that the "Connect" and "View Profile" buttons are displayed
    expect(screen.getByRole("button", { name: "Connect" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "View Profile" })
    ).toBeInTheDocument();
  });

  test("renders default props if data is not provided", () => {
    render(<Router><SearchResultCard /></Router>);

    // Check that default prop values are displayed
    expect(screen.getByText("")).toBeInTheDocument(); // no name
    expect(screen.getByText("Work Position: ")).toBeInTheDocument();
    expect(screen.getByText("Address: ")).toBeInTheDocument();
    expect(
      screen.getByText("Connections (like LinkedIn): ")
    ).toBeInTheDocument();

    // Check that the avatar image is displayed but has no src attribute
    const avatarImg = screen.getByRole("img", { name: "Profile Picture" });
    expect(avatarImg).toBeInTheDocument();
    expect(avatarImg).not.toHaveAttribute("src");

    // Check that the "Connect" and "View Profile" buttons are displayed
    expect(screen.getByRole("button", { name: "Connect" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "View Profile" })
    ).toBeInTheDocument();
  });
});

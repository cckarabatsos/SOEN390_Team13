import { render, screen, fireEvent } from "@testing-library/react";
import UserSearchComponent from "../components/UserSearchComponent";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("UserSearchComponent", () => {
  const user = {
    id: 1,
    image: "https://example.com/logo.png",
    name: "John Smith",
    position: "Software Developer",
    company: "Acme Corp",
    contact: ["user1", "user2"],
  };

  it("renders the user's information", () => {
    render(<UserSearchComponent {...user} />);

    expect(screen.getByAltText("logo")).toBeInTheDocument();
    expect(screen.getByText(user.name)).toBeInTheDocument();
    expect(screen.getByText(user.position)).toBeInTheDocument();
    expect(screen.getByText(user.company)).toBeInTheDocument();
    expect(screen.getByText(`${user.contact.length} Followers`)).toBeInTheDocument();
  });

  it("renders the 'More Info' and 'Message' buttons", () => {
    render(<UserSearchComponent {...user} />);

    const buttons = screen.getAllByRole("button");

    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent("MoreInfoText");
    expect(buttons[1]).toHaveTextContent("Message");
  });

  it("navigates to the user profile page when the 'More Info' button is clicked", () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    render(<UserSearchComponent {...user} />);

    fireEvent.click(screen.getByText("MoreInfoText"));

    expect(navigate).toHaveBeenCalledWith(`/UserProfile/${user.id}`);
  });

  it("navigates to the messages page when the 'Message' button is clicked", () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    render(<UserSearchComponent {...user} />);

    fireEvent.click(screen.getByText("Message"));

    expect(navigate).toHaveBeenCalledWith(`/Messages/${user.id}`);
  });
});
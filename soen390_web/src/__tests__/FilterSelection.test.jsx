import { render, fireEvent } from "@testing-library/react";
import FilterSelection from "../components/FilterSelection.jsx";

describe("FilterSelection component", () => {
  it("renders without crashing", () => {
    render(<FilterSelection />);
  });

  it("contains two radio buttons", () => {
    const { getByLabelText } = render(<FilterSelection />);
    expect(getByLabelText("NameText")).toBeInTheDocument();
    expect(getByLabelText("ByEmailText")).toBeInTheDocument();
  });

  it("triggers the onChange event when a radio button is selected", () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <FilterSelection onRadioChange={handleChange} />
    );

    fireEvent.click(getByLabelText("ByEmailText"));

    expect(handleChange).toHaveBeenCalled();
  });

  it("calls the onRadioChange callback function with the correct value", () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <FilterSelection onRadioChange={handleChange} />
    );

    fireEvent.click(getByLabelText("ByEmailText"));

    expect(handleChange).toHaveBeenCalledWith("email");
  });

  it("translates the labels correctly", () => {
    const { getByLabelText } = render(<FilterSelection />);

    expect(getByLabelText("NameText")).not.toHaveTextContent("Name");
    expect(getByLabelText("ByEmailText")).not.toHaveTextContent("Email");
  });
});
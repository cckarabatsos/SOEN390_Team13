import { render } from '@testing-library/react';
import CompanyEditDescriptionModal from '../components/CompanyEditDescriptionModal.jsx';
import { fireEvent} from '@testing-library/react';



test('renders company edit description modal', () => {
  const { getByText } = render(<CompanyEditDescriptionModal />);
  const linkElement = getByText(/Edit Company description/i);
  expect(linkElement).toBeInTheDocument();
});

test('text input changes value', () => {
    const { getByLabelText } = render(<CompanyEditDescriptionModal />);
    const input = getByLabelText(/Company Description/i);
    fireEvent.change(input, { target: { value: 'New company description' } });
    expect(input.value).toBe('New company description');
  });

  test('clicking save button calls handleDescOnClick', () => {
    const mockHandleDescOnClick = jest.fn();
    const { getByText } = render(<CompanyEditDescriptionModal handleDescOnClick={mockHandleDescOnClick} />);
    const button = getByText(/Save Description/i);
    fireEvent.click(button);
    expect(mockHandleDescOnClick).not.toHaveBeenCalled();
  });

  test('updateUserDescription is called with the correct arguments', async () => {
    const mockUpdateUserDescription = jest.fn();
    const { getByText, getByLabelText } = render(<CompanyEditDescriptionModal updateUserDescription={mockUpdateUserDescription} />);
    const button = getByText(/Save Description/i);
    const input = getByLabelText(/Company Description/i);
    fireEvent.change(input, { target: { value: 'New company description' } });
    fireEvent.click(button);
    expect(mockUpdateUserDescription).toHaveBeenCalledWith(props.userData, 'New company description');
  });
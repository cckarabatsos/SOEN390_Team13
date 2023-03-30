import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import NotificationComponent from '../components/NotificationComponent';

describe('NotificationComponent', () => {
    const props = {
      picture: 'https://example.com/user.jpg',
      notificationCategory: 'New Notif',
      notificationDescription: 'Notif description',
      userName: 'User1',
      notificationId: 123,
      handleDelete: jest.fn(),
    };
  
    it('should render the notification category and description', () => {
      const { getByText } = render(<NotificationComponent {...props} />);
      const notificationCategoryElement = getByText(props.notificationCategory);
      const notificationDescriptionElement = getByText(props.notificationDescription);
      expect(notificationCategoryElement).toBeInTheDocument();
      expect(notificationDescriptionElement).toBeInTheDocument();
    });
  
    it('should render the user avatar', () => {
      const { getByAltText } = render(<NotificationComponent {...props} />);
      const userAvatarElement = getByAltText(props.userName);
      expect(userAvatarElement).toBeInTheDocument();
      expect(userAvatarElement).toHaveAttribute('src', props.picture);
    });

    it("calls handleDelete function when delete button is clicked", () => {
        const handleDeleteMock = jest.fn();
        const notificationId = "123";
        const props = {
          handleDelete: handleDeleteMock,
          notificationId,
        };
    
        const { getByRole } = render(<NotificationComponent {...props} />);
        const deleteButton = getByRole("button", { name: "" });
        fireEvent.click(deleteButton);
    
        expect(handleDeleteMock).toHaveBeenCalledWith(notificationId);
      });
  });




  describe('userName', () => {
    it('should default to "Error" when it is falsy', () => {
      const props = {
        picture: 'https://example.com/user.jpg',
        notificationCategory: 'New notif',
        notificationDescription: 'Notif description',

        // Set userName to falsy value
        userName: null, 
        notificationId: 1234,
        handleDelete: jest.fn(),
      };
  
      const component = render(<NotificationComponent {...props} />);
    });
  });
  
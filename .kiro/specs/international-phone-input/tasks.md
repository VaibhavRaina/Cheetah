# Implementation Plan

- [x] 1. Create country data service and utilities






  - Create a comprehensive country dataset with dial codes, formatting rules, and flags
  - Implement utility functions for country lookup, phone number formatting, and validation
  - Add TypeScript interfaces for Country and phone number related types
  - _Requirements: 1.3, 2.3, 4.1, 4.2_

- [ ] 2. Build core PhoneInput component structure
  - Create the main PhoneInput component with proper TypeScript interfaces
  - Implement basic state management for selected country and phone number
  - Set up component props interface and default values
  - Add basic rendering structure without functionality
  - _Requirements: 1.1, 1.5_

- [ ] 3. Implement CountrySelector dropdown component
  - Create searchable country dropdown using Radix UI Select as base
  - Add country search functionality with real-time filtering
  - Implement country list rendering with flags and names
  - Add keyboard navigation and accessibility features
  - _Requirements: 1.2, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3_

- [ ] 4. Build phone number input with formatting
  - Create formatted phone input field that only accepts the local number portion
  - Implement real-time phone number formatting based on selected country
  - Add input masking to guide user input according to country format
  - Ensure country code prefix is displayed but not editable by user
  - _Requirements: 1.4, 1.5_

- [ ] 5. Add phone number validation system
  - Implement validation logic for different country phone number formats
  - Add real-time validation feedback with appropriate error messages
  - Create validation that triggers when country changes or number is entered
  - Add form submission validation to prevent invalid numbers
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 6. Implement country preference persistence
  - Add local storage functionality to remember user's country selection
  - Implement country detection based on user locale/timezone as fallback
  - Add logic to restore previously selected country when component loads
  - Set up fallback to default country when detection fails
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 7. Integrate PhoneInput component into contact-sales form
  - Replace the existing basic phone input in contact-sales form with new PhoneInput component
  - Update form validation to work with the new phone input format
  - Ensure the complete international phone number is properly submitted to the backend
  - Test form submission with various country selections and phone numbers
  - _Requirements: 1.1, 1.5, 4.5_

- [ ] 8. Add comprehensive error handling and user feedback
  - Implement error display for various validation scenarios (invalid format, wrong length, etc.)
  - Add visual indicators (red borders, error icons) for invalid states
  - Create helpful error messages with format examples for each country
  - Add graceful fallbacks for flag loading failures and country detection issues
  - _Requirements: 4.2, 4.3_

- [ ] 9. Write unit tests for all components
  - Create unit tests for country data service and utility functions
  - Write tests for PhoneInput component rendering and state management
  - Add tests for CountrySelector search and selection functionality
  - Test phone number formatting and validation logic for multiple countries
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 4.1, 4.2_

- [ ] 10. Add integration tests and accessibility improvements
  - Write integration tests for the component within the contact-sales form
  - Test complete user workflows from country selection to form submission
  - Add ARIA labels and keyboard navigation support for accessibility
  - Test component behavior on mobile devices and various screen sizes
  - _Requirements: 1.1, 1.2, 1.5, 3.4_
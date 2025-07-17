# Design Document

## Overview

The International Phone Input feature will replace the basic phone input field in the contact-sales form with a sophisticated, user-friendly component that combines country selection with phone number input. The component will be built as a reusable React component that integrates seamlessly with the existing design system and can be used across multiple forms in the application.

The solution will leverage the existing Radix UI components (Select, Input) and extend them with custom functionality for country selection, phone number formatting, and validation. The component will maintain consistency with the current design language while providing enhanced functionality.

## Architecture

### Component Structure

```
PhoneInput (Main Component)
├── CountrySelector (Dropdown with search)
│   ├── CountrySearch (Search input)
│   ├── CountryList (Scrollable list)
│   └── CountryItem (Individual country option)
├── PhoneNumberInput (Formatted input field)
└── ValidationDisplay (Error messages)
```

### Data Flow

1. **Initialization**: Component loads with default country (detected or stored)
2. **Country Selection**: User selects country → Updates country code → Re-validates phone number
3. **Phone Input**: User types number → Real-time formatting → Validation
4. **Form Submission**: Component returns complete international phone number

### State Management

The component will use React's built-in state management with the following state structure:

```typescript
interface PhoneInputState {
  selectedCountry: Country | null;
  phoneNumber: string;
  formattedNumber: string;
  isValid: boolean;
  error: string | null;
  isDropdownOpen: boolean;
  searchQuery: string;
}
```

## Components and Interfaces

### Core Interfaces

```typescript
interface Country {
  code: string;           // ISO 2-letter code (e.g., "US", "GB")
  name: string;          // Full country name
  dialCode: string;      // Phone code (e.g., "+1", "+44")
  flag: string;          // Flag emoji or URL
  format: string;        // Phone number format pattern
  priority?: number;     // For sorting popular countries
}

interface PhoneInputProps {
  value?: string;                    // Current phone number value
  onChange?: (value: string) => void; // Callback when value changes
  onValidationChange?: (isValid: boolean) => void; // Validation status
  defaultCountry?: string;           // Default country code
  disabled?: boolean;                // Disabled state
  placeholder?: string;              // Placeholder text
  className?: string;                // Additional CSS classes
  required?: boolean;                // Required field indicator
}

interface ValidationResult {
  isValid: boolean;
  error?: string;
  formattedNumber?: string;
}
```

### PhoneInput Component

The main component that orchestrates the country selection and phone number input:

- **Responsibilities**: State management, validation coordination, event handling
- **Rendering**: Combines CountrySelector and PhoneNumberInput in a unified interface
- **Integration**: Exposes standard form input interface for easy integration

### CountrySelector Component

A searchable dropdown for country selection:

- **Base**: Built on Radix UI Select with custom content
- **Features**: Search functionality, flag display, keyboard navigation
- **Data**: Uses a comprehensive country dataset with dial codes and formatting rules
- **Performance**: Virtualized list for handling large country datasets

### PhoneNumberInput Component

A formatted input field for phone number entry:

- **Base**: Enhanced version of the existing Input component
- **Features**: Real-time formatting, input masking, validation feedback
- **Behavior**: Only accepts numeric input, formats according to country rules

### Country Data Service

A service module that provides country information and utilities:

- **Data Source**: Static JSON file with comprehensive country information
- **Functions**: Country lookup, format validation, number formatting
- **Caching**: Efficient data access with memoization

## Data Models

### Country Dataset

The component will use a curated dataset of countries with the following structure:

```typescript
const COUNTRIES: Country[] = [
  {
    code: "US",
    name: "United States",
    dialCode: "+1",
    flag: "🇺🇸",
    format: "(###) ###-####",
    priority: 1
  },
  {
    code: "GB",
    name: "United Kingdom", 
    dialCode: "+44",
    flag: "🇬🇧",
    format: "#### ### ####",
    priority: 2
  },
  // ... more countries
];
```

### Phone Number Formatting

Each country will have associated formatting rules:

- **Pattern**: Regex pattern for validation
- **Format**: Display format with placeholders
- **Length**: Expected number length ranges
- **Examples**: Sample valid numbers for user guidance

### Local Storage Schema

For remembering user preferences:

```typescript
interface PhoneInputPreferences {
  lastSelectedCountry: string;  // Country code
  timestamp: number;            // When preference was saved
}
```

## Error Handling

### Validation Errors

The component will handle various validation scenarios:

1. **Invalid Format**: Number doesn't match country's expected format
2. **Too Short/Long**: Number length outside acceptable range
3. **Invalid Characters**: Non-numeric characters in phone number
4. **Missing Country**: No country selected when required

### Error Display

- **Inline Errors**: Show validation messages below the input field
- **Visual Indicators**: Red border and error icon for invalid states
- **Helpful Messages**: Specific guidance on expected format with examples

### Graceful Degradation

- **Flag Loading**: Fallback to country code if flag emoji/image fails
- **Country Detection**: Default to US if geolocation/detection fails
- **Validation**: Basic format checking if advanced validation fails

## Testing Strategy

### Unit Tests

1. **Component Rendering**: Verify component renders correctly with various props
2. **Country Selection**: Test country dropdown functionality and search
3. **Phone Formatting**: Validate number formatting for different countries
4. **Validation Logic**: Test validation rules for various phone number formats
5. **State Management**: Verify state updates and event handling

### Integration Tests

1. **Form Integration**: Test component within the contact-sales form
2. **API Integration**: Verify formatted phone numbers are sent correctly
3. **Persistence**: Test country preference saving and loading
4. **Accessibility**: Verify keyboard navigation and screen reader support

### User Experience Tests

1. **Country Search**: Test search functionality with various queries
2. **Phone Input**: Test real-time formatting and validation feedback
3. **Error Handling**: Verify error messages are clear and helpful
4. **Mobile Experience**: Test component on various screen sizes

### Performance Tests

1. **Large Dataset**: Test performance with full country list
2. **Search Performance**: Verify search responsiveness with large datasets
3. **Memory Usage**: Monitor component memory footprint
4. **Render Performance**: Test re-render efficiency during user interaction

## Implementation Considerations

### Accessibility

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support for dropdown and input
- **Focus Management**: Logical focus flow between components
- **High Contrast**: Ensure visibility in high contrast modes

### Performance Optimization

- **Lazy Loading**: Load country data only when needed
- **Memoization**: Cache formatted numbers and validation results
- **Debouncing**: Debounce search input to reduce re-renders
- **Virtual Scrolling**: Handle large country lists efficiently

### Browser Compatibility

- **Modern Browsers**: Full support for Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: Optimized for mobile Safari and Chrome
- **Fallbacks**: Graceful degradation for older browsers
- **Input Types**: Use appropriate input types for mobile keyboards

### Internationalization

- **Country Names**: Support for localized country names
- **RTL Support**: Right-to-left language compatibility
- **Number Formats**: Respect local number formatting preferences
- **Error Messages**: Localizable error message system
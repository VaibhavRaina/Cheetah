"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib";
import { Input } from "./input";
import { Button } from "./button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Country, COUNTRIES, getSortedCountries, getDefaultCountry, searchCountries } from "@/constants/countries";

interface PhoneInputProps {
    value?: string;
    onChange?: (value: string) => void;
    onValidationChange?: (isValid: boolean) => void;
    defaultCountry?: string;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
    required?: boolean;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
    ({
        value = "",
        onChange,
        onValidationChange,
        defaultCountry,
        disabled = false,
        placeholder = "Enter phone number",
        className,
        required = false,
        ...props
    }, ref) => {
        const [selectedCountry, setSelectedCountry] = useState<Country>(getDefaultCountry());
        const [phoneNumber, setPhoneNumber] = useState("");
        const [isOpen, setIsOpen] = useState(false);
        const [searchQuery, setSearchQuery] = useState("");
        const [isValid, setIsValid] = useState(true);
        const inputRef = useRef<HTMLInputElement>(null);

        // Initialize component
        useEffect(() => {
            // Set default country if provided
            if (defaultCountry) {
                const country = COUNTRIES.find(c => c.code === defaultCountry);
                if (country) {
                    setSelectedCountry(country);
                }
            } else {
                // Try to get from localStorage
                const savedCountry = localStorage.getItem('phoneInput_selectedCountry');
                if (savedCountry) {
                    const country = COUNTRIES.find(c => c.code === savedCountry);
                    if (country) {
                        setSelectedCountry(country);
                    }
                }
            }
        }, [defaultCountry]);

        // Parse initial value
        useEffect(() => {
            if (value && value !== `${selectedCountry.dialCode}${phoneNumber}`) {
                // Try to parse the value
                const country = COUNTRIES.find(c => value.startsWith(c.dialCode));
                if (country) {
                    setSelectedCountry(country);
                    setPhoneNumber(value.substring(country.dialCode.length));
                } else {
                    setPhoneNumber(value);
                }
            }
        }, [value]);

        // Update parent when values change
        useEffect(() => {
            const fullNumber = phoneNumber ? `${selectedCountry.dialCode}${phoneNumber}` : "";

            // Debug: Log the phone number being generated
            console.log('PhoneInput Debug:', {
                phoneNumber,
                selectedCountry: selectedCountry.dialCode,
                fullNumber,
                currentValue: value
            });

            if (onChange && fullNumber !== value) {
                onChange(fullNumber);
            }

            // Basic validation - just check if number exists when required
            const valid = !required || phoneNumber.length > 0;
            setIsValid(valid);
            if (onValidationChange) {
                onValidationChange(valid);
            }
        }, [selectedCountry, phoneNumber, onChange, onValidationChange, required, value]);

        const handleCountrySelect = (country: Country) => {
            setSelectedCountry(country);
            setIsOpen(false);
            setSearchQuery("");

            // Save to localStorage
            localStorage.setItem('phoneInput_selectedCountry', country.code);

            // Focus back to input
            if (inputRef.current) {
                inputRef.current.focus();
            }
        };

        const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value;
            // Only allow numbers, spaces, dashes, parentheses, and dots
            const cleanValue = inputValue.replace(/[^\d\s\-\(\)\.]/g, '');
            setPhoneNumber(cleanValue);
        };

        const filteredCountries = searchQuery
            ? searchCountries(searchQuery)
            : getSortedCountries();

        return (
            <div className={cn("flex items-stretch", className)}>
                {/* Country Selector */}
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={isOpen}
                            disabled={disabled}
                            className={cn(
                                "h-10 min-w-[120px] justify-between rounded-r-none border-r-0 px-3 flex-shrink-0",
                                !isValid && "border-destructive"
                            )}
                        >
                            <div className="flex items-center space-x-2 min-w-0">
                                <span className="text-base leading-none flex-shrink-0">{selectedCountry.flag}</span>
                                <span className="text-sm font-medium whitespace-nowrap">{selectedCountry.dialCode}</span>
                            </div>
                            <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0" align="start">
                        <Command>
                            <CommandInput
                                placeholder="Search countries..."
                                value={searchQuery}
                                onValueChange={setSearchQuery}
                            />
                            <CommandList>
                                <CommandEmpty>No countries found.</CommandEmpty>
                                <CommandGroup>
                                    {filteredCountries.map((country) => (
                                        <CommandItem
                                            key={country.code}
                                            value={`${country.name} ${country.code} ${country.dialCode}`}
                                            onSelect={() => handleCountrySelect(country)}
                                            className="flex items-center space-x-3 cursor-pointer"
                                        >
                                            <span className="text-lg">{country.flag}</span>
                                            <div className="flex-1">
                                                <div className="font-medium">{country.name}</div>
                                                <div className="text-sm text-muted-foreground">{country.dialCode}</div>
                                            </div>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

                {/* Phone Number Input */}
                <Input
                    ref={inputRef}
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    className={cn(
                        "flex-1 rounded-l-none border-l-0 focus:border-l",
                        !isValid && "border-destructive"
                    )}
                    {...props}
                />
            </div>
        );
    }
);

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
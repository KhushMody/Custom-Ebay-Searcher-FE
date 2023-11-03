import React, { useState } from 'react';

function ZipCodeAutocomplete({ formData, setFormData }) {
  const { location, zipCode } = formData;
  const [suggestions, setSuggestions] = useState([]);

  const fetchZipCodeSuggestions = async (query) => {
    try {
      if (!query) {
        setSuggestions([]);
        return;
      }

      const response = await fetch(`http://localhost:5000/api/zipcode-suggestions?query=${query}`);

      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.postalCodes.map((codeData) => codeData.postalCode));
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error(error);
      setSuggestions([]);
    }
  };

  const handleInputChange = (event) => {
    const query = event.target.value;
    setFormData({ ...formData, zipCode: query });
    fetchZipCodeSuggestions(query);
  };

  const handleSuggestionClick = (suggestion) => {
    // Set the selected suggestion as the zipCode value
    setFormData({ ...formData, zipCode: suggestion });
    setSuggestions([]); // Clear the suggestions
  };

  return (
    <div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Zip Code"
          value={zipCode}
          onChange={handleInputChange}
          disabled={location !== 'abcde'} // Disable input when location is not 'abcde'
        />
        {suggestions.length > 0 && (
          <div className="dropdown">
            <ul className="dropdown-menu" style={{ display: 'block', position: 'static' }}>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ZipCodeAutocomplete;
import React, { useState } from 'react';
import Table from './Table';
import Item from './Item';

function Form() {
  const [formData, setFormData] = useState({
    keyword: '',
    category: '',
    condition: [],
    shippingOptions: [],
    distance: '10',
    location: '90007',
    zipCode: ''
  });

  const [data, setData] = useState();
  const [selectedItem, setSelectedItem] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [keywordError, setKeywordError] = useState('');
  const [keywordInputStyles, setKeywordInputStyles] = useState({});
  const [locationError, setLocationError] = useState('');
  const [locationInputStyles, setLocationInputStyles] = useState({});


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setKeywordError('');
    setKeywordInputStyles({});
    setLocationError('');
    setLocationInputStyles({});
    if (type === 'checkbox') {
        // For checkboxes with multiple options
        if( name === 'condition'){
            const updatedInterests = [...formData.condition];
            if (checked) {
                updatedInterests.push(value);
            } else {
                const index = updatedInterests.indexOf(value);
                if (index !== -1) {
                updatedInterests.splice(index, 1);
                }
            }
            setFormData({
                ...formData,
                condition: updatedInterests,
            });
        }
        else{
            const updatedInterests = [...formData.shippingOptions];
            if (checked) {
                updatedInterests.push(value);
            } else {
                const index = updatedInterests.indexOf(value);
                if (index !== -1) {
                updatedInterests.splice(index, 1);
                }
            }
            setFormData({
                ...formData,
                shippingOptions: updatedInterests,
            });
        }
    } else if (type === 'select-multiple') {
      const selectedOptions = Array.from(e.target.options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setFormData({
        ...formData,
        [name]: selectedOptions,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleReset = () => {
    // Reset the form data to its initial state
    setFormSubmitted(false);
    setKeywordInputStyles({});
    setKeywordError('');
    setLocationError('');
    setLocationInputStyles({});
    setFormData({
        keyword: '',
        category: 'All Categories',
        condition: [],
        shippingOptions: [],
        distance: '10',
        location: '',
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setSelectedItem(false);
    const queryParams = new URLSearchParams(formData).toString();
    if (formData.keyword.trim() === '') {
      setKeywordError('Please enter a keyword.');
      setKeywordInputStyles({
        border: '1px solid red'
      });
      console.log('no keyword found');
      if(formData.zipCode.trim() === ''){
        setLocationError('Please enter a zip code')
        setLocationInputStyles({
          border: '1px solid red'
        });
        console.log('no zip code found');
      }
    }
    else if(formData.zipCode.trim() === ''){
      setLocationError('Please enter a zip code')
      setLocationInputStyles({
        border: '1px solid red'
      });
      console.log('no zip code found');
    }
    else{
      console.log(`http://localhost:5000/api/search?${queryParams}`)
      fetch(`http://localhost:5000/api/search?${queryParams}`)
      .then((response) => {
          if (!response.ok) {
          throw new Error('Network response was not ok');
          }
          // console.log(response.json());
          return response.json();
      })
      .then((data) => {
          // Handle the response data (data) as needed
          setData(data.findItemsAdvancedResponse[0].searchResult);
          console.log('Server response:', data.findItemsAdvancedResponse[0].searchResult);
      })
      .catch((error) => {
          console.error('Error:', error);
      });
    }
  };

  const formStyles = {
    background: 'black',
    color: 'white',
  };

  return (
    <>
    <div className="container" style={formStyles}>
        <h1>Product Search</h1>
      <form onSubmit={handleSubmit} style={{textAlign:'center'}} noValidate>
            <div className="row align-items-center mb-3">
            <div className="col-md-2">
                <label for="keyword" className="col-form-label">Keyword*</label>
            </div>
            <div className="col-md-6">
            <input
                        type="text"
                        className="form-control"
                        id="keyword"
                        name="keyword"
                        value={formData.keyword}
                        onChange={handleChange}
                        style={keywordInputStyles}
                        required
                    />
            {formSubmitted && formData.keyword.trim() === '' && (
              <div className="text-danger" style={{display:'flex'}}>{keywordError}</div>
            )}
            
            </div>
            </div>
            

        <div className="row mb-3">
            <label htmlFor="category" className="col-md-2 col-form-label">
                Category
            </label>
            
            <div className='col-md-2'>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-select"
                >
                    <option value="All Categories">All Categories</option>
                    <option value="Art">Art</option>
                    <option value="Baby">Baby</option>
                    <option value="Books">Books</option>
                    <option value="Clothing, Shoes & Accessories">Clothing, Shoes & Accessories</option>
                    <option value="Computers/Tablets & Networking">Computers/Tablets & Networking</option>
                    <option value="Health & Beauty">Health & Beauty</option>
                    <option value="Music">Music</option>
                    <option value="Video Games & Consoles">Video Games & Consoles</option>
                </select>
            </div>
        </div>

        <div className="row mb-3">
            <label htmlFor="condition" className="col-md-2 col-form-label">
                Condition
            </label>
            <div className='col-md-1'>
                <input
                type="checkbox"
                id="new"
                name="condition"
                value="New"
                checked={formData.condition.includes('New')}
                onChange={handleChange}
                className="form-check-input"
                />
                <label className="form-check-label" htmlFor="new">
                New
                </label>
            </div>
            <div className='col-md-1'>
                <input
                type="checkbox"
                id="Used"
                name="condition"
                value="Used"
                checked={formData.condition.includes('Used')}
                onChange={handleChange}
                className="form-check-input"
                />
                <label className="form-check-label" htmlFor="used">
                Used
                </label>
            </div>
            <div className='col-md-2'>
                <input
                type="checkbox"
                id="Unspecified"
                name="condition"
                value="Unspecified"
                checked={formData.condition.includes('Unspecified')}
                onChange={handleChange}
                className="form-check-input"
                />
                <label className="form-check-label" htmlFor="unspecified">
                Unspecified
                </label>
            </div>
        </div>

        
        <div className="row mb-3">
            <label htmlFor="shippingOptions" className="col-md-2 col-form-label">
                Shipping Options
            </label>
            <div className='col-md-2'>
                <input
                type="checkbox"
                id="localPickup"
                name="shippingOptions"
                value="local pickup"
                checked={formData.shippingOptions.includes('local pickup')}
                onChange={handleChange}
                className="form-check-input"
                />
                <label className="form-check-label" htmlFor="localPickup">
                Local Pickup
                </label>
            </div>
            <div className='col-md-2'>
                <input
                type="checkbox"
                id="freeShipping"
                name="shippingOptions"
                value="free shipping"
                checked={formData.shippingOptions.includes('free shipping')}
                onChange={handleChange}
                className="form-check-input"
                />
                <label className="form-check-label" htmlFor="freeShipping">
                Free Shipping
                </label>
            </div>
        </div>

        <div className="row mb-3">
              <label htmlFor="distance" className="col-md-2 col-form-label">
                Distance (Miles)
              </label>
              <div className='col-md-2'>
              <input
                type="text"
                className="form-control"
                id="distance"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
              />
              </div>
        </div>

        <div className="row mb-3">
                <label htmlFor="location" className="col-md-2 col-form-label">
                    From*
                </label>
                <div className='col-md-3' style={{textAlign:'left'}}>
                <div>
                    <input
                    type="radio"
                    id="currentLocation"
                    name="location"
                    value="90007"
                    checked={formData.location === '90007'}
                    onChange={handleChange}
                    className="form-check-input"
                    />
                    <label className="form-check-label" htmlFor="currentLocation">
                    'Current Location'
                    </label>
                </div>
                <div>
                    <input
                    type="radio"
                    id="otherLocation"
                    name="location"
                    value="abcde"
                    checked={formData.location === 'abcde'}
                    onChange={handleChange}
                    className="form-check-input"
                    />
                    <label className="form-check-label" htmlFor="otherLocation">
                    Other. Please specify zip code:
                    </label>
                </div>
                <div>
                <input
                    type="text"
                    name="zipCode"
                    disabled={formData.location !== 'abcde'} // Disable the input unless the second radio button is selected
                    value={formData.location === 'abcde' ? formData.zipCode : ''}
                    onChange={handleChange}
                    className="form-control"
                    style={locationInputStyles}
                />
                {formSubmitted && formData.zipCode.trim() === '' && (
              <div className="text-danger" style={{display:'flex'}}>{locationError}</div>
            )}
                </div>
                </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ margin: '10px' }}>
          Search
        </button>

        <button type="button" className="btn btn-secondary" onClick={handleReset}>
          Clear
        </button>
      </form>
    </div>
    <div className='container'>
      {!selectedItem && data && <Table data={data} setSelectedItem={setSelectedItem}/>}
      {selectedItem && data && <Item selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>}
    </div>
    </>
  );
}

export default Form;
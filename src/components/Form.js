import React, { useState } from 'react';
import Table from './Table';
import Item from './Item';
import Photos from './Photos';
import Shipping from './Shipping';
import NavBar from './NavBar';
import Seller from './Seller';
import SimilarProduct from './SimilarProduct';
import WishList from './WishList';

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
  const [selectedNavItem, setSelectedNavItem] = useState('product');
  const [photosData, setPhotosData] = useState();
  const [itemId, setItemId] = useState();
  const [navigationBar, setNavigationBar] = useState(false);
  const [similarProductsData, setSimilarProductsData] = useState();
  const [favoritesData, setFavoritesData] = useState();
  const [checkWishlist, setCheckWishlist] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progress, setProgress] = useState(0);
  const [wishListArray, setWishListArray] = useState([]);


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
    setNavigationBar(false);
    setSimilarProductsData();
    setCheckWishlist(false);
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
    setSelectedNavItem('product');
    setItemId();
    setPhotosData();
    setNavigationBar(false);
    setSimilarProductsData();
    setCheckWishlist(false);
    startProgressBar();
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
          setShowProgressBar(false);
          console.log('Server response:', data.findItemsAdvancedResponse[0].searchResult);
      })
      .catch((error) => {
          console.error('Error:', error);
      });
    }
  };

  const handleWishList = () => {
    // Make an API request to retrieve data from the "favorites" collection
    fetch('http://localhost:5000/api/favorites')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Set the favoritesData state with the retrieved data
        console.log('Data from mongoDB:',data);
        setFavoritesData(data);
        setCheckWishlist(true);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  const removeCartItem = (itemId) => {
    // Filter out the item with the specified itemId and update the cartItems state
    setFavoritesData(favoritesData.filter((item) => item.itemId !== itemId));
  };

  const formStyles = {
    background: 'black',
    color: 'white',
  };

  const buttonStyle = {
    padding: '10px 20px',
    cursor: 'pointer',
};

const activeButtonStyle = {
    backgroundColor: 'black',
    color: 'white',
    padding: '10px 20px',
    cursor: 'pointer',
};

const startProgressBar = () => {
  setShowProgressBar(true);
  setProgress(50); // Set the progress to 50% immediately
  // You can continue with the rest of your code to make the API request
  // ...
};

  return (
    <>
    <div className="container bg-dark text-white" >
        <h1 className='mb-3 offset-md-3'>Product Search</h1>
      <form onSubmit={handleSubmit} className='mb-3 offset-md-3' noValidate>
            <div className="row mb-3">
            <div className="col-md-2">
                <label for="keyword" className="col-form-label">Keyword*</label>
            </div>
            <div className="col-md-6" style={{paddingLeft:'0'}}>
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
            
            <div className='col-md-2' style={{paddingLeft:'0'}}>
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
            <div className='col-md-1 form-check form-check-inline'>
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
            <div className='col-md-1 form-check form-check-inline'>
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
            <div className='col-md-2 form-check form-check-inline'>
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
            <div className='col-md-2 form-check form-check-inline'>
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
            <div className='col-md-2 form-check form-check-inline'>
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
              <div className='col-md-2' style={{paddingLeft:'0'}}>
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
                <div className='col-md-4 form-check form-check-inline' style={{textAlign:'left'}}>
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

        <div className="d-flex">
          <button type="submit" className="btn btn-secondary text-dark" style={{ margin: '10px', display: 'flex', alignItems: 'center' }}>
            <span className="material-icons" style={{ verticalAlign: 'middle' }}>
              search
            </span>
            <span style={{ marginLeft: '5px' }}>Search</span>
          </button>

          <button type="button" className="btn btn-light" onClick={handleReset} style={{ margin: '10px', display: 'flex', alignItems: 'center' }}>
          <span class="material-icons" style={{ verticalAlign: 'middle' }}>
            clear_all
          </span>
            Clear
          </button>
        </div>


      </form>
    </div>
    <div className='container'> 
      <button style={favoritesData === false ? activeButtonStyle : buttonStyle} onClick={handleSubmit}>Results</button>
      <button style={favoritesData === false ? buttonStyle : activeButtonStyle} onClick={handleWishList}>Wishlist</button>
    </div>
    <div className='container'>
    {showProgressBar && (
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    )}
    </div>
    <div className='container'>
      {!checkWishlist && navigationBar && <NavBar setWishListArray={setWishListArray} wishListArray = {wishListArray} favoritesData = {favoritesData} removeCartItem={removeCartItem} data = {data} itemId = {itemId} selectedNavItem={selectedNavItem} setSelectedNavItem={setSelectedNavItem} setPhotosData={setPhotosData} selectedItem={selectedItem} setSimilarProductsData={setSimilarProductsData}/>}
      {!checkWishlist && !selectedItem && data && <Table wishListArray={wishListArray} setWishListArray={setWishListArray} data={data} setSelectedItem={setSelectedItem} setItemId={setItemId} setNavigationBar={setNavigationBar} setFavoritesData={setFavoritesData} favoritesData={favoritesData} removeCartItem={removeCartItem}/>}
      {!checkWishlist && selectedItem && data && selectedNavItem === 'product' && <Item selectedItem={selectedItem} setSelectedItem={setSelectedItem} selectedNavItem = {selectedNavItem} setSelectedNavItem={setSelectedNavItem} setPhotosData={setPhotosData}/>}
      {!checkWishlist && selectedItem && data && selectedNavItem === 'photos' && <Photos selectedItem={selectedItem} setSelectedItem={setSelectedItem} selectedNavItem = {selectedNavItem} setSelectedNavItem={setSelectedNavItem} setPhotosData = {setPhotosData} photosData={photosData}/>}
      {!checkWishlist && selectedItem && data && selectedNavItem === 'shipping' && <Shipping itemId={itemId} data={data} favoritesData={favoritesData}/>}
      {!checkWishlist && selectedItem && data && selectedNavItem === 'seller' && <Seller selectedItem={selectedItem}/>}
      {!checkWishlist && selectedItem && data && selectedNavItem === 'similar-products' && <SimilarProduct similarProductsData={similarProductsData}/>}
      {checkWishlist && <WishList setWishListArray={setWishListArray} wishListArray = {wishListArray} favoritesData={favoritesData} setSelectedItem={setSelectedItem} setItemId={setItemId} setNavigationBar={setNavigationBar} setFavoritesData={setFavoritesData} removeCartItem={removeCartItem} setCheckWishlist={setCheckWishlist}/>}
    </div>
    </>
  );
}

export default Form;
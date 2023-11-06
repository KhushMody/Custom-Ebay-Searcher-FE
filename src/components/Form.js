import React, { useState, useEffect } from 'react';
import Table from './Table';
import Item from './Item';
import Photos from './Photos';
import Shipping from './Shipping';
import NavBar from './NavBar';
import Seller from './Seller';
import SimilarProduct from './SimilarProduct';
import WishList from './WishList';
import ZipCodeAutocomplete from './ZipCodeAutocomplete';
import Details from './Details';

function Form() {
  const [formData, setFormData] = useState({
    keyword: '',
    category: '',
    condition: [],
    shippingOptions: [],
    distance: '10',
    location: '',
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
  const [resultsActive, setResultsActive] = useState(true);
  const [wishlistActive, setWishlistActive] = useState(false);
  const [prevListState, setPrevListState] = useState('results')
  const [detailsButton, setDetailsButton] = useState(false);
  const [currLocation, setCurrLocation] = useState('');
  const [wishlistTotal, setWishlistTotal] = useState(0);


  const [formSubmitted, setFormSubmitted] = useState(false);
  const [keywordError, setKeywordError] = useState('');
  const [keywordInputStyles, setKeywordInputStyles] = useState({});
  const [locationError, setLocationError] = useState('');
  const [locationInputStyles, setLocationInputStyles] = useState({});


  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    setKeywordError('');
    setKeywordInputStyles({});
    setLocationError('');
    setLocationInputStyles({});
  
    if (type === 'checkbox') {
      if (name === 'condition' || name === 'shippingOptions') {
        const updatedInterests = [...formData[name]];
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
          [name]: updatedInterests,
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
      if (name === 'location' && value === formData.location) {
        // If "Current Location" is selected, fetch and set user location
        await fetchUserLocation();
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    }
  };
  

  const handleReset = (e) => {
    // Reset the form data to its initial state
    e.preventDefault();
    setFormSubmitted(false);
    setKeywordInputStyles({});
    setKeywordError('');
    setLocationError('');
    setLocationInputStyles({});
    setNavigationBar(false);
    setSimilarProductsData();
    setCheckWishlist(false);
    setDetailsButton(false);
    setFormData({
        keyword: '',
        category: '',
        condition: [],
        shippingOptions: [],
        distance: '10',
        location: currLocation,
        zipCode: ''
    });
    setData(false);
    setWishlistActive(false);
    setResultsActive(true);
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
    setDetailsButton(false);
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
    else if(formData.zipCode.trim() === '' && formData.location === 'abcde'){
      setLocationError('Please enter a zip code')
      setLocationInputStyles({
        border: '1px solid red'
      });
      console.log('no zip code found');
    }
    else{
      startProgressBar();
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
      matchData();
    }
  };

  const matchData = () => {
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
        //setCheckWishlist(true);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleWishList = () => {
    // Make an API request to retrieve data from the "favorites" collection
    setPrevListState('wishlist');
    setWishlistActive(true);
    setResultsActive(false);
    setSelectedNavItem('product');
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
  
  const fetchUserLocation = async () => {
    try {
      const response = await fetch('https://ipinfo.io/json?token=604e00c8ba9338');
      if (response.ok) {
        const data = await response.json();
        // Extract the postal code from the response, assuming it's available
        const userLocation = data.postal || '';
        // Set the location in the form data
        setFormData({ ...formData, location: userLocation , zipCode: ''});
        setCurrLocation(userLocation)
      } else {
        console.error('Failed to fetch user location');
      }
    } catch (error) {
      console.error('Error fetching user location:', error);
    }
  };

  useEffect(() => {
    fetchUserLocation();
  }, []); 

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

const handleResultsClick = () => {
  setPrevListState('results');
  setResultsActive(true);
  setWishlistActive(false);
  setSelectedItem(false);
  setCheckWishlist(false);
  setSelectedNavItem('product')
  // Add your logic for handling the Results button click
};

  return (
    <div className="container">
    <div className="container bg-dark text-white" >
        <h1 className='mb-3 offset-md-3'>Product Search</h1>
      <form onSubmit={handleSubmit} className='mb-3 offset-md-3' noValidate>
          <div className="row mb-3">
            <div className="col-sm-12 col-md-2">
                <label for="keyword" className="col-form-label">Keyword<span style={{color:"red"}}>*</span></label>
            </div>
            <div className="col-sm-12 col-md-6">
            <input
                        type="text"
                        className="form-control"
                        id="keyword"
                        name="keyword"
                        placeholder="Enter Product Name (eg. iPhone 8)"
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
            <label htmlFor="category" className="col-12 col-md-2 col-form-label">
                Category
            </label>
            
            <div className='col-md-2 col-12'>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-select"
                >
                    <option value="">All Categories</option>
                    <option value="550">Art</option>
                    <option value="2984">Baby</option>
                    <option value="267">Books</option>
                    <option value="11450">Clothing, Shoes & Accessories</option>
                    <option value="58058">Computers/Tablets & Networking</option>
                    <option value="26395">Health & Beauty</option>
                    <option value="11233">Music</option>
                    <option value="1249">Video Games & Consoles</option>
                </select>
            </div>
        </div>

        <div className="row mb-3">
            <label htmlFor="condition" className="col-md-2 col-form-label col-12">
                Condition
            </label>
            <div className='col-2 col-md-1 form-check form-check-inline' style={{paddingLeft:"36px"}}>
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
            <div className='col-2 col-md-1 form-check form-check-inline'>
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
            <div className='col-2 col-md-2 form-check form-check-inline'>
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
            <label htmlFor="shippingOptions" className="col-12 col-md-2 col-form-label">
                Shipping Options
            </label>
            <div className='col-5 col-md-2 form-check form-check-inline' style={{paddingLeft:"36px"}}>
                <input
                type="checkbox"
                id="localPickup"
                name="shippingOptions"
                value="LocalPickupOnly"
                checked={formData.shippingOptions.includes('LocalPickupOnly')}
                onChange={handleChange}
                className="form-check-input"
                />
                <label className="form-check-label" htmlFor="localPickup">
                Local Pickup
                </label>
            </div>
            <div className='col-5 col-md-2 form-check form-check-inline'>
                <input
                type="checkbox"
                id="freeShipping"
                name="shippingOptions"
                value="FreeShippingOnly"
                checked={formData.shippingOptions.includes('FreeShippingOnly')}
                onChange={handleChange}
                className="form-check-input"
                />
                <label className="form-check-label" htmlFor="freeShipping">
                Free Shipping
                </label>
            </div>
        </div>

        <div className="row mb-3">
              <label htmlFor="distance" className="col-12 col-md-2 col-form-label">
                Distance (Miles)
              </label>
              <div className='col-12 col-md-2'>
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
                <label htmlFor="location" className="col-12 col-md-2 col-form-label">
                    From<span style={{color:"red"}}>*</span>
                </label>
                <div className='col-md-9 form-check form-check-inline' style={{paddingRight:"0px"}}>
                <div className='col-sm-12' style={{paddingLeft:"12px"}}>
                    <input
                    type="radio"
                    id="currentLocation"
                    name="location"
                    value={formData.location}
                    checked={formData.location !== 'abcde'}
                    onChange={handleChange}
                    className="form-check-input"
                    />
                    <label className="form-check-label" htmlFor="currentLocation">
                    'Current Location'
                    </label>
                </div>
                <div className='col-sm-12' style={{paddingLeft:"12px"}}>
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
                <div className='col-sm-12 col-12' style={{marginLeft:"-12px", paddingRight:"0px"}}>
                <ZipCodeAutocomplete
                  formData={formData}
                  setFormData={setFormData}
                />
                  {((formData.zipCode.trim() === '') ||
       (formSubmitted && formData.location === 'abcde' && formData.zipCode.trim() === '')) && (
        <div className="text-danger" style={{display:'flex'}}>{locationError}</div>
      )}
                </div>
                </div>
                {/* <div>
                  <ZipCodeAutocomplete></ZipCodeAutocomplete>
                </div> */}
        </div>

        <div className="d-flex">
          <button type="submit" className="btn btn-light" style={{ margin: '10px', display: 'flex', alignItems: 'center' }} disabled={formData.keyword === ''}>
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
    <div className="container mb-3" style={{alignItems:'center', textAlign:"center"}}>
        <button
          className={`btn ${resultsActive ? 'btn-dark' : 'btn-light'}`}
          onClick={handleResultsClick}
          style={{alignItems:'center', textAlign:"center", marginRight:"10px"}}
        >
          Results
        </button>
        <button
          className={`btn ${wishlistActive ? 'btn-dark' : 'btn-light'}`}
          onClick={handleWishList}
          style={{alignItems:'center', textAlign:"center"}}
        >
          Wishlist
        </button>
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
      {!checkWishlist && selectedItem && navigationBar && <NavBar handleWishList={handleWishList} prevListState={prevListState} handleResultsClick={handleResultsClick} setCheckWishlist={setCheckWishlist} setSelectedItem={selectedItem} setWishListArray={setWishListArray} wishListArray = {wishListArray} favoritesData = {favoritesData} removeCartItem={removeCartItem} data = {data} itemId = {itemId} selectedNavItem={selectedNavItem} setSelectedNavItem={setSelectedNavItem} setPhotosData={setPhotosData} selectedItem={selectedItem} setSimilarProductsData={setSimilarProductsData}/>}
      {!selectedItem && data && detailsButton && <Details itemId={itemId} setSelectedItem={setSelectedItem} setItemId={setItemId} setNavigationBar={setNavigationBar} setCheckWishlist={setCheckWishlist}></Details>}
      {!checkWishlist && !selectedItem && data && <Table wishlistTotal={wishlistTotal} setWishlistTotal={setWishlistTotal} itemId={itemId} setDetailsButton={setDetailsButton} wishListArray={wishListArray} setWishListArray={setWishListArray} data={data} setSelectedItem={setSelectedItem} setItemId={setItemId} setNavigationBar={setNavigationBar} setFavoritesData={setFavoritesData} favoritesData={favoritesData} removeCartItem={removeCartItem}/>}
      {!checkWishlist && selectedItem && data && selectedNavItem === 'product' && <Item selectedItem={selectedItem} setSelectedItem={setSelectedItem} selectedNavItem = {selectedNavItem} setSelectedNavItem={setSelectedNavItem} setPhotosData={setPhotosData}/>}
      {!checkWishlist && selectedItem && data && selectedNavItem === 'photos' && <Photos selectedItem={selectedItem} setSelectedItem={setSelectedItem} selectedNavItem = {selectedNavItem} setSelectedNavItem={setSelectedNavItem} setPhotosData = {setPhotosData} photosData={photosData}/>}
      {!checkWishlist && selectedItem && data && selectedNavItem === 'shipping' && <Shipping itemId={itemId} data={data} favoritesData={favoritesData}/>}
      {!checkWishlist && selectedItem && data && selectedNavItem === 'seller' && <Seller selectedItem={selectedItem}/>}
      {!checkWishlist && selectedItem && data && selectedNavItem === 'similar-products' && <SimilarProduct similarProductsData={similarProductsData}/>}
      {checkWishlist && <WishList itemId = {itemId} setWishListArray={setWishListArray} wishListArray = {wishListArray} favoritesData={favoritesData} setSelectedItem={setSelectedItem} setItemId={setItemId} setNavigationBar={setNavigationBar} setFavoritesData={setFavoritesData} removeCartItem={removeCartItem} setCheckWishlist={setCheckWishlist}/>}
    </div>
  );
}

export default Form;
import React, { useState, useEffect } from "react";

function NavBar(props){
    var id = props.itemId;
    var dataEntries = props.data
    var item = dataEntries[0]["item"].find(item => item.itemId[0] === props.itemId)
    const [isItemInCart, setIsItemInCart] = useState(false);
    const [isItemInWishList, setIsItemInWishList] = useState(false);
    console.log('wishListArray in navBar', props.wishListArray);
    //var isItemInWishList;

    const facebookShare = () => {
        console.log('CLICKED')
        const shareUrl = item.viewItemURL[0];
        const PRICE= item.sellingStatus[0].currentPrice[0].__value__;
        const PRODUCT_NAME = item.title[0];
        const quote = `Buy ${PRODUCT_NAME} at ${PRICE} from ${shareUrl} below.`;
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(quote)}`;
        window.open(facebookShareUrl, '_blank');
    };

    useEffect(() => {
        // Check if props.wishListArray is defined and not empty
        if (props.wishListArray && props.wishListArray.length > 0) {
            // Check if the item's id is in the wishListArray
            const checkIsItemInWishList = props.wishListArray.some((item) => item === id);
            setIsItemInWishList(checkIsItemInWishList)
            console.log(isItemInWishList);
            // Update isItemInCart based on whether the item is in the wish list
            //setIsItemInCart(isItemInWishList);
            console.log('inside the useEffect isItemInCart', isItemInCart);
        } else {
            // If props.wishListArray is not defined or empty, set isItemInCart to false
            setIsItemInCart(false);
        }
    }, [props.wishListArray, id]);
    console.log('outside the useEffect isItemInCart', isItemInCart, isItemInWishList);

    const onRemoveFromCartClick = (itemId) => {
        // Define the URL for your backend endpoint to remove the item from the cart using a GET request
        setIsItemInWishList(false);
        const backendUrl = `http://localhost:5000/api/removeFromCart?itemId=${itemId}`;
        console.log('entering remove item');
        const updatedList = props.wishListArray.filter(item => item !== itemId);
        props.setWishListArray(updatedList);
        // Make a GET request to your backend to remove the item from the cart
        fetch(backendUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            // Handle the success response or errors as needed
      
            // After successfully removing from the backend, call removeCartItem to update the state
            props.removeCartItem(itemId);
            setIsItemInCart(false);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };

    const onAddToCartClick = () => {
        // Define the URL for your backend endpoint
        props.setWishListArray(prevList => [...prevList, id]);
        console.log('printing props.favoriteData in card.js',props.favoritesData);
        item.title[0].replace('%', '%25');
        const ID = encodeURIComponent(id)
        const image = encodeURIComponent(item.galleryURL[0]);
        const title= encodeURIComponent(item.title[0]);
        const price= encodeURIComponent(item.sellingStatus[0].currentPrice[0].__value__);
        const shippingOptions= encodeURIComponent(item.shippingInfo[0].shippingType[0]);
        const favoriteDetails= encodeURIComponent("Add any additional details here if needed");
        const shippingInfo = JSON.stringify(item.shippingInfo[0]);
        const shippingCost = JSON.stringify(item.shippingInfo[0].shippingServiceCost[0]);
        //const shippingCostDisplay = shippingCost['@currencyId'] === 'USD' && shippingCost['__value__'] === '0.0' ? 'Free Shipping' : `${shippingCost['@currencyId']} ${shippingCost['__value__']}`;

        const backendUrl = `http://localhost:5000/api/addToCart?itemId=${ID}&image=${image}&title=${title}&price=${price}&shippingOptions=${shippingOptions}&favoriteDetails=${favoriteDetails}&shippingInfo=${shippingInfo}&shippingCost=${shippingCost}`;
        //props.setLocalFavoritesData(prevFavorites => [...prevFavorites, itemData]);
        //console.log('localFavoritesData in Card:', props.localFavoritesData);
    
        fetch(backendUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            console.log('Item added to cart:', data);
            setIsItemInCart(true);
            // Handle the response from the backend as needed
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };
    
      useEffect(() => {
        if (props.favoritesData) {
          const isItemInFavorites = props.favoritesData.some(
            (favorite) => favorite.itemId === id
          );
          setIsItemInCart(isItemInFavorites);
        }
      }, [props.favoritesData, id]);

    const handleNavItemClickPhotos = (navItem) => {
        const title = props.selectedItem.Item.Title
        console.log('title for photos backend', title)
        const backendUrl = `http://localhost:5000/api/photos?title=${title}`;

        // Make a GET request to your backend
        fetch(backendUrl)
            .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
            })
            .then((data) => {
                console.log('Backend response for photos:', data);
                props.setPhotosData(data);
            })
            .catch((error) => {
            console.error('Error:', error);
            });
            props.setSelectedNavItem(navItem);
            console.log(navItem,props.selectedNavItem);
    };

    const handleNavItemClickSimilarProducts = (navItem) => {
        const itemID = props.selectedItem.Item.ItemID
        //console.log('title for photos backend', itemID)
        const backendUrl = `http://localhost:5000/api/similar-products?itemID=${itemID}`;

        // Make a GET request to your backend
        fetch(backendUrl)
            .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
            })
            .then((data) => {
            // Handle the response data from your backend as needed
                console.log('Backend response for similar products:', data);
                props.setSimilarProductsData(data);
                props.setSelectedNavItem(navItem);
            })
            .catch((error) => {
            console.error('Error:', error);
            });
            
            console.log(navItem,props.selectedNavItem);
    };

    const handleNavItemClick = (navItem) => {
        props.setSelectedNavItem(navItem);
        console.log(navItem,props.selectedNavItem);
    };
    
    const navItemStyle = {
        padding: '10px 20px',
        cursor: 'pointer',
    };
    
    const activeNavItemStyle = {
        backgroundColor: 'black',
        color: 'white',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '5px 5px 0 0',
    };
    
    const navListStyle = {
        display: 'flex',
        listStyle: 'none',
        justifyContent: 'flex-end', // Align the items to the right
        margin: 0, // Remove default margin
        padding: 0, // Remove default padding
    };

    return(
        <>
            <div className="container mb-3">
                <h4 style={{alignItems:'center', textAlign:"center"}} className="mb-3">{props.selectedItem.Item.Title}</h4>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 text-start">
                        {props.prevListState === 'results' ? (<button
                            className={`btn btn-light`}
                            onClick={props.handleResultsClick}
                        >
                            List
                        </button>):(<button
                            className={`btn btn-light`}
                            onClick={props.handleWishList}
                        >
                            List
                        </button>)}
                        </div>
                        <div className="col-md-6 text-end">
                            <div className="d-flex justify-content-end">
                                <div onClick={facebookShare}>
                                <img src="./facebook.png" alt="facebook logo" style={{ height: "42px", width: "auto" }} />
                                </div>
                                {isItemInCart || isItemInWishList ? (
                                <button className="btn btn-light" onClick={() => onRemoveFromCartClick(id)} style={{ color: "#966919" }}>
                                    <span class="material-symbols-outlined">remove_shopping_cart</span>
                                </button>
                                ) : (
                                <button className="btn btn-light" onClick={onAddToCartClick}>
                                    <span class="material-symbols-outlined">add_shopping_cart</span>
                                </button>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
                <ul style={navListStyle}>
                    <li
                        onClick={() => handleNavItemClick('product')}
                        style={props.selectedNavItem === 'product' ? activeNavItemStyle : navItemStyle}
                    >
                        Product
                    </li>
                    <li
                        onClick={() => handleNavItemClickPhotos('photos')}
                        style={props.selectedNavItem === 'photos' ? activeNavItemStyle : navItemStyle}
                    >
                        Photos
                    </li>
                    <li
                        onClick={() => handleNavItemClick('shipping')}
                        style={props.selectedNavItem === 'shipping' ? activeNavItemStyle : navItemStyle}
                    >
                        Shipping
                    </li>
                    <li
                        onClick={() => handleNavItemClick('seller')}
                        style={props.selectedNavItem === 'seller' ? activeNavItemStyle : navItemStyle}
                    >
                        Seller
                    </li>
                    <li
                        onClick={() => handleNavItemClickSimilarProducts('similar-products')}
                        style={props.selectedNavItem === 'similar-products' ? activeNavItemStyle : navItemStyle}
                    >
                        Similar Products
                    </li>
                </ul>
                <hr style={{marginTop:'0', paddingTop:'0'}}></hr>
            </div>
            
        </>
    );
}

export default NavBar;
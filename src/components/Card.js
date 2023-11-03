import React, { useState, useEffect } from "react";

function Card(props){
    var id = props.data.itemId[0];
    //const id = props.data.itemId[0];
    const [isItemInCart, setIsItemInCart] = useState(false);
    const [isItemInWishList, setIsItemInWishList] = useState(false);

    useEffect(() => {
      // Check if props.wishListArray is defined and not empty
      if (props.wishListArray && props.wishListArray.length > 0) {
          // Check if the item's id is in the wishListArray
          const checkIsItemInWishList = props.wishListArray.some((item) => item === id);
          setIsItemInWishList(checkIsItemInWishList)
          
          // Update isItemInCart based on whether the item is in the wish list
          setIsItemInCart(isItemInWishList);
      } else {
          // If props.wishListArray is not defined or empty, set isItemInCart to false
          setIsItemInCart(false);
      }
  }, [props.wishListArray, id]);
    
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
        props.data.title[0].replace('%', '%25');
        const ID = encodeURIComponent(id)
        const image = encodeURIComponent(props.data.galleryURL[0]);
        const title= encodeURIComponent(props.data.title[0]);
        const price= encodeURIComponent(props.data.sellingStatus[0].currentPrice[0].__value__);
        const shippingOptions= encodeURIComponent(props.data.shippingInfo[0].shippingType[0]);
        const favoriteDetails= encodeURIComponent("Add any additional details here if needed");
        const shippingInfo = JSON.stringify(props.data.shippingInfo[0]);
        const shippingCost = JSON.stringify(props.data.shippingInfo[0].shippingServiceCost[0]);
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

    const onProductNameClick = (itemId) => {
        // Define the URL for your backend endpoint, e.g., replace 'your-backend-url' with the actual URL.
        
        console.log(itemId);
        const backendUrl = `http://localhost:5000/api/ebayShoppingApi?itemId=${itemId}`;
    
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
            console.log('Backend response:', data);
            props.setSelectedItem(data);
            props.setItemId(itemId);
            props.setNavigationBar(true);
            props.setDetailsButton(true);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };

    return(<>
        <tr className={props.itemId === id ? "table-light" : ""}>
            <td>{props.keys}</td>
            <td><a href={props.data.galleryURL[0]} target="_blank" rel="noopener noreferrer"><img src={props.data.galleryURL[0]} style={{height:'100px', width:'100px'}} alt="item"/></a></td>
            <td>
              <p
                onClick={() => onProductNameClick(id)}
                style={{ color: 'blue' }}
                title={props.data.title[0]}
              >
                {props.data.title[0].length > 45 ? (() => {
                  const truncated = props.data.title[0].slice(0, 45);
                  if (truncated.charAt(45) !== ' ' && truncated.lastIndexOf(' ') > 0) {
                    const lastSpaceIndex = truncated.lastIndexOf(' ');
                    return `${truncated.slice(0, lastSpaceIndex)}...`;
                  }
                  return `${truncated}...`;
                })() : props.data.title[0]}
              </p>
            </td>
            <td>${props.data.sellingStatus[0].currentPrice[0].__value__}</td>
            <td>{props.data.shippingInfo[0].shippingType[0]}</td>
            <td>{props.data.postalCode[0]}</td>
            <td>{isItemInCart||isItemInWishList ? (
            <button className="btn btn-light"  onClick={() => onRemoveFromCartClick(id)} style={{color:"#966919"}}><span class="material-symbols-outlined">remove_shopping_cart</span></button>
          ) : (
            <button className="btn btn-light" onClick={onAddToCartClick} ><span class="material-symbols-outlined">add_shopping_cart</span></button>
          )}</td>
        </tr>
    </>)
    
}

export default Card;
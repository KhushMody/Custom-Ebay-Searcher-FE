import React, { useState, useEffect } from "react";

function Card(props){
    var id = props.data.itemId[0];
    //const id = props.data.itemId[0];
    const [isItemInCart, setIsItemInCart] = useState(false);


    const itemData = {
        image: props.data.galleryURL[0],
        title: props.data.title[0],
        price: props.data.sellingStatus[0].currentPrice[0].__value__,
        shippingOptions: props.data.shippingInfo[0].shippingType[0],
        favoriteDetails: "Add any additional details here if needed",
    };
    
    const onRemoveFromCartClick = (itemId) => {
        // Define the URL for your backend endpoint to remove the item from the cart using a GET request
        const backendUrl = `http://localhost:5000/api/removeFromCart?itemId=${itemId}`;
        console.log('entering remove item');
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
        console.log('printing props.favoriteData in card.js',props.favoritesData);
        props.data.title[0].replace('%', '%25');
        const ID = encodeURIComponent(id)
        const image = encodeURIComponent(props.data.galleryURL[0]);
        const title= encodeURIComponent(props.data.title[0]);
        const price= encodeURIComponent(props.data.sellingStatus[0].currentPrice[0].__value__);
        const shippingOptions= encodeURIComponent(props.data.shippingInfo[0].shippingType[0]);
        const favoriteDetails= encodeURIComponent("Add any additional details here if needed");

        const backendUrl = `http://localhost:5000/api/addToCart?itemId=${ID}&image=${image}&title=${title}&price=${price}&shippingOptions=${shippingOptions}&favoriteDetails=${favoriteDetails}`;
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
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };

    return(<>
        <tr>
            <td>{props.keys}</td>
            <td><img src={props.data.galleryURL[0]} style={{height:'100px', width:'100px'}} alt="item"/></td>
            <td>
                <p onClick={() => onProductNameClick(id)} style={{color:'blue'}}>{props.data.title[0]}</p>
            </td>
            <td>${props.data.sellingStatus[0].currentPrice[0].__value__}</td>
            <td>{props.data.shippingInfo[0].shippingType[0]}</td>
            <td>{props.data.postalCode[0]}</td>
            <td>{isItemInCart ? (
            <button onClick={() => onRemoveFromCartClick(id)}>Remove from cart</button>
          ) : (
            <button onClick={onAddToCartClick}>Add to cart</button>
          )}</td>
        </tr>
    </>)
    
}

export default Card;
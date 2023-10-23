import React from "react";

function Card(props){
    var id = props.data.itemId[0];
    //const id = props.data.itemId[0];
    const itemData = {
        image: props.data.galleryURL[0],
        title: props.data.title[0],
        price: props.data.sellingStatus[0].currentPrice[0].__value__,
        shippingOptions: props.data.shippingInfo[0].shippingType[0],
        favoriteDetails: "Add any additional details here if needed",
    };
    
    const onAddToCartClick = () => {
        // Define the URL for your backend endpoint
        const image = encodeURIComponent(props.data.galleryURL[0]);
        const title= encodeURIComponent(props.data.title[0]);
        const price= props.data.sellingStatus[0].currentPrice[0].__value__;
        const shippingOptions= props.data.shippingInfo[0].shippingType[0];
        const favoriteDetails= "Add any additional details here if needed";

        const backendUrl = `http://localhost:5000/api/addToCart?itemId=${id}&image=${image}&title=${title}&price=${price}&shippingOptions=${shippingOptions}&favoriteDetails=${favoriteDetails}`;
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
            // Handle the response from the backend as needed
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };

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
            <td><button onClick={onAddToCartClick}>Add to cart</button></td>
        </tr>
    </>)
    
}

export default Card;
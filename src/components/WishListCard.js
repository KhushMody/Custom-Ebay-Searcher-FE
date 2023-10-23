import React from "react";

function WishListCard(props){
    var id = props.data.itemId;
    //const id = props.data.itemId[0];
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
            props.setFavoritesData(false);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };

    return(<>
        <tr>
            <td>{props.keys}</td>
            <td><img src={props.data.image} alt="item card" style={{height:"100px", width:"100px"}}/></td>
            <td><p onClick={() => onProductNameClick(id)} style={{color:'blue'}}>{props.data.title}</p></td>
            <td>${props.data.price}</td>
            <td>{props.data.shippingOptions}</td>
            <td><button onClick={() => onRemoveFromCartClick(id)}>Remove from cart</button></td>
        </tr>
    </>)
    
}

export default WishListCard;
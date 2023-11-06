import React from "react";
import '../style/card.css'

function WishListCard(props){
    var id = props.data.itemId;
    //const id = props.data.itemId[0];
    const onRemoveFromCartClick = (itemId) => {
        // Define the URL for your backend endpoint to remove the item from the cart using a GET request
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
            props.setCheckWishlist(false);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };

    return(<>
        <tr className={props.itemId === id ? "table-light" : ""}>
            <td>{props.keys}</td>
            <td><a href={props.data.image} target="_blank" rel="noopener noreferrer"><img src={props.data.image} alt="item card" style={{height:"100px", width:"100px"}}/></a></td>
            <td className="overFlow">
              <p
                onClick={() => onProductNameClick(id)}
                className="underline-on-hover"
                style={{ color: 'blue' }}
                title={props.data.title}
              >
                {props.data.title.length > 35 ? (() => {
                  const truncated = props.data.title.slice(0, 35);
                  if (truncated.charAt(35) !== ' ' && truncated.lastIndexOf(' ') > 0) {
                    const lastSpaceIndex = truncated.lastIndexOf(' ');
                    return `${truncated.slice(0, lastSpaceIndex)}...`;
                  }
                  return `${truncated}...`;
                })() : props.data.title}
              </p>
            </td>
            <td>${props.data.price}</td>
            <td>{props.data.shippingOptions}</td>
            <td><button className="btn btn-light" style={{color:"#966919"}} onClick={() => onRemoveFromCartClick(id)}>
              <span class="material-icons">remove_shopping_cart</span>
            </button></td>
        </tr>
    </>)
    
}

export default WishListCard;
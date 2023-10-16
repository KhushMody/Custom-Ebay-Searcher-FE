import React from "react";

function Card(props){
    var id = props.data.itemId[0];
    

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
            <td>add to cart</td>
        </tr>
    </>)
    
}

export default Card;
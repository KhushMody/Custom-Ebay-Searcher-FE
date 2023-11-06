import React from "react";

function Details(props){
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

      return(
        <div className="text-end mb-3">
            <button
                className="btn btn-light"
                onClick={() => onProductNameClick(props.itemId)}
            >
                Details<span class="material-symbols-outlined" style={{verticalAlign:"middle"}}>
                chevron_right
                </span>
            </button>
        </div>
      )
};

export default Details;
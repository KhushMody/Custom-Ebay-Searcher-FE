import React from "react";

function NavBar(props){

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
            // Handle the response data from your backend as needed
                console.log('Backend response for photos:', data);
                props.setPhotosData(data);
            })
            .catch((error) => {
            console.error('Error:', error);
            });
            props.setSelectedNavItem(navItem);
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
            <div>
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
                        onClick={() => handleNavItemClick('similar-products')}
                        style={props.selectedNavItem === 'similar-products' ? activeNavItemStyle : navItemStyle}
                    >
                        Similar Products
                    </li>
                </ul>
            </div>
        </>
    );
}

export default NavBar;
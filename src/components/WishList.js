import React from "react";
import WishListCard from "./WishListCard";

function createEntries(cardTerm, i, setSelectedItem, setItemId, setNavigationBar, setFavoritesData, removeCartItem, setCheckWishlist, setWishListArray, wishListArray, itemId){
    return(<WishListCard
        data={cardTerm}
        keys={i}
        key = {i}
        setSelectedItem={setSelectedItem}
        setItemId = {setItemId}
        setNavigationBar = {setNavigationBar}
        setFavoritesData = {setFavoritesData}
        removeCartItem = {removeCartItem}
        setCheckWishlist = {setCheckWishlist}
        setWishListArray = {setWishListArray}
        wishListArray = {wishListArray}
        itemId = {itemId}
        //setLocalFavoritesData = {setLocalFavoritesData}
    />);
}


function WishList(props){
    console.log(props.favoritesData);
    //const item = props.favoritesData[0];
    //var i=0;
    return(
      <div className="table-responsive">
        <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Image</th>
                  <th scope="col">Title</th>
                  <th scope="col">Price</th>
                  <th scope="col">Shipping</th>
                  <th scope="col">Wish List</th>
                </tr>
              </thead>
              <tbody>
                {props.favoritesData.map((item, i) => {
                  return createEntries(item, i + 1, props.setSelectedItem, props.setItemId, props.setNavigationBar, props.setFavoritesData, props.removeCartItem, props.setCheckWishlist, props.setWishListArray, props.wishListArray, props.itemId);
                })}
              </tbody>
        </table>
      </div>
    );
};

export default WishList;
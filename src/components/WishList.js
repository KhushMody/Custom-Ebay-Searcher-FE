import React, { useState } from "react";
import WishListCard from "./WishListCard";
import '../style/card.css'

function createEntries(cardTerm, i, setSelectedItem, setItemId, setNavigationBar, setFavoritesData, removeCartItem, setCheckWishlist, setWishListArray, wishListArray, itemId, ){
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
function returnCost(data){
  var totalCost = 0;
  data.map(item=>totalCost+=Number(item.price));
  return <>{totalCost}</>
}

function WishList(props){
    //const [totalCost, setTotalCost] = useState(0);
    console.log(props.favoritesData);
    console.log(props.favoritesData.length)
    //const item = props.favoritesData[0];
    //var i=0;
    return(
      <>
      {
        props.favoritesData.length>0 && (<div className="table-responsive">
        <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Image</th>
                  <th scope="col" className="overFlow">Title</th>
                  <th scope="col">Price</th>
                  <th scope="col">Shipping</th>
                  <th scope="col">Wish List</th>
                </tr>
              </thead>
              <tbody>
                {props.favoritesData.map((item, i) => {
                  return createEntries(item, i + 1, props.setSelectedItem, props.setItemId, props.setNavigationBar, props.setFavoritesData, props.removeCartItem, props.setCheckWishlist, props.setWishListArray, props.wishListArray, props.itemId);
                })}
                <tr><td colSpan={"4"}></td><td className="fw-bold">Total Shipping</td><td className="fw-bold">${returnCost(props.favoritesData)}</td></tr>
              </tbody>
        </table>
      </div>)
      }
      {props.favoritesData.length === 0 && <div className="alert alert-warning" role="alert">
  No Records.
</div>}
      </>
      
    );
};

export default WishList;
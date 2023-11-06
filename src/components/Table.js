import React, { useState,useEffect } from "react";
import Card from "./Card";
import '../style/card.css'

function createEntries(cardTerm, i, setSelectedItem, setItemId, setNavigationBar, setFavoritesData, favoritesData, removeCartItem, wishListArray, setWishListArray, setDetailsButton, itemId, wishlistTotal, setWishlistTotal){
    return(<Card
        data={cardTerm}
        keys={i}
        key = {i}
        setSelectedItem={setSelectedItem}
        setItemId = {setItemId}
        setNavigationBar = {setNavigationBar}
        setFavoritesData = {setFavoritesData}
        favoritesData = {favoritesData}
        removeCartItem = {removeCartItem}
        setWishListArray = {setWishListArray}
        wishListArray = {wishListArray}
        setDetailsButton = {setDetailsButton}
        itemId = {itemId}
        wishlistTotal = {wishlistTotal}
        setWishlistTotal = {setWishlistTotal}
    />);
}

function Table(props) {
    const dataEntries = props.data;
    const [currentPage, setCurrentPage] = useState(1);
    //setCurrentTable('findItems');
    useEffect(() => {
      if (dataEntries === undefined) return;
    }, [dataEntries]);
  
    // Calculate the total number of pages based on the count of items
    const totalCount = parseInt(dataEntries[0]["@count"], 10);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(totalCount / itemsPerPage);
  
    // Create an array of page numbers
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    return (
      <div className="container">
  {totalCount > 0 && (
    <>
      <div className="table-responsive">
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col" className="col-6 overFlow">Title</th>
              <th scope="col">Price</th>
              <th scope="col">Shipping</th>
              <th scope="col">Zip</th>
              <th scope="col">Wish List</th>
            </tr>
          </thead>
          <tbody>
            {dataEntries[0]["item"].slice(startIndex, endIndex).map((item, i) => {
              return createEntries(item, i + 1 + startIndex, props.setSelectedItem, props.setItemId, props.setNavigationBar, props.setFavoritesData, props.favoritesData, props.removeCartItem, props.wishListArray, props.setWishListArray, props.setDetailsButton, props.itemId, props.wishlistTotal, props.setWishlistTotal);
            })}
          </tbody>
        </table>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <div className="pagination" style={{ alignItems: "center", textAlign: "center" , verticalAlign:"center"}}>
            <div style={{verticalAlign:"middle"}}>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn btn-light underline-on-hover"
              style={{ borderRadius: "0" }}
            >
              <span class="material-symbols-outlined" style={{ verticalAlign: "middle" }}>
              keyboard_double_arrow_left
              </span>
              <span style={{verticalAlign:"middle"}}>
              Previous
              </span>
            </button>
            </div>
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`btn ${currentPage === page ? "btn-primary" : "btn-light"} underline-on-hover`}
              style={{ borderRadius: "0" }}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn btn-light underline-on-hover"
            style={{ borderRadius: "0" }}
          >
            Next
            <span class="material-symbols-outlined" style={{ verticalAlign: "middle" }}>
            keyboard_double_arrow_right
            </span>
          </button>
        </div>
      </div>
    </>
  )}
  {totalCount === 0 && <div class="alert alert-warning" role="alert">
  No Records.
</div>}
  {/* {currentTable === ''} */}
</div>

    );
}

export default Table;
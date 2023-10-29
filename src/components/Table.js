import React, { useState,useEffect } from "react";
import Card from "./Card";

function createEntries(cardTerm, i, setSelectedItem, setItemId, setNavigationBar, setFavoritesData, favoritesData, removeCartItem, wishListArray, setWishListArray){
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
      <>
        {totalCount > 0 && (
          <>
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Image</th>
                  <th scope="col">Title</th>
                  <th scope="col">Price</th>
                  <th scope="col">Shipping</th>
                  <th scope="col">Zip</th>
                  <th scope="col">Wish List</th>
                </tr>
              </thead>
              <tbody>
                {dataEntries[0]["item"].slice(startIndex, endIndex).map((item, i) => {
                  return createEntries(item, i + 1 + startIndex, props.setSelectedItem, props.setItemId, props.setNavigationBar, props.setFavoritesData, props.favoritesData, props.removeCartItem, props.wishListArray, props.setWishListArray);
                })}
              </tbody>
            </table>
  
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`btn ${currentPage === page ? "btn-primary" : "btn-secondary"}`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
        {totalCount === 0 && <h1>No content received from the server</h1>}
        {/* {currentTable === ''} */}
      </>
    );
}

export default Table;
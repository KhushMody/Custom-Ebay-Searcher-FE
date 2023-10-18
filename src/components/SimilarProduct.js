import React, { useState } from "react";

function SimilarProduct(props) {
  const { similarProductsData } = props;
  const [sortCategory, setSortCategory] = useState("Default");
  const [sortOrder, setSortOrder] = useState("Ascending");
  const [showAll, setShowAll] = useState(false);

  const similarItems = similarProductsData?.getSimilarItemsResponse?.itemRecommendations?.item || [];

  // Sorting function based on selected sort category and order
  const sortedItems = [...similarItems].sort((a, b) => {
    if (sortCategory === "Default") return 0;

    if (sortOrder === "Ascending") {
      if (sortCategory === "Product Name") {
        return a.title.localeCompare(b.title);
      } else if (sortCategory === "Days Left") {
        return a.timeLeft.localeCompare(b.timeLeft);
      } else if (sortCategory === "Price") {
        return a.buyItNowPrice.__value__ - b.buyItNowPrice.__value__;
      } else if (sortCategory === "Shipping Cost") {
        return a.shippingCost.__value__ - b.shippingCost.__value__;
      }
    } else {
      if (sortCategory === "Product Name") {
        return b.title.localeCompare(a.title);
      } else if (sortCategory === "Days Left") {
        return b.timeLeft.localeCompare(a.timeLeft);
      } else if (sortCategory === "Price") {
        return b.buyItNowPrice.__value__ - a.buyItNowPrice.__value__;
      } else if (sortCategory === "Shipping Cost") {
        return b.shippingCost.__value__ - a.shippingCost.__value__;
      }
    }
  });

  const maxItems = showAll ? sortedItems.length : 5;

  return (
    <div style={{ backgroundColor: "black", color: "white", padding: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <label>Sort By: </label>
          <select onChange={(e) => setSortCategory(e.target.value)}>
            <option value="Default">Default</option>
            <option value="Product Name">Product Name</option>
            <option value="Days Left">Days Left</option>
            <option value="Price">Price</option>
            <option value="Shipping Cost">Shipping Cost</option>
          </select>
        </div>
        <div>
          <label>Sort Order: </label>
          <select onChange={(e) => setSortOrder(e.target.value)}>
            <option value="Ascending">Ascending</option>
            <option value="Descending">Descending</option>
          </select>
        </div>
      </div>
      {sortedItems.slice(0, maxItems).map((item, index) => {
        const daysMatch = item.timeLeft.match(/(\d+)D/);
        const days = daysMatch ? parseInt(daysMatch[1], 10) : 0;
        return (
          <div key={index} style={{ marginBottom: "20px" }}>
            <table>
              <tr style={{ borderBottom: "2px solid white", paddingBottom: "10px" }}>
                <td>
                  <img src={item.imageURL} style={{ height: "100px", width: "100px" }} alt="item" />
                </td>
                <td>
                  <a href={item.viewItemURL} style={{ color: "white" }}>{item.title}</a>
                </td>
                <td>Price: ${item.buyItNowPrice.__value__}</td>
                <td>Shipping Cost: ${item.shippingCost.__value__}</td>
                <td>Days Left: {days} days</td>
              </tr>
            </table>
          </div>
        );
      })}
      <div style={{ textAlign: "center" }}>
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
}

export default SimilarProduct;

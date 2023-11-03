import React, { useState } from "react";
import '../style/similarproducts.css'

function SimilarProduct(props) {
  const { similarProductsData } = props;
  const [sortCategory, setSortCategory] = useState("Default");
  const [sortOrder, setSortOrder] = useState("Ascending");
  const [showAll, setShowAll] = useState(false);

  const similarItems = similarProductsData?.getSimilarItemsResponse?.itemRecommendations?.item || [];

  const getDaysLeft = (timeLeft) => {
    const daysMatch = timeLeft.match(/(\d+)D/);
    return daysMatch ? parseInt(daysMatch[1], 10) : 0;
  };

  // Sorting function based on selected sort category and order
  const sortedItems = [...similarItems].sort((a, b) => {
    if (sortCategory === "Default") return 0;

    if (sortOrder === "Ascending") {
      if (sortCategory === "Product Name") {
        return a.title.localeCompare(b.title);
      } else if (sortCategory === "Days Left") {
        return getDaysLeft(a.timeLeft) - getDaysLeft(b.timeLeft);
      } else if (sortCategory === "Price") {
        return a.buyItNowPrice.__value__ - b.buyItNowPrice.__value__;
      } else if (sortCategory === "Shipping Cost") {
        return a.shippingCost.__value__ - b.shippingCost.__value__;
      }
    } else {
      if (sortCategory === "Product Name") {
        return b.title.localeCompare(a.title);
      } else if (sortCategory === "Days Left") {
        return getDaysLeft(b.timeLeft) - getDaysLeft(a.timeLeft);
      } else if (sortCategory === "Price") {
        return b.buyItNowPrice.__value__ - a.buyItNowPrice.__value__;
      } else if (sortCategory === "Shipping Cost") {
        return b.shippingCost.__value__ - a.shippingCost.__value__;
      }
    }
  });

  const maxItems = showAll ? sortedItems.length : 5;

  return (
    <div style={{ padding: "10px" }}>
      <div style={{ padding: "10px" }}>
        <div className="mb-3 row">
          <div style={{ marginRight: "5px" }} className="col-md-2 col-sm-12">
            <select onChange={(e) => setSortCategory(e.target.value)} className="col-sm-12">
              <option value="Default">Default</option>
              <option value="Product Name">Product Name</option>
              <option value="Days Left">Days Left</option>
              <option value="Price">Price</option>
              <option value="Shipping Cost">Shipping Cost</option>
            </select>
          </div>
          <div className="col-md-2 col-sm-12">
            <select onChange={(e) => setSortOrder(e.target.value)} className="col-sm-12">
              <option value="Ascending">Ascending</option>
              <option value="Descending">Descending</option>
            </select>
          </div>
        </div>
      </div>
      {sortedItems.slice(0, maxItems).map((item, index) => {
        const daysMatch = item.timeLeft.match(/(\d+)D/);
        const days = daysMatch ? parseInt(daysMatch[1], 10) : 0;
        return (
          <div key={index}  >
            <table className="table table-striped table-dark">
            <tr className="row">
              <div className="col-sm-12 col-md-2" style={{backgroundColor: '#343a40', margin: "0", padding: "0", border: "none" }}>
                <td style={{backgroundColor: '#343a40', borderColor: '#343a40'}}>
                  <img src={item.imageURL} style={{ height: "100px", width: "100px", backgroundColor: '#343a40', margin: "0", padding: "0", border: "none" }} alt="item" />
                </td>
              </div>
              <div className="col-md-10 col-sm-12" style={{backgroundColor: '#343a40'}}>
                <td style={{backgroundColor: '#343a40', borderColor: '#343a40'}}>
                  <p
                    style={{ color: "blue", cursor: "pointer", backgroundColor: '#343a40', margin: "0", padding: "0", border: "none" }}
                    onClick={() => window.open(item.viewItemURL, "_blank")}
                  >
                    {item.title}
                  </p>
                  <p style={{color:'#32CD32', backgroundColor: '#343a40', margin: "0", padding: "0", border: "none"}}>Price: ${item.buyItNowPrice.__value__}</p>
                  <p style={{color:'#f5bd1f',backgroundColor: '#343a40', margin: "0", padding: "0", border: "none"}}>Shipping Cost: ${item.shippingCost.__value__}</p>
                  <p style={{backgroundColor: '#343a40', margin: "0", padding: "0", border: "none"}}>Days Left: {days} days</p>
                </td>
              </div>
            </tr>

            </table>
          </div>
        );
      })}
      <div style={{ textAlign: "center" }}>
        <button onClick={() => setShowAll(!showAll)} className="btn btn-dark">
          {showAll ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
}

export default SimilarProduct;

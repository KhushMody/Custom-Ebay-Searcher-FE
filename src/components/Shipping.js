import React, { useEffect } from "react";

function Shipping(props) {
    console.log(props.itemId);
    const dataEntries = props.data;
    console.log(dataEntries);
    console.log(props.favoritesData.find(item => item.itemId === props.itemId));
    
    // Check if dataEntries is undefined and use props.favoritesData as a fallback
    const selectedItemFromData = dataEntries
        ? dataEntries[0]["item"].find(item => item.itemId[0] === props.itemId)
        : null;

    const selectedItem = selectedItemFromData || props.favoritesData.find(item => item.itemId === props.itemId);
    console.log(selectedItem);

    // If dataEntries is undefined, use shippingInfo and shippingCost from favoritesData
    var shippingInfo;
    if(selectedItemFromData){
        shippingInfo = selectedItem.shippingInfo[0];
    }
    else{
        shippingInfo = selectedItem.shippingInfo;
    }
    // const shippingInfo = selectedItem.shippingInfo
    //     ? selectedItem.shippingInfo[0]
    //     : selectedItem.shippingInfo;

    console.log("shipping info", shippingInfo);

    const shippingCost = shippingInfo.shippingServiceCost[0];

    const shippingCostDisplay =
        shippingCost["@currencyId"] === "USD" && shippingCost["__value__"] === "0.0"
            ? "Free Shipping"
            : `${shippingCost["@currencyId"]} ${shippingCost["__value__"]}`;

    return (
        <div>
            <table className="table table-striped table-dark">
                <tbody>
                    {shippingInfo.shippingServiceCost && (
                        <tr>
                            <th scope="row">Shipping Cost</th>
                            <td>{shippingCostDisplay}</td>
                        </tr>
                    )}

                    {shippingInfo.shipToLocations && (
                        <tr>
                            <th scope="row">Shipping Locations</th>
                            <td>{shippingInfo.shipToLocations[0]}</td>
                        </tr>
                    )}
                    {shippingInfo.handlingTime && (
                        <tr>
                            <th scope="row">Handling Time</th>
                            <td>{shippingInfo.handlingTime[0]} Day</td>
                        </tr>
                    )}
                    {shippingInfo.expeditedShipping && (
                        <tr>
                            <th scope="row">Expedited Shipping</th>
                            <td>{shippingInfo.expeditedShipping[0]}</td>
                        </tr>
                    )}
                    {shippingInfo.oneDayShippingAvailable && (
                        <tr>
                            <th scope="row">One-Day Shipping Available</th>
                            <td>{shippingInfo.oneDayShippingAvailable[0]}</td>
                        </tr>
                    )}
                    {selectedItem.returnsAccepted && (
                        <tr>
                            <th scope="row">Returns Accepted</th>
                            <td>{selectedItem.returnsAccepted[0]}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Shipping;

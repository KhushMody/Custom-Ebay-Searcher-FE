import React, { useEffect } from "react";

function Shipping(props) {
    console.log(props.itemId);
    const dataEntries = props.data;
    console.log(dataEntries);
    //console.log(props.favoritesData.find(item => item.itemId === props.itemId));
    
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
                            <div className="container">
                                <div className="row">
                                    <div className='col-sm-12 col-lg-6 fw-bolder'>Shipping Cost</div>
                                    <div className='col-sm-12 col-lg-6'>{shippingCostDisplay}</div>
                                </div>
                            </div>
                        </tr>
                    )}

                    {shippingInfo.shipToLocations && (
                        <tr>
                            <div className="container">
                                <div className="row">
                                    <div className='col-sm-12 col-lg-6 fw-bolder'>Shipping Locations</div>
                                    <div className='col-sm-12 col-lg-6'>{shippingInfo.shipToLocations[0]}</div>
                                </div>
                            </div>
                        </tr>
                    )}
                    {shippingInfo.handlingTime && (
                        <tr>
                            <div className="container">
                                <div className="row">
                                    <div className='col-sm-12 col-lg-6 fw-bolder'>Handling Time</div>
                                    <div className='col-sm-12 col-lg-6'>{shippingInfo.handlingTime[0]} Day</div>
                                </div>
                            </div>
                        </tr>
                    )}
                    {shippingInfo.expeditedShipping && (
                        <tr>
                            <div className="container">
                                <div className="row">
                                    <div className='col-sm-12 col-lg-6 fw-bolder'>Expedited Shipping</div>
                                    <div className='col-sm-12 col-lg-6'>{shippingInfo.expeditedShipping[0] === 'true' ? (<span class="material-symbols-outlined" style={{color:"green"}}>done</span>):(<span class="material-symbols-outlined" style={{color:"red"}}>close</span>)}</div>
                                </div>
                            </div>
                        </tr>
                    )}
                    {shippingInfo.oneDayShippingAvailable && (
                        <tr>
                            <div className="container">
                                <div className="row">
                                    <div className='col-sm-12 col-lg-6 fw-bolder'>One-Day Shipping Available</div>
                                    <div className='col-sm-12 col-lg-6'>{shippingInfo.oneDayShippingAvailable[0] === 'true' ? (<span class="material-symbols-outlined" style={{color:"green"}}>done</span>):(<span class="material-symbols-outlined" style={{color:"red"}}>close</span>)}</div>
                                </div>
                            </div>
                        </tr>
                    )}
                    {selectedItem.returnsAccepted && (
                        <tr>
                            <div className="container">
                                <div className="row">
                                    <div className='col-sm-12 col-lg-6 fw-bolder'>Returns Accepted</div>
                                    <div className='col-sm-12 col-lg-6'>{selectedItem.returnsAccepted[0] === 'true' ? (<span class="material-symbols-outlined" style={{color:"green"}}>done</span>):(<span class="material-symbols-outlined" style={{color:"red"}}>close</span>)}</div>
                                </div>
                            </div>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Shipping;

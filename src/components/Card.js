import React from "react";

function Card(props){
    return(<>
        <tr>
            <td>{props.keys}</td>
            <td><img src={props.data.galleryURL[0]} style={{height:'100px', width:'100px'}} alt="item"/></td>
            <td>{props.data.title[0]}</td>
            <td>${props.data.sellingStatus[0].currentPrice[0].__value__}</td>
            <td>{props.data.shippingInfo[0].shippingType[0]}</td>
            <td>{props.data.postalCode[0]}</td>
            <td>add to cart</td>
        </tr>
    </>)
    
}

export default Card;
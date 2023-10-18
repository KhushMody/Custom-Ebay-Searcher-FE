import React from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Seller(props){
    console.log(props.selectedItem)
    const sellerInfo = props.selectedItem.Item.Seller;
    const storeInfo = props.selectedItem.Item.Storefront;
    return(
        <table className="table table-striped table-dark">
                <thead>
                    {storeInfo.StoreName &&(
                    <tr>
                        <th colspan="100%">{storeInfo.StoreName}</th>
                    </tr>)}
                </thead>
                <tbody>
                    {sellerInfo.FeedbackScore && (
                        <tr>
                            <th scope="row">Feedback Score</th>
                            <td>{sellerInfo.FeedbackScore}</td>
                        </tr>
                    )}
                    {sellerInfo.PositiveFeedbackPercent && (
                        <tr>
                            <th scope="row">Popularity</th>
                            <td > <div style={{ width: '30px', height: '30px' }}>
                            <CircularProgressbar value={sellerInfo.PositiveFeedbackPercent} text={`${sellerInfo.PositiveFeedbackPercent}`} styles={{text: {
            fill: "white",
            // Text size
            fontSize: "35px",
            //fontWeight: "900 !important",
            //textShadow: "0 0 2px #000",
          }}}/>
                            </div></td>
                            {/* <td>{sellerInfo.PositiveFeedbackPercent}</td> */}
                        </tr>
                    )}
                    {sellerInfo.FeedbackRatingStar && (
                        <tr>
                            <th scope="row">Feedback Rating Star</th>
                            <td><i class="material-icons" style={{color:`${sellerInfo.FeedbackRatingStar}`}}>star_border</i></td>
                        </tr>
                    )}
                    {sellerInfo.TopRatedSeller && (
                        <tr>
                            <th scope="row">Top Rated</th>
                            <td>{sellerInfo.TopRatedSeller}</td>
                        </tr>
                    )}
                    {storeInfo.StoreName &&(
                    <tr>
                        <th scope="row">Store Name</th>
                        <td >{storeInfo.StoreName}</td>
                    </tr>)}
                    {storeInfo.StoreURL &&(
                    <tr>
                        <th scope="row">Buy Product At</th>
                        <td><a href ={storeInfo.StoreURL}>Store</a></td>
                    </tr>)}

                </tbody>
        </table>
    );
};

export default Seller;
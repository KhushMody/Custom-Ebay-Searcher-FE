import React from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Seller(props) {
    console.log(props.selectedItem)
    const sellerInfo = props.selectedItem.Item.Seller;
    const storeInfo = props.selectedItem.Item.Storefront;
    
    return (
        <table className="table table-striped table-dark">
            <thead>
                {storeInfo && sellerInfo.UserID && (
                    <tr style={{textAlign:"center"}}>
                        <th colspan="100%">{sellerInfo.UserID}</th>
                    </tr>
                )}
            </thead>
            <tbody>
                {sellerInfo.FeedbackScore && (
                    <tr>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-sm-12 col-lg-6 fw-bolder'>Feedback Score</div>
                                <div className='col-sm-12 col-lg-6'>{sellerInfo.FeedbackScore}</div>
                            </div>
                        </div>
                    </tr>
                )}
                {sellerInfo.PositiveFeedbackPercent && (
                    <tr>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-sm-12 col-lg-6 fw-bolder'>Popularity</div>
                                <div className='col-sm-12 col-lg-6'><div style={{ width: '30px', height: '30px' }}>
                                <CircularProgressbar value={sellerInfo.PositiveFeedbackPercent} text={`${sellerInfo.PositiveFeedbackPercent}`} styles={{
                                    text: {
                                        fill: "white",
                                        fontSize: "35px",
                                    },
                                    path:{
                                        stroke:"green"
                                    }
                                }}/>
                            </div></div>
                            </div>
                        </div>
                    </tr>
                )}
                {sellerInfo.FeedbackRatingStar && (
                    <tr>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-sm-12 col-lg-6 fw-bolder'>Feedback Rating Star</div>
                                <div className='col-sm-12 col-lg-6'>{sellerInfo.FeedbackScore >= 10000 ? (
                                <i className="material-icons" style={{ color: `${sellerInfo.FeedbackRatingStar}` }}>stars</i>
                            ) : (
                                <i className="material-icons" style={{ color: `${sellerInfo.FeedbackRatingStar}` }}>star_border</i>
                            )}</div>
                            </div>
                        </div>
                    </tr>
                )}
                {sellerInfo.TopRatedSeller && (
                    <tr>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-sm-12 col-lg-6 fw-bolder'>Top Rated</div>
                                <div className='col-sm-12 col-lg-6'>{sellerInfo.TopRatedSeller === true ? (<span class="material-symbols-outlined" style={{color:"green"}}>done</span>):(<span class="material-symbols-outlined" style={{color:"red"}}>close</span>)}</div>
                            </div>
                        </div>
                    </tr>
                )}
                {storeInfo && storeInfo.StoreName && (
                    <tr>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-sm-12 col-lg-6 fw-bolder'>Store Name</div>
                                <div className='col-sm-12 col-lg-6'>{storeInfo.StoreName}</div>
                            </div>
                        </div>
                    </tr>
                )}
                {storeInfo && storeInfo.StoreURL && (
                    <tr>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-sm-12 col-lg-6 fw-bolder'>Buy Product At</div>
                                <div className='col-sm-12 col-lg-6'><a href={storeInfo.StoreURL} target="_blank">Store</a></div>
                            </div>
                        </div>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default Seller;

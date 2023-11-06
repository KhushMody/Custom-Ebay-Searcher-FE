import React, { useEffect, useState } from 'react';
//import { Modal, Button, Navbar } from 'react-bootstrap';
import { Modal, Button, Carousel } from 'react-bootstrap';
import '../style/item.css'

import NavBar from './NavBar';

const Item = (props) => {

    const [showModal, setShowModal] = useState(false);
    //const [selectedNavItem, setSelectedNavItem] = useState('product');

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    useEffect(()=>{
        console.log('logging props.selectedItem',props.selectedItem.Item.PictureURL);
    }, []);

    const renderNameValueList = () => {
        if (props.selectedItem.Item.ItemSpecifics && props.selectedItem.Item.ItemSpecifics.NameValueList) {
            return props.selectedItem.Item.ItemSpecifics.NameValueList.map((item, index) => (
                <tr key={index}>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-sm-12 col-lg-2 fw-bolder'>{item.Name}</div>
                                <div className='col-sm-12 col-lg-10'>{Array.isArray(item.Value) ? item.Value.join(', ') : item.Value}</div>
                            </div>
                        </div>
                </tr>
            ));
        }
    };

    

const renderPictureModal = () => {
  return (
    <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
      <div className="modal-dialog image-modal" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">PictureURL</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <div id="imageCarousel" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                {props.selectedItem.Item.PictureURL.map((url, index) => (
                  <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                    <img src={url} alt={`Picture ${index}`} className="d-block w-100" />
                  </div>
                ))}
              </div>
              <a className="carousel-control-prev" href="#imageCarousel" type="button" data-bs-slide="prev">
                <span className="carousel-control-prev-icon bg-dark" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </a>
              <a className="carousel-control-next" href="#imageCarousel" type="button" data-bs-slide="next">
                <span className="carousel-control-next-icon bg-dark" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </a>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};


      
      
      
      


    return (
        <div>
            

            {renderPictureModal()}

            
            <table class="table table-striped table-dark">
                <tbody>
                    <tr>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-sm-12 col-lg-2 fw-bolder'>Product Images</div>
                                <div className='col-sm-12 col-lg-10'>
                                    <p onClick={handleShow} style={{color:'blue'}} className='underline-on-hover'>
                                            View Product Images Here
                                    </p>
                                </div>
                            </div>
                        </div> 
                    </tr>
                    <tr>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-sm-12 col-lg-2 fw-bolder'>Price</div>
                                <div className='col-sm-12 col-lg-10'>${props.selectedItem.Item.CurrentPrice.Value}</div>
                            </div>
                        </div>
                    </tr>
                    <tr>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-sm-12 col-lg-2 fw-bolder'>Location</div>
                                <div className='col-sm-12 col-lg-10'>{props.selectedItem.Item.Location}</div>
                            </div>
                        </div>
                    </tr>
                    <tr>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-sm-12 col-lg-2 fw-bolder'>Return Policy</div>
                                <div className='col-sm-12 col-lg-10'>{props.selectedItem.Item.ReturnPolicy.ReturnsAccepted} within {props.selectedItem.Item.ReturnPolicy.ReturnsWithin}</div>
                            </div>
                        </div>
                    </tr>
                    {renderNameValueList()}
                </tbody>
            </table>
        </div>
    );
};

export default Item;
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
          <Modal show={showModal} onHide={handleClose} dialogClassName="image-modal">
            <Modal.Header closeButton>
              <Modal.Title>PictureURL</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Carousel interval={null} className="custom-carousel">
                {props.selectedItem.Item.PictureURL.map((url, index) => (
                    <Carousel.Item key={index} className="p-0">
                    <img src={url} alt={`Picture ${index}`} style={{ width: '100%' }} />
                    </Carousel.Item>
                ))}
            </Carousel>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
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
                                    <p onClick={handleShow} style={{color:'blue'}}>
                                            View Pictures
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
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const Item = (props) => {

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    useEffect(()=>{
        console.log('logging props.selectedItem',props.selectedItem);
    }, []);

    const renderNameValueList = () => {
        if (props.selectedItem.Item.ItemSpecifics && props.selectedItem.Item.ItemSpecifics.NameValueList) {
            return props.selectedItem.Item.ItemSpecifics.NameValueList.map((item, index) => (
                <tr key={index}>
                    <th scope="row">{item.Name}</th>
                    <td>{Array.isArray(item.Value) ? item.Value.join(', ') : item.Value}</td>
                </tr>
            ));
        }
    };

    const renderPictureModal = () => {
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>PictureURL</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {props.selectedItem.Item.PictureURL.map((url, index) => (
                            <img key={index} src={url} alt={`Picture ${index}`} style={{ width: '100%' }} />
                        ))}
                    </div>
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
            <div>
                <h3 style={{alignItems:'center'}}>{props.selectedItem.Item.Title}</h3>
            </div>
            {renderPictureModal()}
            <table class="table table-striped table-dark">
                <tbody>
                    <tr>
                        <th scope="row">Product Images</th>
                        <td>
                            <p onClick={handleShow} style={{color:'blue'}}>
                                    View Pictures
                            </p>
                        </td>
                        
                    </tr>
                    <tr>
                        <th scope="row">Price</th>
                        <td>${props.selectedItem.Item.CurrentPrice.Value}</td>
                    </tr>
                    <tr>
                        <th scope="row">Location</th>
                        <td>{props.selectedItem.Item.Location}</td>
                    </tr>
                    <tr>
                        <th scope="row">Return Policy</th>
                        <td>{props.selectedItem.Item.ReturnPolicy.ReturnsAccepted} within {props.selectedItem.Item.ReturnPolicy.ReturnsWithin}</td>
                    </tr>
                    {renderNameValueList()}
                </tbody>
            </table>
        </div>
    );
};

export default Item;
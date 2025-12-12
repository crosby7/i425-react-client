/*
Name: Nicholas Pruett
Date: 12/11/2025
File: supplier.jsx
Description: Creates the supplier component.
 */


import {settings} from "../../config/config.jsx";
import {useAuth} from "../../services/useAuth";
import useAxios from "../../services/useAxios";
import {useParams, useNavigate} from "react-router-dom";
import {Modal, Button} from 'react-bootstrap';
import "/src/assets/css/supplier.css";



const Supplier = ({show, setShow}) => {
    const {supplierId} = useParams();
    const url = settings.baseApiUrl + "/suppliers/" + supplierId;
    const {user} = useAuth();
    const navigate = useNavigate();
    const handleClose = () => {setShow(false); navigate("/suppliers")};

    //fetch course data using the useAxios hook
    const {
        error,
        isLoading,
        data: supplier
    } = useAxios(url, "GET", {Authorization: "Bearer " + user.jwt});
    return (
        <>
            <Modal show={show} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton>
                    <h4>{supplier && supplier.name}</h4>
                </Modal.Header>
                <Modal.Body>
                    {error && <div>{error}</div>}
                    {isLoading &&
                        <div className="image-loading">
                            Please wait while data is being loaded
                            <img src="/src/assets/img/loading.gif" alt="Loading ......"/>
                        </div>
                    }
                    {supplier &&
                        <div className="supplier-detail-container">
                            <div className="supplier-detail-row">
                                <div>ID</div><div>{supplier.supplierId}</div>
                            </div>
                            <div className="supplier-detail-row">
                                <div>Name</div><div>{supplier.name}</div>
                            </div>
                            <div className="supplier-detail-row">
                                <div>Phone</div><div>{supplier.phone}</div>
                            </div>
                            <div className="supplier-detail-row">
                                <div>Email</div><div>{supplier.email}</div>
                            </div>
                            <div className="supplier-detail-row">
                                <div>Address</div><div>{supplier.address}</div>
                            </div>
                            <div className="supplier-detail-row">
                                <div>Delivery Schedule</div><div>{supplier.deliverySchedule}</div>
                            </div>
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer style={{borderTop: "none"}}>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Supplier;
import {useState, useEffect} from "react";
import UseFetch from "../../services/useFetch";
import {useNavigate} from "react-router-dom";
import {Button, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";
import JSONPretty from "react-json-pretty";
import "/src/assets/css/producer.css";

const EditProducer =
    ({showModal, setShowModal, data, reload, setReload, setSubHeading}) => {
        console.log("in edit: ", data);
        const {error, isLoading, data: response, update} = UseFetch();
        const navigate = useNavigate();
        const [submitted, setSubmitted] = useState(false);
        const [showButton, setShowButton] = useState(true);

        const {register, handleSubmit, formState: {errors}} = useForm({
            defaultValues: data,
            shouldUseNativeValidation: false
        });
        const editFormOptions = {
            producerId: {required: "ID is required"},
            name: {required: "Name is required"},
            phone: {required: "Phone is required"},
            email: {required: "Email is required"},
            address: {required: "Address is required"}
        }
        const handleUpdate = (producer) => {
            update(producer);
            setSubmitted(true);
        }
        const handleCancel = () => {
            setShowModal(false);
            setSubHeading("All Producers");
            navigate("/producers")
        }
        const handleClose = () => {
            setShowModal(false);
            setShowButton(true);
            setSubmitted(false);
            setReload(!reload);
            setSubHeading("All Producers");
            navigate("/producers")
        }
        useEffect(() => {
            if (!submitted || error != null) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        })
        return (
            <>
                <Modal show={showModal} onHide={handleClose} centered animation={false} backdrop="static">
                    <Modal.Header closeButton>
                        <h4>Edit Producer</h4>
                    </Modal.Header>
                    <Modal.Body>
                        {error && <JSONPretty data={error} style={{color: "red"}}></JSONPretty>}
                        {isLoading &&
                            <div className="image-loading">
                                Please wait while data is being loaded
                                <img src="/src/assets/img/loading.gif" alt="Loading ......"/>
                            </div>
                        }
                        {response && <JSONPretty data={response}></JSONPretty>}
                        {(!submitted || error != null) &&
                            <form className="form-producer" id="form-producer-edit" onSubmit={handleSubmit(handleUpdate)}>
                                <ul className="form-producer-errors">
                                    {errors?.producerId && <li>{errors.producerId.message}</li>}
                                    {errors?.name && <li>{errors.name.message}</li>}
                                    {errors?.phone && <li>{errors.phone.message}</li>}
                                    {errors?.email && <li>{errors.email.message}</li>}
                                    {errors?.address && <li>{errors.address.message}</li>}
                                </ul>
                                <div className="form-group">
                                    <label>Producer ID</label>
                                    <input name="id" readOnly="readOnly" {...register('producerId', editFormOptions.producerId)}/>
                                </div>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" name="name" {...register('name', editFormOptions.name)}/>
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input name="phone" {...register('phone', editFormOptions.phone)}/>
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input name="email" {...register('email', editFormOptions.email)}/>
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input name="address" {...register('address', editFormOptions.address)}/>
                                </div>
                            </form>}
                    </Modal.Body>
                    <Modal.Footer style={{justifyContent: "center"}}>
                        <Button type="submit" form="form-producer-edit" variant="primary"
                                style={{display: (!showButton) ? "none" : ""}}>Update</Button>
                        <Button variant="secondary" onClick={handleCancel}
                                style={{display: (!showButton) ? "none" : ""}}>Cancel</Button>
                        <Button variant="primary" onClick={handleClose}
                                style={{display: (!showButton) ? "" : "none"}}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    };
export default EditProducer;
import {useEffect, useState} from 'react';
import UseFetch from "../../services/useFetch";
import JSONPretty from 'react-json-pretty';
import "/src/assets/css/producer.css";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../services/useAuth";
import EditProducer from "./editProducer";
import CreateProducer from "./createProducer";
import DeleteProducer from "./deleteProducer";


const Producers = () => {
    const {error, isLoading, data: producers, getAll} = UseFetch();

    const [subHeading, setSubHeading] = useState("All Producers");

    useEffect(() => {
        getAll();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const term = document.getElementById("producer-search-term").value;
        if(term == '')
            setSubHeading("All Producers");
        else if(isNaN(term))
            setSubHeading("Producers containing '" + term + "'");
        else if(!isNaN(term))
            setSubHeading("Producers whose name is " + term);

        search(term);
    }

    const clearSearchBox = (e) => {
        e.preventDefault();
        document.getElementById("producer-search-term").value = "";
        search("");
    }

    const navigate = useNavigate();
    const [activeProducer, setActiveProducer] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const[reload, setReload] = useState(false);

    const {user} = useAuth();
    const disabled = (user.role !== 1);

    useEffect(() => {
        getAll();
    }, [reload]);

    const handleEdit = (e) => {
        console.log('handling edit');
        if(disabled) return;

        //retrieve producer data and pass it to the update page
        let producer = {};
        ["producerId", "name", "phone", "email", "address"].forEach(function(key) {
            producer[key] =
                document.getElementById(`producer-${key}-` + e.target.id).innerText;
        });
        setActiveProducer(producer);
        navigate("/producers/" + e.target.id);
        setShowEditModal(true);
        setSubHeading("Edit Producer");
    }

    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleCreate = (e) => {
        if(disabled) return;

        setShowCreateModal(true);
        setSubHeading("Create Producer");
    }

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = (e) => {
        console.log('handling delete');
        if(disabled) return;
        let producer = {};
        ["producerId", "name", "phone", "email", "address"].forEach(function (key)
        {
            producer[key] =
                document.getElementById(`producer-${key}-` + e.target.id).innerText;
        });
        setActiveProducer(producer);
        setSubHeading("Delete Producer")
        navigate("/producers/" + e.target.id);
        setShowDeleteModal(true);
    }

    return (
        <>
            <div className="main-heading">
                <div className="container">Producer</div>
            </div>
            <div className="sub-heading">
                <div className="container">{subHeading}</div>
            </div>
            <div className="main-content container">
                {error && <JSONPretty data={error}></JSONPretty>}
                {isLoading &&
                    <div className="image-loading">
                        Please wait while data is being loaded
                        <img src="/src/assets/img/loading.gif" alt="Loading ......"/>
                    </div>}
                {producers &&
                    <div className="producer-container">
                        <form style={{textAlign: "right", marginBottom: "3px"}} onSubmit={handleSearch}>
                            <input id="producer-search-term" placeholder="Enter search terms"/>
                            <button type="submit" className="button-light"
                                    style={{marginLeft: "5px"}}>Search</button>
                            <button className="button-light" style={{marginLeft: "5px"}}
                                    onClick={clearSearchBox}>Clear</button>
                        </form>
                        <div className="producer-row producer-row-header row-header">
                            <div className="producer-info">
                                <div className="producer-id">Producer ID</div>
                                <div className="producer-name">Name</div>
                                <div className="producer-phone">Phone</div>
                                <div className="producer-email">Email</div>
                                <div className="producer-address">Address</div>
                            </div>
                            <div className="producer-buttons" style={{textAlign: "center"}}>Actions</div>
                        </div>
                        {producers.map((producer) => (
                            <div key={producer.producerId} className="producer-row">
                                <div className="producer-info">
                                    <div id={"producer-producerId-" + producer.producerId} className="producer-id">{producer.producerId}</div>
                                    <div id={"producer-name-" + producer.producerId} className="producer-name">{producer.name}</div>
                                    <div id={"producer-phone-" + producer.producerId} className="producer-phone">{producer.phone}</div>
                                    <div id={"producer-email-" + producer.producerId} className="producer-email">{producer.email}</div>
                                    <div id={"producer-address-" + producer.producerId} className="producer-address">{producer.address}</div>
                                </div>
                                <div className="producer-buttons">
                                    <button
                                        className="button-light"
                                        id={producer.producerId}
                                        disabled={disabled}
                                        onClick={handleEdit}>Edit</button>
                                    <button className="button-light" id={producer.producerId} disabled={disabled}
                                            onClick={handleDelete}>Delete</button>
                                </div>
                            </div>
                        ))}
                        {showEditModal &&
                            <EditProducer
                                showModal={showEditModal}
                                setShowModal={setShowEditModal}
                                data={activeProducer}
                                reload={reload}
                                setReload={setReload}
                                setSubHeading={setSubHeading}/>}
                        {showDeleteModal &&
                            <DeleteProducer
                                showModal={showDeleteModal}
                                setShowModal={setShowDeleteModal}
                                data={activeProducer}
                                reload={reload}
                                setReload={setReload}
                                setSubHeading={setSubHeading}/>}
                        {showCreateModal &&
                            <CreateProducer
                                showModal={showCreateModal}
                                setShowModal={setShowCreateModal}
                                reload={reload}
                                setReload={setReload}
                                setSubHeading={setSubHeading}/>}
                        <div>
                            <button className="button-create" disabled={disabled} onClick={handleCreate}>
                                Create Producer
                            </button>
                        </div>
                    </div>}
            </div>
        </>
    );
};

export default Producers;
import {settings} from "../../config/config";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";

const Pagination = ({suppliers, setUrl}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [sort, setSort] = useState("number:asc");
    const [pages, setPages] = useState({});  //first, last, previous, and next pages

    useEffect(() => {
        if(suppliers) {
            let pages = {};
            setLimit(suppliers.limit);
            setOffset(suppliers.offset);
            setTotalPages(Math.ceil(suppliers.totalCount/limit));
            setCurrentPage(suppliers.offset/suppliers.limit + 1);

            //Extract offset from each link and store it in pages
            suppliers.links.map((link) => {
                pages[link.rel] = link.href;
            });

            if(!suppliers.hasOwnProperty('prev')) {
                pages.prev = pages.self;
            }

            if(!suppliers.hasOwnProperty('next')) {
                pages.next = pages.self;
            }
            setPages(pages);
        }
    },[suppliers]);

    const handlePageClick = (e) => {
        setUrl(e.target.id + "&sort=" + sort);
    }

    const setItemsPerPage = (e) => {
        setLimit(e.target.value);
        setOffset(0);
        setUrl(`${settings.baseApiUrl}/suppliers?limit=${e.target.value}&offset=0&sort=${sort}`);
    }

    const sortSuppliers = (e) => {
        setSort(e.target.value);
        setUrl(`${settings.baseApiUrl}/suppliers?limit=${limit}&offset=${offset}&sort=${e.target.value}`);
    }

    return (
        <>
            {suppliers && <div className="supplier-pagination-container">
                <div className="supplier-pagination">
                    Showing page {currentPage} of {totalPages}&nbsp;
                    <Link to="#" title="First page" id={pages.first} onClick={handlePageClick}> &lt;&lt; </Link>
                    <Link to="#" title="Previous page" id={pages.prev} onClick={handlePageClick}> &lt; </Link>
                    <Link to="#" title="Next page" id={pages.next} onClick={handlePageClick}> &gt; </Link>
                    <Link to="#" title="Last page" id={pages.last} onClick={handlePageClick}> &gt;&gt; </Link>
                    Items per page &nbsp;
                    <select onChange={setItemsPerPage} defaultValue="10">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <div className="supplier-sorting"> Sort by:&nbsp;
                    <select onChange={sortSuppliers}>
                        <option value="number:asc">Number A-Z</option>
                        <option value="number:desc">Number Z-A</option>
                        <option value="title:asc">Title A-Z</option>
                        <option value="title:desc">Title Z-A</option>
                    </select>
                </div>
            </div>}
        </>
    );
};

export default Pagination;
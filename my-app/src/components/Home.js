// import { Fragment, useEffect, useState } from "react";
// import Tour from "./tour/tour";
// import { useDispatch, useSelector } from 'react-redux';
// import { getTours } from "../actions/tourAction";
// import { toast } from 'react-toastify';
// import MetaData from "./layouts/MetaData";
// import Pagination from 'react-js-pagination';
// import Loader from './layouts/loader';
// import { Link } from "react-router-dom";




// export default function Home() {

//     const dispatch = useDispatch();
//     const { tours, toursCount, resPerPage, loading, error } = useSelector((state) => state.toursState)
//     const [currentPage, setCurrentPage] = useState(1);

//     const setCurrentPageNo = (pageNo) => {
//         setCurrentPage(pageNo)
//     }

//     useEffect(() => {
//         dispatch(getTours(null, null, null, null, currentPage))
//     }, [dispatch, currentPage]);

//     useEffect(() => {
//         if (error) {
//             return toast.error(error, {
//                 position: "bottom-center"
//             });
//         }
//     }, [error])


//     return (
//         <Fragment>
//             {loading ? <Loader /> :
//                 <Fragment>
//                     <MetaData title={'Trending Tours'} />
//                     <h1 id="products_heading">Trending Tours</h1>

//                     <section id="products" className="container mt-5">
//                         <div className="row">
//                             {tours && tours.map(tour => (
//                                 <Tour col={4} key={tour._id} tour={tour} />
//                             ))}
//                         </div>
//                     </section>
//                     {toursCount > 0 && toursCount > resPerPage ?
//                         <div className="d-flex justify-content-center mt-5">
//                             <Pagination
//                                 activePage={currentPage}
//                                 onChange={setCurrentPageNo}
//                                 totalItemsCount={toursCount}
//                                 itemsCountPerPage={resPerPage}
//                                 nextPageText={'next'}
//                                 firstPageText={'first'}
//                                 lastPageText={'last'}
//                                 itemClass={'page-item'}
//                                 linkClass={'page-link'}
//                             />
//                         </div>
//                         : null}

//                     <Link to="/safaris" className="btn btn-primary btn-block mt-3">
//                         Trending Safari
//                     </Link>

//                 </Fragment>
//             }
//         </Fragment>
//     )
// }


import { Fragment, useEffect, useState } from "react";
import Tour from "./tour/tour";
import { useDispatch, useSelector } from 'react-redux';
import { getTours } from "../actions/tourAction";
import { toast } from 'react-toastify';
import MetaData from "./layouts/MetaData";
import Pagination from 'react-js-pagination';
import Loader from './layouts/loader';
import { Link } from "react-router-dom";
import Footer from "./layouts/footer";

export default function Home() {
    const dispatch = useDispatch();
    const { tours, toursCount, resPerPage, loading, error } = useSelector((state) => state.toursState)
    const [currentPage, setCurrentPage] = useState(1);

    const setCurrentPageNo = (pageNo) => {
        setCurrentPage(pageNo)
    }

    useEffect(() => {
        dispatch(getTours(null, null, null, null, currentPage))
    }, [dispatch, currentPage]);

    useEffect(() => {
        if (error) {
            return toast.error(error, {
                position: "bottom-center"
            });
        }
    }, [error])

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={'Trending Tours'} />

                    {/* Hero Section with Video Background */}
                    <section className="hero-section position-relative">
                        <div className="video-background">
                            <video
                                autoPlay
                                loop
                                muted
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    opacity: 1,
                                    zIndex: -1
                                }}
                            >
                                <source src="/videos/tours/SL-Tours.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div className="container py-5">
                            <div className="row">
                                <div className="col-lg-8 mx-auto text-center py-5 text-white">
                                    <h1 className="display-4 fw-bold mb-4" >Welcome to Adventure Tours</h1>
                                    <p className="lead mb-4">
                                        Discover the world's most breathtaking destinations with our expert guides.
                                        We've been creating unforgettable memories for over 15 years.
                                    </p>
                                    <p>
                                        Our tours are carefully curated to provide authentic experiences while
                                        ensuring your comfort and safety throughout the journey.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Trending Tours Section */}
                    <section id="products" className="container mt-5">
                        <h1 id="products_heading" className="text-center mb-5">Trending Tours</h1>
                        <div className="row">
                            {tours && tours.map(tour => (
                                <Tour col={4} key={tour._id} tour={tour} />
                            ))}
                        </div>
                    </section>

                    {toursCount > 0 && toursCount > resPerPage ?
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                onChange={setCurrentPageNo}
                                totalItemsCount={toursCount}
                                itemsCountPerPage={resPerPage}
                                nextPageText={'next'}
                                firstPageText={'first'}
                                lastPageText={'last'}
                                itemClass={'page-item'}
                                linkClass={'page-link'}
                            />
                        </div>
                        : null}

                    {/* Safari Promotion Section */}
                    <section className="safari-promo position-relative my-5 py-5">
                        <div className="video-background">
                            <video
                                autoPlay
                                loop
                                muted
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    opacity: 0.6,
                                    zIndex: -1
                                }}
                            >
                                <source src="/videos/safari/SL-Safari.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 mx-auto text-center">
                                    <h2 className="mb-4">Experience the Wild Like Never Before</h2>
                                    <p className="lead mb-4">
                                        Our safari adventures take you deep into the heart of nature's most
                                        spectacular landscapes. Witness majestic wildlife in their natural habitats
                                        with our expert guides.
                                    </p>
                                    <Link to="/safaris" className="btn btn-primary btn-lg mt-3">
                                        Explore Trending Safaris
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                </Fragment>
            }
            <Footer />
        </Fragment>
    )
}
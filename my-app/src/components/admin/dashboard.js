import { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../actions/userActions';
import { Link } from "react-router-dom";
import { getAdminTours } from '../../actions/tourAction';
import { adminBookings as adminBookingAction } from '../../actions/orderAction';


export default function Dashboard() {

    const { tours = [] } = useSelector(state => state.toursState);
    const { adminOrder = [] } = useSelector(state => state.orderState);
    const { users = [] } = useSelector(state => state.userState);
    const dispatch = useDispatch();


    let totalAmount = adminOrder.reduce((acc, order) => acc + parseFloat(order.totalAmount || 0), 0);


    useEffect(() => {
        dispatch(getAdminTours);
        dispatch(getUsers);
        dispatch(adminBookingAction);
    }, [dispatch])

    return (
        <div className="container-fluid p-0"> {/* Remove padding from the container */}
            <div className="row">
                {/* Sidebar */}
                <div className="col-12 col-md-2 p-0"> {/* Remove padding from the sidebar */}
                    <Sidebar />
                </div>

                {/* Content Area */}
                <div className="col-12 col-md-10 px-4"> {/* Add padding to the content area */}
                    <h1 className="my-4">Dashboard</h1>

                    {/* Total Amount Row */}
                    <div className="row mb-4">
                        <div className="col-12">
                            <div className="card text-white bg-primary shadow-sm">
                                <div className="card-body text-center">
                                    <div className="card-font-size">Total Amount<br />
                                        <b>Rs. {totalAmount.toFixed(2)}</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row for Tours, Bookings, and Users */}
                    <div className="row g-4">
                        <div className="col-md-4 mb-2">
                            <div className="card text-white bg-success shadow-sm h-100">
                                <div className="card-body text-center">
                                    <div className="card-font-size">Tours<br /> <b>{tours?.length}</b></div>
                                </div>
                                <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                        <i className="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>

                        <div className="col-md-4 mb-2">
                            <div className="card text-white bg-danger shadow-sm h-100">
                                <div className="card-body text-center">
                                    <div className="card-font-size">Bookings<br /> <b>{adminOrder?.length}</b></div>
                                </div>
                                <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                        <i className="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>

                        <div className="col-md-4 mb-2">
                            <div className="card text-white bg-info shadow-sm h-100">
                                <div className="card-body text-center">
                                    <div className="card-font-size">Users<br /> <b>{users?.length}</b></div>
                                </div>
                                <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                        <i className="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
import {Link, useNavigate} from 'react-router-dom';
import {NavDropdown} from 'react-bootstrap';

export default function Sidebar() {

    const navigate = useNavigate();

    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to='/admin/dashboard'><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
                    </li>

                    <li>
                        <NavDropdown title={
                            <i className='fa fa-map'>&nbsp;<span>Tour</span></i>
                        }>
                            <NavDropdown.Item onClick={()=>{navigate('/admin/tours')}}><i className='fa fa-globe'> All</i></NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>{navigate('/admin/tours/create')}}><i className='fa fa-plus'> Create</i></NavDropdown.Item>
                             
                        </NavDropdown>
                    </li>

                    <li>
                        <Link to="/admin/bookings"><i className="fa fa-credit-card"></i> Bookings</Link>
                    </li>

                    <li>
                        <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
                    </li>
                    <li>
                        <Link to="/admin/reviews"><i className="fa fa-users"></i> Reviews</Link>
                    </li>

                </ul>
            </nav>
        </div>
    )
}
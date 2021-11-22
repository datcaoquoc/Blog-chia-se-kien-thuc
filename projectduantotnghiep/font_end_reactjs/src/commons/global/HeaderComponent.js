import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import '../../css/header.css';
import { useSelector, useDispatch } from 'react-redux';
import { getuser } from '../../redux/features/user/userSlice';
import { getCategories } from '../../redux/features/category/categorySlice';
import { postLogout } from '../../redux/features/auth/authSlice';
import { GrEdit, GrUserSettings } from "react-icons/gr";
import { HiLogout } from "react-icons/hi";
const HeaderComponent = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const { dataUser } = useSelector((state) => state.user);
    const { isLogin } = useSelector((state) => state.auth);
    const listCategory  = useSelector((state) => state.category.listCategory);

    const Categories = listCategory.map((category) =>{
        const {_id, namecategory} = category;
        return (
    <NavDropdown.Item onClick={() => history.push({
        pathname: `/Postsbycategory/${namecategory}`,
        state: { idcategory: _id},
    })}>{namecategory}</NavDropdown.Item>
    );})

    useEffect(() => {
        if (isLogin) {
            dispatch(getuser())
        }
        dispatch(getCategories())
      
    }, []);

    const onlogout = () => {
        dispatch(postLogout())
    }
    return (

        <div className="sticky-top">
            <div className="row">
                <div className="col-md-12 header">
                    <Navbar variant="light" expand="lg" >
                        <Navbar.Brand className="col-md-2 logo" href="/">
                            <a href="/">
                                <img className="logo-mobi" src="../access/mobifone-logo.png" width="150px" />
                            </a>
                        </Navbar.Brand>
                        <Form className="col-md-3">
                                <FormControl type="text" placeholder="Nhập nội dung tìm kiếm" className="mr-lg-2 search-home" />
                            </Form>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <div className="col-md-1"></div>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="col-md-9">
                                <Nav.Link as={Link} to={"/"} className='link-nav'>Trang chủ</Nav.Link>
                                <Nav.Link as={Link} to={"/contribute"} className='link-nav'>Mới nhất</Nav.Link>
                                <Nav.Link as={Link} to={"/"} className='link-nav'>About Us</Nav.Link>
                                <NavDropdown title="Chủ đề " renderMenuOnMount={true} >
                                 {Categories}
                                </NavDropdown>
                            </Nav>
                            <div className="col-md-3"> {(isLogin === true && dataUser !== undefined) ?

                                <NavDropdown title={
                                    <img className="avatar-user" src={dataUser.avatar}></img>
                                } renderMenuOnMount={true} className="dropdow-avatar" drop="down"
                                >
                                    <NavDropdown.Item href="#action/3.2"><GrUserSettings className="ic-drop-user"/> Tài khoản cá nhân</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => history.push('/contribute')}> <GrEdit className="ic-drop-user"/>  Tạo bài viết</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={onlogout}><HiLogout className="ic-drop-user"/> Đăng xuất </NavDropdown.Item>
                                </NavDropdown>
                                : <div style={{ display: 'flex' }}>
                                    <button className="login-button" onClick={() => history.push('/auth')}>
                                        đăng kí / đăng nhập
                                    </button>
                                </div>} </div>


                        </Navbar.Collapse>
                    </Navbar>

                </div>
            </div>

        </div>
    );
}

export default HeaderComponent;
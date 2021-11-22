import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import '../css/header.css'
function Postsbycategory(props) {
    let history = useHistory();
    const id = history.location.state.idcategory;
    return (
        <div>
            <h2 color="#000">{id}</h2>

        </div>
    );
}

export default Postsbycategory;
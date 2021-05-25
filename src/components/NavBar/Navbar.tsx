import { Box } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import AddNewProduct from '../AddNewProduct/AddNewProduct'

function Navbar() {
    return (
        <Box display="flex" justifyContent="space-between"> 
            <Box>Logo</Box>
            <Box>
                Navigation here
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li> <Link to='/addProduct'>Add New Product</Link></li>
                    <li><Link to="/product">Product</Link></li>
                </ul>
                </Box>
            <Box>Cart</Box>

        </Box>
    )
}

export default Navbar

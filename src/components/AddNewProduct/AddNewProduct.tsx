import React, { useState } from 'react'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {TextField} from 'formik-material-ui';
import { Box, Button, createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import axios from 'axios'

import { createProduct, editProduct } from '../../redux/actions';
import { AppState, Product } from '../../types';
import { useHistory, useParams } from 'react-router-dom';

import Notification from '../Notification/Notification'

const preset_key = process.env.REACT_APP_CLOUDINARY_PRESET;
const cloudinary_name = process.env.REACT_APP_CLOUDINARY_NAME;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);
//initial state of form
const initState = {
    name: "",
    description: "",
    categories: "",
    variants: [],
    sizes: [],
    price: 0,
    quantity: 0,
    productImage: "",
}

//validate input data
const validationSchema = Yup.object().shape( {
    name: Yup.string().min(2, 'Too Short').required('Required'),
    description: Yup.string().min(10, 'Description too short').required(),
    price: Yup.number().required(),
    quantity: Yup.number().required()
})

//function here
function AddNewProduct() {

    const dispatch = useDispatch();
    const { displayProduct } = useSelector( (state: AppState) => state.product)
    const { _id } = useParams<{ _id: string }>()
    const history = useHistory()
    const filteredData = displayProduct.filter ( p => p._id === _id);
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
    const classes = useStyles();
    const [selectedImage, setselectedImage] = useState<any | string>()
    // const [previewSource, setPreviewSopurce] = useState("")
    const baseUrl = `https://api.cloudinary.com/v1_1/${cloudinary_name}/image/upload`

    const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0]
        previewFile(file)
        setselectedImage(file)
    }

    const previewFile = async (file: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = async () => {
            // const result: string = await reader.result as string
        //    result ? setPreviewSopurce(result) : <CircularProgress />
        }
    }

    const handelSave = (values: Product) => {
        dispatch(editProduct(values, history))
        setNotify({
            isOpen: true,
            message: 'Saved Successfully',
            type: 'success'
        })
    }

    const handelCancel = () => {
        history.push('/dashboard')
    }

    return (
      <>  
       <Formik initialValues={_id ? filteredData[0] : initState} validationSchema={validationSchema} onSubmit={async (values) => {
           console.log(values, "preview source")
           try {
            const formData = new FormData();
            formData.append('file', selectedImage)
            formData.append('upload_preset', `${preset_key}`)

            const response = await axios.post(baseUrl,  formData, {withCredentials: false})
            const data = await response.data;
            const productImageUrl = await data.secure_url;
            values.productImage = productImageUrl;
            dispatch(createProduct(values, history))
            setNotify({
             isOpen: true,
             message: 'Created Successfully',
             type: 'success'
             })
           } catch (error) {
               console.log(error)
           }

       }}
       >
           { ( {values, errors, touched, setFieldValue, setFieldTouched } )  => (
               <Form encType="multipart/form-data">
                   <Grid  container direction="column" spacing={2}>
                        <Grid item lg={10} md={10} sm={10} xs ={10}>
                            <Field name="name" component={TextField} label="Product Name">Name: </Field>
                        </Grid>
                        <Grid item lg={10} md={10} sm={10} xs ={10}>
                            <Field name="description" component={TextField} label="Description">Description: </Field>
                        </Grid>
                        <Grid item>
                            <Box id="select-group-categories">Categories</Box>
                            <Field name="categories" as="select" aria-labelledby="select-group-categories">
                                <option value="Home">Home</option>
                                <option value="Forest">Forest</option>
                                <option value="Field">Field</option>
                            </Field>
                        </Grid>
                        <Grid item>
                            <Box id="checkbox-group-variants">Variants</Box>
                            <Box role="group" aria-labelledby="checkbox-group-variants" >
                                <label>
                                <Field type="checkbox" name="variants" value="Red" />
                                Red
                                </label>
                                <label>
                                <Field type="checkbox" name="variants" value="Yellow" />
                                Yellow
                                </label>
                                <label>
                                <Field type="checkbox" name="variants" value="Orange" />
                                Orange
                                </label>
                                <label>
                                <Field type="checkbox" name="variants" value="Blue" />
                                Blue
                                </label>
                                <label>
                                <Field type="checkbox" name="variants" value="Green" />
                                Green
                                </label>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box id="checkbox-group-sizes">Sizes</Box>
                            <Box role="group" aria-labelledby="checkbox-group-sizes">
                                <label>
                                <Field type="checkbox" name="sizes" value="XS" />
                                XS
                                </label>
                                <label>
                                <Field type="checkbox" name="sizes" value="S" />
                                S
                                </label>
                                <label>
                                <Field type="checkbox" name="sizes" value="M" />
                                M
                                </label>
                                <label>
                                <Field type="checkbox" name="sizes" value="L" />
                                L
                                </label>
                            </Box>
                        </Grid>
                        <Grid item lg={10} md={10} sm={10} xs ={10}>
                            <Field name="price" component={TextField} label="Price">Price: </Field>
                        </Grid>
                        <Grid item lg={10} md={10} sm={10} xs ={10}>
                            <Field name="quantity" component={TextField} label="Quantity">Quantity: </Field>
                        </Grid>
                        <Grid item lg={10} md={10} sm={10} xs ={10}>         
                           <input type="file" name="productImage" onChange={handleFileInputChange} />
                        </Grid>
                        <Grid item lg={10} md={10} sm={10} xs ={10}>         
                            { _id ? <Button className={classes.margin} variant="contained" color="primary" onClick={ () => handelSave(values)}>Save</Button> : <Button type="submit" className={classes.margin} variant="contained" color="primary">Submit</Button>}
                            <Button variant="contained" color="primary" onClick={ () => handelCancel()} >Cancel</Button>
                        </Grid>
                   </Grid>

               </Form>
            ) }
       </Formik>
       {/* {previewSource && (
           <img src={previewSource} alt="image"/>
       )} */}
       <Notification notify={notify} setNotify={setNotify}/>
       </>
    )
}

export default AddNewProduct

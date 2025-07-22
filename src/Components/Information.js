import React, { useEffect } from 'react'
import { useState } from 'react';
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';

export default function Information() {
    const [btn1, setBtn1] = useState();
    const [btn2, setBtn2] = useState();
    const [showunit, setShowUnit] = useState(false);         // placeholder change
    const [showinput, setShowInput] = useState(false);       // input disable
    const [savedata, setSaveDat] = useState(JSON.parse(localStorage.getItem("personalInfo")));
    let navigate = useNavigate();



    useEffect(() => {
        const unitSelection = localStorage.getItem("unitSelection1");
        console.log(unitSelection)
        if (unitSelection === "lbs.") {
            firststbtnclick();
        } else {
            secondstbtnclick();
        }

    }, [])

    const styles = {
        backgroundColor: 'black',
        color: 'white'
    }

    const styles2 = {
        backgroundColor: 'white',
        color: 'black'
    }

    const styles3 = {
        display: 'none',
    }

    // Formik
    const initialValues = {
        weight: "",
        age: "",
        height: "",
        inch: "",
        centimeter: "",
        sex: "male",
        Active: "Sedentary",
        Goal: "Fat Loss",
    }

    const validationSchema = Yup.object({
        weight: Yup.number()
            .required('Weight is required')
            .min(10, 'Weight should not be less than 10')
            .max(200, 'Weight should not be greater than 200'),

        age: Yup.number()
            .required('Age is required')
            .min(18, 'Age should not be less than 18')
            .max(150, 'Age should not be greater than 150'),

        ...(showinput
            ? {
                centimeter: Yup.number()
                    .required('Centimeters are required')
                    .min(60, 'centimeter should not be less than 60')
                    .max(243, 'centimeter should not be greater than 243'),
            }
            : {
                height: Yup.number()
                    .required('Height is required')
                    .min(2, 'Foot should not be less than 2')
                    .max(8, 'Foot should not be greater than 8'),

                inch: Yup.number()
                    .required('Inches are required')
                    .min(1, 'inch should not be less than 1')
                    .max(12, 'inch should not be greater than 12'),
            }),
    })




    const onSubmit = (values) => {
        // console.log(values)
        localStorage.setItem("personalInfo", JSON.stringify(values));
        navigate("/Weight")
    }




    const firststbtnclick = () => {
        setBtn1(styles)
        setBtn2(styles2)
        setShowUnit(false)
        setShowInput(false)
        localStorage.setItem("unitSelection1", "lbs.");
    }




    const secondstbtnclick = () => {
        setBtn2(styles)
        setBtn1(styles2)
        setShowUnit(true)
        setShowInput(true)
        localStorage.setItem("unitSelection1", "kg.");
    }

    return (
        <>
            <Formik
                initialValues={((savedata)) ? savedata : initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize
            >

                {({ values }) => (<Form>

                    <div className='container-fluid'>

                        <div className='row' >
                            <div className='col-4' ></div>
                            <div className='col-4 mt-5 bg-dark text-white py-3' >
                                <h4 >Starting Information</h4>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-4'></div>
                            <div className='col-4 mt-2'>
                                <div className='row shadow-none'>
                                    <div className='col-6 p-0'>
                                        <div className="d-grid col-12">
                                            <button id='btn1' onClick={firststbtnclick} style={btn1} className="btn btn-dark rounded-0 py-3" type="button">U.S.Units</button>
                                        </div>
                                    </div>
                                    <div className='col-6 p-0'>
                                        <div className="d-grid col-12">
                                            <button id='btn2' onClick={secondstbtnclick} style={btn2} className="btn btn-dark w-100 rounded-0 py-3" type="button" >Metric Units</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row' >
                            <div className='col-4' ></div>
                            <div className='col-4 mt-3 p-0' >

                                <div className='row' >
                                    <div className='col-12' >
                                        <span className="attributes">WEIGHT</span>
                                        <div className="input-group mt-1">
                                            <Field type="number" name="weight" className="form-control py-3 rounded-0 border-dark shadow-none" aria-label="Amount (to the nearest dollar)" placeholder={showunit === false ? 'lbs' : 'kg'} />
                                        </div>
                                        <ErrorMessage name="weight" component="div"
                                            className="text-danger fw-bold" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row mt-3'>
                            <div className='col-4'></div>
                            <div className='col-4 p-0'>
                                <span className="attributes" id="basic-addon1">SEX</span>
                                <div className="input-group mt-1">
                                    <Field as="select" name="sex" className="form-select py-3 rounded-0 border-dark shadow-none" aria-label="Sex" aria-describedby="basic-addon1">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </Field>
                                </div>
                            </div>
                        </div>

                        <div className='row' >
                            <div className='col-4'></div>
                            <div className='col-4 p-0'>

                                <div className='row mt-3' >
                                    <div className='col-12' >
                                        <span className="attributes">AGE</span>
                                        <div className="input-group mt-1">
                                            <Field type="number" name="age" className="form-control py-3 rounded-0 border-dark shadow-none" aria-label="Amount (to the nearest dollar)" placeholder='years.' />
                                        </div>
                                        <ErrorMessage name="age" component="div"
                                            className="text-danger fw-bold" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row mt-3' >
                            <div className='col-4'></div>
                            <div className='col-4 p-0'>

                                <div className='row' >
                                    <span className="attributes">HEIGHT</span>
                                    <div className='col-6' >
                                        <div className="input-group mt-1">
                                            <Field type="number" name="height" className="form-control py-3 rounded-0 border-dark shadow-none" aria-label="Amount (to the nearest dollar)" placeholder='foot.' style={showinput === true ? styles3 : {}} />
                                        </div>
                                        <ErrorMessage name="height" component="div"
                                            className="text-danger fw-bold" />
                                    </div>
                                    <div className='col-6' >
                                        <div className="input-group mt-1">
                                            <Field type="number" name="inch" className="form-control py-3 rounded-0 border-dark shadow-none" aria-label="Amount (to the nearest dollar)" placeholder='inch.' style={showinput === true ? styles3 : {}} />
                                        </div>
                                        <ErrorMessage name="inch" component="div"
                                            className="text-danger fw-bold" />
                                    </div>
                                    <div className='col-12' >
                                        <div className="input-group mt-1">
                                            <Field type="number" name="centimeter" className="form-control py-3 rounded-0 border-dark shadow-none" aria-label="Amount (to the nearest dollar) " placeholder='centimetre.' style={showinput === false ? styles3 : {}} />
                                        </div>
                                        <ErrorMessage name="centimeter" component="div"
                                            className="text-danger fw-bold" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row mt-4' >
                            <div className='col-4' ></div>
                            <div className='col-4  p-0' >
                                <div className='row'>

                                    <div className='col-6'>
                                        <span className="attributes">ACTIVITY LEVEL</span>
                                        <div className="input-group mt-1">
                                            <Field as="select" name="Active" className="form-select py-3 rounded-0 border-dark shadow-none" aria-label="Sex" aria-describedby="basic-addon1">
                                                <option value="Sedentary">Sedentary</option>
                                                <option value="Lightly Active">Lightly Active</option>
                                                <option value="Active">Active</option>
                                                <option value="Very Active">Very Active</option>
                                                <option value="Extremely Active">Extremely Active</option>
                                            </Field>
                                        </div>
                                    </div>

                                    <div className='col-6'>
                                        <span className="attributes">GOAL</span>
                                        <div className="input-group mt-1">
                                            <Field as="select" name="Goal" s className="form-select py-3 rounded-0 border-dark shadow-none" aria-label="Sex" aria-describedby="basic-addon1">
                                                <option value="Fat Loss">Fat Loss</option>
                                                <option value="Maintenance">Maintenance</option>
                                                <option value="Weight Gain">Weight Gain</option>
                                            </Field>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* NEXT BUTTON */}
                        <div className='row mt-3' >
                            <div className='col-4' ></div>
                            <div id='btnset' className='col-4 mb-3 p-0' >
                                <button type="submit" className="btn btn-dark rounded-0">Next Step</button>
                            </div>
                        </div>

                        {/* Container End */}
                    </div>

                </Form>)}
            </Formik>
        </>
    )
}


import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Weight() {

  let navigate = useNavigate();

  // Formik
  const initialValues = {
    percentage: ""
  }

  const validationSchema = Yup.object({
    percentage: Yup.number()
      .required('percentage is required')
      .min(1, 'percentage should not be less than 1')
  })

  const onSubmit = (values) => {
    // console.log(values)
    localStorage.setItem("physicalActivity", JSON.stringify(values));
    navigate("/Result")
  }

  const previousbtn = () => {
    navigate("/Weight")
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >

        {({ values }) => (<Form>

          <div className='container-fluid'>

            <div className='row' >
              <div className='col-4' ></div>
              <div className='col-4 mt-5 bg-dark text-white py-3' >
                <h4 >Physical Activity Change</h4>
              </div>
            </div>

            <div className='row' >
              <div className='col-4' ></div>
              <div className='col-4 mt-3 p-0' >

                <div className='row' >
                  <div className='col-12' >
                    <span className="attributes">TO REACH MY GOAL, I WILL CHANGE MY PHYSICAL ACTIVITY BY</span>
                    <div className="input-group mt-1">
                      <Field type="number" name="percentage" className="form-control py-3 rounded-0 border-dark shadow-none" aria-label="Amount (to the nearest dollar)" placeholder='%' />
                    </div>
                    <ErrorMessage name="percentage" component="div"
                      className="text-danger fw-bold" />
                  </div>
                </div>
              </div>
            </div>

            {/* NEXT BUTTON */}
            <div className='row mt-3' >
              <div className='col-4' ></div>
              <div className='col-4' >
                <div className='row' >
                  <div className='col-6 p-0' >
                    <button type="button" onClick={previousbtn} className="btn btn-dark rounded-0">Previous Step</button>
                  </div>
                  <div className='col-6 p-0 text-end' >
                    <button type="submit" className="btn btn-dark rounded-0">Next Step</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Container End */}
          </div>

        </Form>)}
      </Formik>
    </>
  )
}

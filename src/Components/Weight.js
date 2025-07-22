import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Weight({ selectedUnit }) {
  const [savedata, setSaveDat] = useState(JSON.parse(localStorage.getItem("weightGoal")));


  const initialValues = {
    weight: "",
    days: "",
    date: "",
  }

  let navigate = useNavigate();

  // Formik
  const validationSchema = Yup.object({
    weight: Yup.number()
      .required('Weight is required')
      .min(10, 'Weight should not be less than 10')
      .max(200, 'Weight should not be greater than 200'),

    days: Yup.number()
      .required('Days is required')
      .min(1, 'Day should not be less than 1'),

    date: Yup.date()
      .required('Date is required'),
  })




  const onSubmit = (values) => {
    localStorage.setItem("weightGoal", JSON.stringify(values));
    navigate("/Result")
  }




  const previousbtn = () => {
    navigate("/")
  }

  return (
    <>
      <Formik
        initialValues={((savedata)) ? savedata : initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >

        {({ values, setFieldValue }) => (<Form>

          <div className='container-fluid'>

            <div className='row' >
              <div className='col-4' ></div>
              <div className='col-4 mt-5 bg-dark text-white py-3' >
                <h4 >Weight Goal</h4>
              </div>
            </div>

            <div className='row' >
              <div className='col-4' ></div>
              <div className='col-4 mt-3 p-0' >

                <div className='row' >
                  <div className='col-12' >
                    <span className="attributes">GOAL WEIGHT</span>
                    <div className="input-group mt-1">
                      <Field type="number" name="weight" className="form-control py-3 rounded-0 border-dark shadow-none" aria-label="Amount (to the nearest dollar)" placeholder={localStorage.getItem("unitSelection1")} />
                    </div>
                    <ErrorMessage name="weight" component="div"
                      className="text-danger fw-bold" />
                  </div>
                </div>
              </div>
            </div>

            <div className='row' >
              <div className='col-4'></div>
              <div className='col-4 p-0'>

                <div className='row mt-3' >
                  <div className='col-12' >
                    <span className="attributes">I WANT TO REACH MY GOAL IN</span>
                    <div className="input-group mt-1">
                      <Field type="number" name="days" className="form-control py-3 rounded-0 border-dark shadow-none" aria-label="Amount (to the nearest dollar)" placeholder='days.'
                        onChange={(e) => {
                          const days = parseInt(e.target.value);
                          setFieldValue('days', days);

                          if (!isNaN(days)) {
                            const currentDate = new Date();
                            currentDate.setDate(currentDate.getDate() + days);
                            setFieldValue('date', currentDate.toISOString().split('T')[0]);
                          }
                        }}
                        value={values.days}
                      />
                    </div>
                    <ErrorMessage name="days" component="div"
                      className="text-danger fw-bold" />
                  </div>
                </div>
              </div>
            </div>

            <div className='row mt-3' >
              <div className='col-4'></div>
              <div className='col-4 p-0'>

                <div className='row' >
                  <span className="attributes">I WANT TO REACH MY GOAL BY</span>
                  <div className='col-12' >
                    <div className="input-group mt-1">
                      <Field type="date" name="date" className="form-control py-3 rounded-0 border-dark shadow-none"
                        onChange={(e) => {
                          const selectedDate = new Date(e.target.value);
                          const today = new Date();
                          const differenceInDays = Math.floor((selectedDate - today) / (1000 * 60 * 60 * 24));
                          setFieldValue('days', differenceInDays);
                          setFieldValue('date', e.target.value);
                        }}
                        value={values.date}
                      />
                    </div>
                    <ErrorMessage name="date" component="div"
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

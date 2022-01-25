/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';

import { clearMessage } from '../slices/message';
import { newReminder } from '../slices/reminders';

const NewReminderFormModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [loading, setLoading] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    description: '',
    date: '',
    time: '',
    city: '',
    locationCoordinates: '',
  };

  const validationSchema = Yup.object().shape({
    description: Yup.string()
      .test(
        'len',
        'The description must be between 3 and 30 characters.',
        (val) => val
          && val.toString().length >= 3
          && val.toString().length <= 30,
      )
      .required('This field is required!'),
    date: Yup.date()
      .required('This field is required!'),
    time: Yup.string()
      .required('This field is required!'),
    city: Yup.string()
      .required('This field is required!'),
    locationCoordinates: Yup.string()
      .required('This field is required!'),
  });

  const handleSubmit = (formValue, { resetForm }) => {
    const {
      description, date, time, city, locationCoordinates,
    } = formValue;
    const datetime = `${date} ${time}:00`;

    setLoading(true);

    dispatch(newReminder({
      description, datetime, city, locationCoordinates,
    }))
      .unwrap()
      .then(() => {
        resetForm();
        setLoading(false);
        handleClose();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Button className="nextButton " onClick={handleShow}>
        +
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          {/* <div className="col-md-12 signup-form"> */}
          <div className="new-reminder-form card card-container">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <Field name="description" type="text" className="form-control" />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="date">
                    Date
                  </label>
                  <Field name="date" type="date" min={new Date().toLocaleDateString()} className="form-control" />
                  <ErrorMessage
                    name="date"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <Field
                    name="time"
                    type="time"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="time"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <Field
                    name="city"
                    type="city"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="locationCoordinates">Location Coordinates</label>
                  <Field
                    name="locationCoordinates"
                    type="locationCoordinates"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="locationCoordinates"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                    {loading && (
                      <span className="spinner-border spinner-border-sm" />
                    )}
                    <span>Add</span>
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          {/* </div> */}
        </Modal.Body>

      </Modal>

    </>
  );
};

export default NewReminderFormModal;

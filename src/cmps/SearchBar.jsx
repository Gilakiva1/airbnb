
import React from 'react'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, TextField } from '@material-ui/core';

export const SearchBar = () => {
  const initialValues = { location: '', checkIn: '', checkOut: '', guests: '' }

  const onSubmit = () => {

  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="Location" label="location" />
          <ErrorMessage name="text" component="div" />
          <Field type="date" name="Check in" label="check-in" />
          <ErrorMessage name="check-in" component="div" />
          <Field type="date" name="Check out" label="check-out" />
          <ErrorMessage name="check-out" component="div" />
          <Field type="number" name="Guests" label="guests" />
          <ErrorMessage name="guests" component="div" />
          <Button
            variant={'contained'}
            color={'primary'}
            type="submit"
            disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  )


}






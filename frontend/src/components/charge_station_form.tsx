'use client'

import { Field, Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import { useChargeStationStore } from '@/stores/charge_stations'

export function ChargeStationForm() {
  const { selected } = useChargeStationStore()

  if (!selected) return

  return (
    <div className="flex flex-col gap-4 w-full h-1/3" key={selected.id}>
      <Formik
        validateOnChange
        validateOnBlur
        initialValues={{ ...selected }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true)
          setSubmitting(false)
        }}
      >
        {({ isSubmitting, errors, values, setValues }) => (
          <Form className="flex flex-col gap-4 justify-between h-full">
            <div className="flex flex-col gap-4">
              <div className='grid grid-cols-10 gap-3'>
                <label
                  className={`input col-span-7 validator w-full pe-0 ${errors.name ? 'input-error' : 'validator'}`}
                >
                  <b>Station name</b>
                  <Field
                    className="ps-2"
                    name="name"
                    minLength={5}
                    placeholder="Name"
                  />
                </label>
                <label className={`col-span-3 justify-between input ${values.active ? "input-success" : "input-error"}`}>
                  <b>{values.active ? "Active" : "Inactive"}</b>
                  <input
                    type="checkbox"
                    className={`checkbox ${values.active && "checkbox-success"}`}
                    name="active"
                    onChange={(e) => setValues(pre => ({ ...pre, active: e.target.checked }))}
                  />
                </label>
              </div>
              <div className='grid grid-cols-2 gap-3'>
                <label className="input">
                  <b>Latitude</b>
                  <Field
                    className="ps-2"
                    name="lat"
                    minLength={5}
                    placeholder="-19.0546"
                    disabled
                  />
                </label>
                <label className="input">
                  <b>Longitud</b>
                  <Field
                    className="ps-2"
                    name="long"
                    minLength={5}
                    placeholder="-99.4563"
                    disabled
                  />
                </label>
              </div>
              <label className='input gap-3 w-full'>
                <b>Capacity </b>
                <div className="grid grid-cols-8 gap-4 items-center">
                  <input
                    type="range"
                    value={values.capacity / 1000}
                    onChange={(e) => setValues(pre => ({ ...pre, capacity: parseInt(e.target.value) * 1000 }))}
                    min={0}
                    max={150}
                    step={10}
                    className="range col-span-6"
                    name="capacity"
                  />
                  <input
                    type="number"
                    value={values.capacity / 1000}
                    onChange={(e) => setValues(pre => ({ ...pre, capacity: parseInt(e.target.value) * 1000 }))}
                    min={0}
                    max={150}
                    className="input col-span-2"
                    name="capacity"
                  />
                </div>
                <i>Kw</i>
              </label>
            </div>
            <button
              className="btn w-full"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

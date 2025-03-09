'use client'

import { Field, Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import { useChargeStationStore } from '@/stores/charge_stations'
import {
  update_charge_stations,
  post_charge_stations,
} from '@/server_actions/charge_stations'
import { randomUUID } from 'crypto'

export function ChargeStationForm() {
  const { selected } = useChargeStationStore()
  const { edit, add, remove } = useChargeStationStore()

  const initialValues = { ...selected }

  return (
    <div className="flex flex-col gap-4 w-full h-1/3" key={""}>
      <Formik
        validateOnChange
        validateOnBlur
        initialValues={{
          id: undefined,
          active: false,
          capacity: 0,
          lat: 0,
          long: 0,
          name: "",
          ...initialValues
        }}
        onSubmit={async ({ id, ...values }, { setSubmitting, resetForm }) => {
          setSubmitting(true)
          if (id) {
            edit(id, values)
            await update_charge_stations(id, values)
              .then(({ error }) => {
                if (error) throw Error(error)
                toast.success('Station updated')
              })
              .catch(() => {
                resetForm()
                edit(id, initialValues)
                toast.error('Error updating station')
              })
          } else {
            const temp_id = randomUUID.toString()
            add({
              ...values,
              id: temp_id,
              user_email: 'temp',
              created_at: 'temp',
              updated_at: 'temp',
            })
            await post_charge_stations(values)
              .then(({ error, charge_station }) => {
                if (!charge_station) throw Error(error)
                toast.success('Station created')
                edit(temp_id, charge_station)
              })
              .catch(() => {
                resetForm()
                remove(temp_id)
                toast.error('Could not create station')
              })
          }

          setSubmitting(false)
        }}
      >
        {({ isSubmitting, errors, values, setValues }) => (
          <Form className="flex flex-col gap-4 justify-between h-full">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-10 gap-3">
                <label className="input col-span-7 validator w-full pe-0">
                  <b>Station name</b>
                  <Field
                    className="ps-2"
                    name="name"
                    minLength={5}
                    placeholder="Name"
                  />
                </label>
                <label className="col-span-3 justify-between input">
                  <b>{values.active ? 'Active' : 'Inactive'}</b>
                  <input
                    required
                    checked={values.active}
                    type="checkbox"
                    className={`checkbox ${values.active && 'checkbox-success'}`}
                    name="active"
                    onChange={(e) =>
                      setValues((pre) => ({ ...pre, active: e.target.checked }))
                    }
                  />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <label className="input">
                  <b>Latitude</b>
                  <Field
                    required
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
                    required
                    className="ps-2"
                    name="long"
                    minLength={5}
                    placeholder="-99.4563"
                    disabled
                  />
                </label>
              </div>
              <label className="input gap-3 w-full">
                <b>Capacity </b>
                <div className="grid grid-cols-8 gap-4 items-center">
                  <input
                    required
                    type="range"
                    value={values.capacity / 1000}
                    onChange={(e) =>
                      setValues((pre) => ({
                        ...pre,
                        capacity: parseInt(e.target.value) * 1000,
                      }))
                    }
                    min={0}
                    max={150}
                    step={10}
                    className="range col-span-6"
                    name="capacity"
                  />
                  <input
                    required
                    type="number"
                    value={values.capacity / 1000}
                    onChange={(e) =>
                      setValues((pre) => ({
                        ...pre,
                        capacity: parseInt(e.target.value) * 1000,
                      }))
                    }
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

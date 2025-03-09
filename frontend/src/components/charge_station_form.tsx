'use client'

import { Field, Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import { useChargeStationStore } from '@/stores/charge_stations'
import {
  update_charge_stations,
  post_charge_stations,
} from '@/server_actions/charge_stations'
import {
  ChargeStationType,
  PartialChargeStationType,
} from '@/types/charge_stations'

export function ChargeStationForm({
  initialValues,
}: {
  initialValues: Partial<ChargeStationType>
}) {
  const { edit, add, remove, selected } = useChargeStationStore()

  const { lat = 0, long = 0 } = initialValues

  async function editAction(id: string, values: PartialChargeStationType) {
    edit(id, values)
    return await update_charge_stations(id, values)
      .then(({ error }) => {
        if (error) throw Error(error)
        toast.success('Station updated')
        return true
      })
      .catch(() => {
        if (selected) edit(id, selected)
        toast.error('Error updating station')
        return false
      })
  }

  async function createAction(values: PartialChargeStationType) {
    const temp_id = crypto.randomUUID()
    add({
      ...values,
      id: temp_id,
      created_at: "",
      updated_at: "",
      user_email: ""
    })
    return await post_charge_stations(values)
      .then(({ error, charge_station }) => {
        if (!charge_station) throw Error(error)
        toast.success('Station created')
        edit(temp_id, charge_station)
        return true
      })
      .catch(() => {
        remove(temp_id)
        toast.error('Could not create station')
        return false
      })
  }

  return (
    <div className="flex flex-col gap-4 w-full h-1/3">
      {selected ? (
        <_Form
          initialValues={selected}
          key={selected?.id}
          buttonMessage="Update station"
          onSubmit={(values) => editAction(selected.id, values)}
          resetOnFail
        />
      ) : lat && long ? (
        <_Form
          initialValues={{
            active: false,
            capacity: 0,
            name: '',
            lat,
            long,
          }}
          key={`${initialValues?.lat}${initialValues?.long}`}
          buttonMessage="Create new station"
          onSubmit={(values) => createAction(values)}
          resetOnSuccess
        />
      ) : (
        <></>
      )}
    </div>
  )
}

function _Form({
  initialValues,
  buttonMessage = 'Submit',
  resetOnSuccess = false,
  resetOnFail = false,
  onSubmit = (values) => Promise.resolve(true),
}: {
  initialValues: PartialChargeStationType
  buttonMessage?: string
  resetOnSuccess?: boolean
  resetOnFail?: boolean
  onSubmit?: (values: PartialChargeStationType) => Promise<boolean>
}) {
  return (
    <Formik
      validateOnChange
      validateOnBlur
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true)
        if (await onSubmit(values)) {
          if (resetOnSuccess) resetForm()
        } else {
          if (resetOnFail) resetForm()
        }
        setSubmitting(false)
      }}
    >
      {({ isSubmitting, values, setValues }) => (
        <Form className="flex flex-col gap-4 justify-between h-full">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-10 gap-3">
              <label className="input col-span-7 w-full pe-0">
                <b>Station name</b>
                <Field
                  className="ps-2"
                  name="name"
                  minLength={1}
                  placeholder="Name"
                />
              </label>
              <label className="col-span-3 justify-between input">
                <b>{values.active ? 'Active' : 'Inactive'}</b>
                <Field
                  type="checkbox"
                  className={`checkbox ${values.active && 'checkbox-success'}`}
                  name="active"
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
          <button className="btn w-full" type="submit" disabled={isSubmitting}>
            {buttonMessage}
          </button>
        </Form>
      )}
    </Formik>
  )
}

// if (id) {
//
// } else {
//
// }

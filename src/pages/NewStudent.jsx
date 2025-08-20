import React from 'react'
import Input from '../components/form-elements/Input'
const NewStudent = () => {
  return (
    <div className='custom-main-wrap'>
        <div className="heading-wrap">
            <h2 className='heading'>Create New Student</h2>
        </div>
        <div className="form_wrap">
          <form>
            <Input type="text" label="Name:" />
            <Input type="number" label="Id:"/>
            <Input type="date" label="DOB:"/>
            <Input type="date" label="Visa Expire:"/>
            <Input type="text" label="Category:"/>
            <Input type="text" label="Car Number Plate:"/>
            <Input type="phone" label="Phone:"/>
            <h2 className="prices w-screen">Prices</h2>
            <div className="check-inputs-wrap w-screen">
              <Input type="radio" name="prices" label="Lesson"/>
              <Input type="radio" name="prices" label="Test Reservations"/>
              <Input type="radio" name="prices" label="Test"/>
              <Input type="radio" name="prices" label="Other"/>
            </div>
            <h2 className="prices w-screen">Need</h2>
            <div className="check-inputs-wrap w-screen">
              <Input type="checkbox" name="need_test" label="test 1"/>
              <Input type="checkbox" name="need_test" label="test 2"/>
              <Input type="checkbox" name="need_test" label="test 3"/>
            </div>
            <h2 className="prices w-screen">have</h2>
            <div className="check-inputs-wrap w-screen">
              <Input type="checkbox" name="have_test" label="test 1"/>
              <Input type="checkbox" name="have_test" label="test 2"/>
              <Input type="checkbox" name="have_test" label="test 3"/>
            </div>
            <h2 className="prices w-screen">need change test</h2>
            <div className="check-inputs-wrap w-screen">
              <Input type="checkbox" name="change_test" label="Fhange test"/>
            </div>
            <h2 className="prices w-screen">Fail</h2>
            <div className="check-inputs-wrap w-screen">
              <Input type="checkbox" name="fail_test" label="Fail test"/>
            </div>
            <div className="btn-wrap w-screen">
              <button type='submit' className='button-primary'>Save</button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default NewStudent
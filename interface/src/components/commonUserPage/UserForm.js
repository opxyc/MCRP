import React, {useState} from 'react';
import { useFormik } from 'formik';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from 'axios'
import {server, districtWiseData} from '../constants'
 
const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length < 4) {
    errors.name = 'Must be atleast 4 characters long';
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = 'Required';
  } else if (!/^[0-9]{10}$/i.test(values.phoneNumber)) {
    errors.phoneNumber = 'Invalid phone number';
  }

  if (!values.aadharNumber) {
    errors.aadharNumber = 'Required';
  } else if (!/^[0-9]{12}$/i.test(values.aadharNumber)) {
    errors.aadharNumber = 'Invalid aadhar number';
  }

  if (!values.subject) {
    errors.subject = 'Required';
  } else if (values.subject.length < 5) {
    errors.subject = 'Must be atleast 5 characters long';
  }

  if (!values.body) {
    errors.body = 'Required';
  } else if (values.body.length < 20) {
    errors.body = 'Must be atleast 20 characters long';
  }

  if (!values.vehicleNumber) {
    errors.vehicleNumber = 'Required';
  } else if (values.vehicleNumber.length < 5) {
    errors.vehicleNumber = 'Invalid License Plate number';
  }
  return errors;
};
 
const UserForm = (props) => {
  const [district, setDistrict] = useState('');
  const [localPoliceStation, setLocalPoliceStation] = useState('')
  const [message, setMessage] = useState('')

  const formik = useFormik({
    initialValues: {
      name: '',
      phoneNumber: '',
      aadharNumber : '',
      subject : '',
      body : '',
      vehicleNumber : '',
    },
    validate,
    onSubmit: values => {
      if(district === '' || localPoliceStation === ''){
        setMessage('Please select District and Local Police Station')
        return
      }
      values['district'] = district
      values['localPoliceStation'] = localPoliceStation
      setMessage("Submitting...")
      axios.post(server + '/report-incident', { ...values })
      .then(res => {
          console.log(res.data)
          if(res.data.status === 0){
            setMessage("")
            props.updateRegistrationStatus({
                status : true,
                referenceId : res.data.desc.referenceId
            })
          }
          else{
            setMessage(JSON.stringify(res.data.desc))
            props.updateRegistrationStatus({
                status : false,
                referenceId : ''
            })
          }
      })
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <br/>
      <Dropdown options={Object.keys(districtWiseData)} onChange={(e)=>{setDistrict(e.value); setLocalPoliceStation('')}} value={district} placeholder="District" />
      <br/>
      {
        district !== '' && 
        <Dropdown options={districtWiseData[district]} onChange={(e)=>{setLocalPoliceStation(e.value)}} value={localPoliceStation} placeholder="Nearest Police Station" />
      }
      
      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input 
          className="mdl-textfield__input" 
          id="name"
          name="name"
          type="text" 
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
          placeholder="Full Name"
        />
      </div>
      {formik.touched.name && formik.errors.name ? (
        <div className="errorMessage">{formik.errors.name}</div>
      ) : null} 
      
      
      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input 
          className="mdl-textfield__input" 
          id="phoneNumber"
          name="phoneNumber"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phoneNumber}
          placeholder="Phone Number"
        />
        {/* <label className="mdl-textfield__label" htmlFor="phoneNumber">Phone Number</label> */}
      </div>
      {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
        <div className="errorMessage">{formik.errors.phoneNumber}</div>
      ) : null}

      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input 
          className="mdl-textfield__input" 
          id="aadharNumber"
          name="aadharNumber"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.aadharNumber}
          placeholder="Aadhar number"
        />
        {/* <label className="mdl-textfield__label" htmlFor="aadharNumber">Aadhar number</label> */}
      </div>
      {formik.touched.aadharNumber && formik.errors.aadharNumber ? (
        <div className="errorMessage">{formik.errors.aadharNumber}</div>
      ) : null}  

      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input 
          className="mdl-textfield__input" 
          id="subject"
          name="subject"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.subject}
          placeholder="Subject"
        />
        {/* <label className="mdl-textfield__label" htmlFor="subject">Subject</label> */}
      </div>
      {formik.touched.subject && formik.errors.subject ? (
        <div className="errorMessage">{formik.errors.subject}</div>
      ) : null} 

      
      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <textarea
          cols={10}
          className="mdl-textfield__input" 
          id="body"
          name="body"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.body}
          placeholder="Enter the details"
        />
        {/* <label className="mdl-textfield__label" htmlFor="body">Enter the Details</label> */}
      </div>
      {formik.touched.body && formik.errors.body ? (
        <div className="errorMessage">{formik.errors.body}</div>
      ) : null}

      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input 
          className="mdl-textfield__input" 
          id="vehicleNumber"
          name="vehicleNumber"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.vehicleNumber}
          placeholder="Vechicle Number"
        />
        {/* <label className="mdl-textfield__label" htmlFor="vehicleNumber">Vechicle Number</label> */}
      </div>
      {formik.touched.vehicleNumber && formik.errors.vehicleNumber ? (
        <div className="errorMessage">{formik.errors.vehicleNumber}</div>
      ) : null}

      <br/>
      <div style={{color:'red'}}>{message}<br/></div>
      <button className="HSNavButton" type="submit" style={{background:'#6200ea'}}>
        SUBMIT
      </button>
    </form>
   );
};

export default UserForm
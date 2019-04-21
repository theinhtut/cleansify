import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import database from '../firebase/firebase';
import axios from 'axios';

export default class RequestForm extends React.Component {
  state = {
    email: '',
    location: '',
    date: moment(),
    calendarFocused: false,
    error: '',
    clickedCheck: false,
    vendorName: '',
    vendorsArray: []
  };
  onEmailChange = e => {
    const email = e.target.value;
    this.setState(() => ({ email }));
  };
  onLocationChange = e => {
    const location = e.target.value;
    this.setState(() => ({
      location,
      vendorName: '',
      vendorsArray: [],
      clickedCheck: false
    }));
  };
  onDateChange = date => {
    if (date) {
      this.setState(() => ({
        date,
        vendorName: '',
        vendorsArray: [],
        clickedCheck: false
      }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onSubmit = e => {
    // Prevent Refreshing Page
    e.preventDefault();

    // Check Input Requirements
    if (!this.state.email || !this.state.location || !this.state.vendorName) {
      this.setState(() => ({
        error: 'Please provide your email, location and available vendor'
      }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        email: this.state.email,
        location: this.state.location,
        date: this.state.date.valueOf(),
        vendorName: this.state.vendorName
      });

      // POST Method API to the backend server.js
      axios.post('/api/form', {
        email: this.state.email,
        location: this.state.location,
        date: this.state.date.valueOf(),
        vendorName: this.state.vendorName
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  };
  onVendorChange = e => {
    const vendorName = e.target.value;
    this.setState(() => ({ vendorName }));
  };
  onCheckAvailability = e => {
    // Check e-mail and location input
    if (this.state.email === '' || this.state.location === '') {
      // No input --> throws error
      this.setState(() => ({
        error:
          'Please fill in your e-mail and location then click "Check Availability".'
      }));
    } else {
      // Valid inputs then check availability in Firebase database
      database
        .ref('vendors')
        .once('value')
        .then(snapshot => {
          const vendors = [];

          snapshot.forEach(childSnapshot => {
            let vendorLocation = childSnapshot.val().location;
            let vendorAvailability = childSnapshot.val().availability;

            // Find with reference(vendor's location and availability) --> Match --> Push and save to the array
            if (
              vendorLocation === this.state.location &&
              vendorAvailability === true
            ) {
              vendors.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
              });
            } else {
            }
          });
          console.log(vendors);
          {
            vendors.length > 0
              ? alert(vendors.length + ' result(s) found')
              : alert('No result found! Try different location and date');
          }

          this.setState(() => ({
            vendorsArray: vendors,
            vendorName: '',
            clickedCheck: true
          }));
          {
            vendors.length < 1 &&
              this.setState(() => ({ clickedCheck: false }));
          }
        });
    }
  };
  render() {
    return (
      <div>
        <form className="form" onSubmit={this.onSubmit} action="">
          {this.state.error && (
            <p className="form__error"><i className="far fa-times-circle"></i> {this.state.error}</p>
          )}
          <input
            className="text-input"
            type="email"
            placeholder="E-mail"
            autoFocus
            value={this.state.email}
            onChange={this.onEmailChange}
          />
          <select
            className="select"
            name="location"
            value={this.state.location}
            onChange={this.onLocationChange}
          >
            <option value="" disabled>
              Choose Your Location
            </option>
            <option value="Petaling Jaya">Petaling Jaya</option>
            <option value="Subang Jaya">Subang Jaya</option>
            <option value="Puchong">Puchong</option>
            <option value="Mont Kiara">Mont Kiara</option>
            <option value="Bukit Jalil">Bukit Jalil</option>
            <option value="Kepong">Kepong</option>
            <option value="Shah Alam">Shah Alam</option>
            <option value="Cheras">Cheras</option>
            <option value="Sentul">Sentul</option>
            <option value="Setiawangsa">Setiawangsa</option>
            <option value="TTDI">TTDI</option>
          </select>
          <SingleDatePicker
            date={this.state.date}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
          />
          {this.state.clickedCheck === true &&
            this.state.vendorsArray.length > 0 && (
              <select
                className="select"
                name="vendor"
                value={this.state.vendorName}
                onChange={this.onVendorChange}
              >
                <option value="" disabled>
                  Choose available vendor
                </option>
                {this.state.vendorsArray.map(vendor => {
                  return (
                    <option value={vendor.name} key={vendor.id}>
                      {vendor.name}
                    </option>
                  );
                })}
              </select>
            )}
          {this.state.clickedCheck === true &&
            this.state.vendorsArray.length > 0 && (
              <button className="button">Request Service</button>
            )
          }
          {this.state.clickedCheck === false &&
            this.state.vendorsArray.length === 0 && (
              <button className="button" onClick={this.onCheckAvailability}>
                Check Availability
              </button>
            )
          }
        </form>
      </div>
    );
  }
}

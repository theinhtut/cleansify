import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import database from '../firebase/firebase';

export default class RequestForm extends React.Component {
  state = {
    email: '',
    location: '',
    date: moment(),
    calendarFocused: false,
    error: '',
    vendorName: '',
    vendorsArray: [],
    
  };
  onEmailChange = e => {
    const email = e.target.value;
    this.setState(() => ({ email }));
  };
  onLocationChange = e => {
    const location = e.target.value;
    this.setState(() => ({ location }));
  };
  onDateChange = date => {
    if (date) {
      this.setState(() => ({ date }));
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
    }
  };
  onVendorChange = e => {
    const vendorName = e.target.value;
    this.setState(() => ({ vendorName }));
  };
  onCheckAvailability = (e) => {
      console.log('Check Availability Triggered');
      database
      .ref('vendors')
      .once('value')
      .then(snapshot => {
        const vendors = [];
        snapshot.forEach(childSnapshot => {
          vendors.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        console.log(vendors);
        this.setState(() => ({ vendorsArray: vendors }));
      });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} action="">
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="email"
            placeholder="E-mail"
            autoFocus
            value={this.state.email}
            onChange={this.onEmailChange}
          />
          <select
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
          <select
            name="vendor"
            value={this.state.vendorName}
            onChange={this.onVendorChange}
            
          >
            <option value="" disabled>Choose available vendor</option>
            {
              this.state.vendorsArray.map((vendor) => {
                return <option value={vendor.name} key={vendor.id}>{vendor.name}</option>
              })
            }

          </select>

          <button>Request Service</button>
        </form>
        <button onClick={this.onCheckAvailability}>Check Availability</button>
        {this.state.vendorsArray.length === 0 ? 
        <p>Not Found</p> :
        <p>{this.state.vendorsArray.length} result(s) found!!</p>
        }
        {/* <select name="test" >
        {this.state.vendorsArray.map((request) => {
            return <option value={request.name} key={request.id}>{request.name}</option>
        })}
        </select> */}
        
       
      </div>

    );
  }
}

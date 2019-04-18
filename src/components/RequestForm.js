import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

export default class RequestForm extends React.Component {
    state = {
        email: '',
        location: '',
        date: moment(),
        calendarFocused: false,
        error: ''
    };
    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({ email }));
    };
    onLocationChange = (e) => {
        const location = e.target.value;
        this.setState(() => ({ location }));
    };
    onDateChange = (date) => {
        if(date) {
            this.setState(() => ({ date }));
        }
    };
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };
    onSubmit = (e) => {
        // Prevent Refreshing Page
        e.preventDefault();
        
        // Check Input Requirements
        if (!this.state.email || !this.state.location){
          this.setState(() => ({
            error: 'Please provide your email and location'
          }));
        } else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({
                email: this.state.email,
                location: this.state.location,
                date: this.state.date.valueOf()
            });
        }
    };
    render() {
    return (
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
          <option value="" disabled>Choose Your Location</option>
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

        <button>Request Service</button>
      </form>
    );
  }
}

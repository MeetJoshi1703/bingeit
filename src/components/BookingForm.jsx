import React, { useState,useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingForm = ({ movieDetails, onHide }) => {
  const [formData, setFormData] = useState({
    movieName: movieDetails.name,
    name: '',
    email: '',
    numberOfTickets: 1,
    date: new Date(),
  });

  useEffect(() => {
    
    const storedFormData = localStorage.getItem('bookingFormData');
    if (storedFormData) {
      
      const { name, email } = JSON.parse(storedFormData);
      setFormData((prevData) => ({
        ...prevData,
        name: name || '',
        email: email || '',
      }));
    }
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    console.log('Form submitted with data:', formData);

    
    localStorage.setItem('bookingFormData', JSON.stringify(formData));

    
    onHide();
  };
   
   const maxDate = new Date();
   maxDate.setDate(maxDate.getDate() + 7);

  return (
    <Modal show={true} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton={true}>
        <Modal.Title>Book Movie Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="movieName">
            <Form.Label>Movie Name</Form.Label>
            <Form.Control type="text" name="movieName" value={formData.movieName} readOnly />
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} required />
          </Form.Group>
          <Form.Group controlId="numberOfTickets">
            <Form.Label>Number of Tickets</Form.Label>
            <Form.Control
              type="number"
              name="numberOfTickets"
              value={formData.numberOfTickets}
              onChange={handleInputChange}
              min="1"
              required
            />
          </Form.Group>
          <Form.Group controlId="date" className='my-2'>
            <Form.Label>Date:</Form.Label>
            <DatePicker className='mx-2' selected={formData.date} onChange={handleDateChange} minDate={new Date()} maxDate={maxDate} />
          </Form.Group>
          <button type="submit" className="btn btn-primary">
            confirm booking
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BookingForm;

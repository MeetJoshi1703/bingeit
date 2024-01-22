import React from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ShowCard = ({ show }) => {
  return (
    <Col md={3} className='my-3 mx-4'>
      <Card className='border-1 shadow-sm h-100'>
        <Card.Img variant="top" src={show.image.original} alt={show.name} className='card-img-top rounded-top' style={{ maxHeight: '200px', objectFit: 'cover' }} />
        <Card.Body className='d-flex flex-column'>
          <Card.Title className='h5 mb-3'>{show.name}</Card.Title>
          <Card.Text className='flex-grow-1'>
            <p className='mb-2'><strong>Language:</strong> {show.language}</p>
            <p className='mb-2'><strong>Genres:</strong> {show.genres.join(', ')}</p>
            <p className='mb-2'><strong>Average Rating:</strong> {show.rating.average}</p>
            <p className='mb-0'><strong>Premiered:</strong> {show.premiered}</p>
          </Card.Text>
          <Link to={`/details/${show.id}`} className='mt-auto'>
            <Button variant="primary" block>View Details</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ShowCard;

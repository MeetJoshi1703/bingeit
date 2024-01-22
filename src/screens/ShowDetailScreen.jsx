import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Image, Button } from 'react-bootstrap';
import BookingForm from '../components/BookingForm';
import { Link } from 'react-router-dom';

const removeTags = (htmlString) => {
  const doc = new DOMParser().parseFromString(htmlString, 'text/html');
  return doc.body.textContent || "";
};

const ShowDetailScreen = () => {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        const data = await response.json();
        data.summary = removeTags(data.summary);
        setShowDetails(data);
      } catch (error) {
        console.error('Error fetching show details:', error);
      }
    };

    fetchShowDetails();
  }, [id]);

  if (!showDetails) {
    return <p>Loading...</p>;
  }

  const handleBookTicketClick = () => {
    setShowForm(!showForm);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
    <>
    <Link to="/">
      <Button variant="light" style={{border:'1px solid grey'}} size="md" className='my-2 mx-2'>
        Go Back   
      </Button>
    </Link>
    <Row className="justify-content-center">
      <Col md={8}>
        <Card className="my-4">
          <Card.Body>
            <Row>
              <Col md={4}>
                <Image src={showDetails.image.original} alt={showDetails.name} fluid />
              </Col>
              <Col md={8}>
                <h2>{showDetails.name}</h2>
                <p>{showDetails.summary}</p>
                <div className="d-flex m-4">
                  <p className="font-weight-bold mr-2 m-2">Genre:</p>
                  <div className="d-flex flex-wrap" style={{ gap: '1rem' }}>
                    {showDetails.genres.map((genre, index) => (
                      <span key={index} className="genre-badge bg-light text-black rounded p-1 m-1">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
                <Row>
                  <Col md={6}>
                    <p>
                      <strong>Run Time:</strong> {showDetails.runtime}
                    </p>
                    <p>
                      <strong>Network:</strong> {showDetails.network.name}
                    </p>
                  </Col>
                  <Col md={6}>
                    <p>
                      <strong>Rating:</strong> {showDetails.rating.average}
                    </p>
                    <p>
                      <strong>Premiered:</strong> {showDetails.premiered}
                    </p>
                    <p>
                      <strong>Ended:</strong> {showDetails.ended || 'Still Running'}
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Button variant="primary" size="md" onClick={handleBookTicketClick} className="my-3">
              Book Ticket
            </Button>
          </Card.Body>
        </Card>
      </Col>

      {showForm && <BookingForm movieDetails={showDetails} onHide={handleFormClose} />}
    </Row>
    </>
  );
};

export default ShowDetailScreen;

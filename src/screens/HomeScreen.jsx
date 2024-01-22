import React, { useState, useEffect } from 'react';
import ShowCard from '../components/ShowCard.jsx';

const HomeScreen = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.tvmaze.com/shows');
        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <div className='p-2'>
      <h1 >Welcome to Binge-it</h1>
      <p>Explore a range of TV shows</p>
    </div>
      <div className='cards-section d-flex flex-wrap justify-content-around'>
        {shows.slice(0, 9).map((show) => (
          <ShowCard key={show.id} show={show}  />
        ))}
      </div>
    </>
  );
};

export default HomeScreen;

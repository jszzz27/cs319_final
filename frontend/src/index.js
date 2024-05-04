import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.css";
import { Carousel } from 'react-bootstrap';

function MyCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img src="img1.jpg" alt="Image 1"/>
        <Carousel.Caption>
          <h3>Image 1</h3>
          <p>Text for Image 1</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img src="img2.jpg" alt="Image 2"/>
        <Carousel.Caption>
          <h3>Image 2</h3>
          <p>Text for Image 2</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img src="img3.jpg" alt="Image 3"/>
        <Carousel.Caption>
          <h3>Image 3</h3>
          <p>Text for Image 3</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img src="img4.jpg" alt="Image 4"/>
        <Carousel.Caption>
          <h3>Image 4</h3>
          <p>Text for Image 4</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default MyCarousel;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
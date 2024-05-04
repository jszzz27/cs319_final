import './App.css';
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [product, setProduct] = useState([]);
  const [water, setWater] = useState([]);
  const [beer, setBeer] = useState([]);
  const [soda, setSoda] = useState([]);
  const [juice, setJuice] = useState([]);

  const [viewer1, setViewer1] = useState(false);

  const [oneProduct, setOneProduct] = useState([]);
  const [viewer2, setViewer2] = useState(false);

  const [checked4, setChecked4] = useState(false);
  const [index, setIndex] = useState(0);

  const [checked5, setChecked5] = useState(false);
  const [index2, setIndex2] = useState(0);

  const [menu, setMenu] = useState(2);

  const [addNewReview, setAddNewReview] = useState({
    username: "",
    productName: "",
    comment: "",
    rating: 0.0,
  });

  const [addNewRating, setAddNewRating] = useState(0);

  const [filter, setFilter] = useState('');
  const [filteredBeer, setFilteredBeer] = useState([]);
  const [filteredWater, setFilteredWater] = useState([]);
  const [filteredSoda, setFilteredSoda] = useState([]);
  const [filteredJuice, setFilteredJuice] = useState([]);

  useEffect(() => {
    const filtered = beer.filter(item =>
      item.title.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredBeer(filtered);
  }, [filter, beer]);

  useEffect(() => {
    const filtered = water.filter(item =>
      item.title.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredWater(filtered);
  }, [filter, water]);

  useEffect(() => {
    const filtered = soda.filter(item =>
      item.title.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredSoda(filtered);
  }, [filter, soda]);

  useEffect(() => {
    const filtered = juice.filter(item =>
      item.title.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredJuice(filtered);
  }, [filter, juice]);

  useEffect(() => {
    getAllBeerProducts();
  }, [filter]);

  useEffect(() => {
    getAllBeerProducts();
  }, []);

  useEffect(() => {
    getAllWaterProducts();
  }, []);

  useEffect(() => {
    getAllSodaProducts();
  }, []);

  useEffect(() => {
    getAllJuiceProducts();
  }, []);

  function getAllBeerProducts() {
    fetch("http://localhost:4000/beer")
    .then((response) => response.json())
    .then((data) => {
      console.log("Show Catalog of Products :");
      console.log(data);
      setBeer(data);
    });
  }

  function getAllWaterProducts() {
    fetch("http://localhost:4000/water")
    .then((response) => response.json())
    .then((data) => {
      console.log("Show Catalog of Products :");
      console.log(data);
      setWater(data);
    });
  }

  function getAllSodaProducts() {
    fetch("http://localhost:4000/soda")
    .then((response) => response.json())
    .then((data) => {
      console.log("Show Catalog of Products :");
      console.log(data);
      setSoda(data);
    });
  }

  function getAllJuiceProducts() {
    fetch("http://localhost:4000/juice")
    .then((response) => response.json())
    .then((data) => {
      console.log("Show Catalog of Products :");
      console.log(data);
      setJuice(data);
    });
  }

  function getOneProduct(id) {
    console.log(id);
    if (id >= 1) {
      fetch("http://localhost:4000/" + id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show one product :", id);
          console.log(data);
          const dataArr = [];
          dataArr.push(data);
          setOneProduct(dataArr);
          setViewer2(!viewer2);
        })
        .catch((err) => {
          console.log("Wrong number of Product id.");
          setViewer2(false);
        })
    } else {
      console.log("Wrong number of Product id.");
      setViewer2(false);
    }
  }

  function handleChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "username") {
      setAddNewRating({ ...addNewRating, username: value });
    } else if (evt.target.name === "productName") {
      setAddNewRating({ ...addNewRating, productName: value });
    } else if (evt.target.name === "comment") {
      setAddNewRating({ ...addNewRating, comment: value });
    } else if (evt.target.name === "rating") {
      console.log(value);
      setAddNewRating({ ...addNewRating, rating: value });
    }
  }

  function handleUpdateChange(evt) {
    setAddNewRating(evt.target.value);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://localhost:4000/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewRating),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new rating completed");
        console.log(data);
        if (data) {
          const value = Object.values(data);
          alert(value);
          window.location.reload();
        }
      });
  }

  function getOneByOneProductNext() {
    if (product.length > 0) {
      if (index === product.length - 1) setIndex(0);
      else setIndex(index + 1);
      if (product.length > 0) setChecked4(true);
      else setChecked4(false);
    }
  }

  function getOneByOneProductPrev() {
    if (product.length > 0) {
      if (index === 0) setIndex(product.length - 1);
      else setIndex(index - 1);
      if (product.length > 0) setChecked4(true);
      else setChecked4(false);
    }
  }

  function getOneByOneProductNextU() {
    if (product.length > 0) {
      if (index2 === product.length - 1) setIndex2(0);
      else setIndex2(index2 + 1);
      if (product.length > 0) setChecked5(true);
      else setChecked5(false);
    }
  }

  function getOneByOneProductPrevU() {
    if (product.length > 0) {
      if (index2 === 0) setIndex2(product.length - 1);
      else setIndex2(index2 - 1);
      if (product.length > 0) setChecked5(true);
      else setChecked5(false);
    }
  }

  function deleteOneProduct(deleteid) {
    console.log("Product to delete :", deleteid);
    fetch("http://localhost:4000/delete/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: deleteid }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Delete a product completed : ", deleteid);
        console.log(data);
        if (data) {
          const value = Object.values(data);
          alert(value);
        }
      });
    setChecked4(!checked4);
    window.location.reload();
  }

  function updateOneProduct(updateid, new_price) {
    console.log("Product to update :", updateid);
    console.log("Value to update :", new_price);
    fetch("http://localhost:4000/update/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: updateid, price: new_price }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Updating the product's price completed : ", updateid);
        console.log(data);
        if (data) {
          const value = Object.values(data);
          alert(value);
        }
      });
    setViewer1(false);
    setChecked5(!checked5);
    window.location.reload();
  }

  const showAllWater = filteredWater.map((el) => (
    <div key={el.beerID} className='col-3 px-2'>
      <div className='card border border-dark' style={{ width: `25rem` }}>
        <img src={el.url} width={20} alt={el.title} className='card-img-top' />
        <div className='card-body border border-dark' style={{ background: `lightgray` }}>
          <p className='card-text'><span className='fw-bold'>Title:</span> {el.title}</p>
          <p className='card-text'><span className='fw-bold'>Description:</span> {el.description}</p>
        </div>
      </div>
    </div>
  ));

  const showAllBeer = filteredBeer.map((el) => (
    <div key={el.beerID} className='col-3 px-2'>
      <div className='card border border-dark' style={{ width: `25rem` }}>
        <img src={el.url} width={20} alt={el.title} className='card-img-top' />
        <div className='card-body border border-dark' style={{ background: `lightgray` }}>
          <p className='card-text'><span className='fw-bold'>Title:</span> {el.title}</p>
          <p className='card-text'><span className='fw-bold'>Description:</span> {el.description}</p>
        </div>
      </div>
    </div>
  ));

  const showAllSoda = filteredSoda.map((el) => (
    <div key={el.beerID} className='col-3 px-2'>
      <div className='card border border-dark' style={{ width: `25rem` }}>
        <img src={el.url} width={20} alt={el.title} className='card-img-top' />
        <div className='card-body border border-dark' style={{ background: `lightgray` }}>
          <p className='card-text'><span className='fw-bold'>Title:</span> {el.title}</p>
          <p className='card-text'><span className='fw-bold'>Description:</span> {el.description}</p>
        </div>
      </div>
    </div>
  ));

  const showAllJuice = filteredJuice.map((el) => (
    <div key={el.beerID} className='col-3 px-2'>
      <div className='card border border-dark' style={{ width: `25rem` }}>
        <img src={el.url} width={20} alt={el.title} className='card-img-top' />
        <div className='card-body border border-dark' style={{ background: `lightgray` }}>
          <p className='card-text'><span className='fw-bold'>Title:</span> {el.title}</p>
          <p className='card-text'><span className='fw-bold'>Description:</span> {el.description}</p>
        </div>
      </div>
    </div>
  ));

  const showOneItem = oneProduct.map((el) => (
    <div key={el._id} style={{marginLeft: '42%', marginTop: '1%'}}>
      <div className='card border border-dark' style={{ width: `25rem` }}>
        <img src={el.image} width={20} alt={el.title} className='card-img-top' />
        <div className='card-body border border-dark' style={{ background: `lightgray` }}>
          <p className='card-text'><span className='fw-bold'>Title:</span> {el.title}</p>
          <p className='card-text'><span className='fw-bold'>Category:</span> {el.category}</p>
          <p className='card-text'><span className='fw-bold'>Price:</span> {el.price}</p>
          <p className='card-text'><span className='fw-bold'>Rate:</span> {el.rating.rate} <span className='fw-bold'>Count:</span> {el.rating.count}</p>
          <p className='card-text'><span className='fw-bold'>Description:</span> {el.description}</p>
        </div>
      </div>
    </div>
  ));

  return (
    <div style={{ minHeight: `100vh` }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Best Beverages</h1>
        <nav className="navbar navbar-expand-lg bg-body-tertiary border border-dark" style={{background: '#010203'}} >
          <div className="container-fluid">
            <div className="collapse navbar-collapse justify-content-center">
              <div className="btn-group-lg" role="group">
                <button className="btn btn-danger" aria-current="page" style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => setMenu(1)}>Main</button>
                <button className="btn btn-danger" style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => setMenu(2)}>Beer</button>
                <button className="btn btn-danger" style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => setMenu(3)}>Water</button>
                <button className="btn btn-danger" style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => setMenu(4)}>Soda</button>
                <button className="btn btn-danger" style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => setMenu(5)}>Juice</button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className='m-4'>
      {menu === 1 && (
        <div className="container">
          <div id="myCarousel" className="carousel slide" data-ride="carousel">
            {/* <!-- Indicators --> */}
            <ol className="carousel-indicators">
              <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
              <li data-target="#myCarousel" data-slide-to="1"></li>
              <li data-target="#myCarousel" data-slide-to="2"></li>
              <li data-target="#myCarousel" data-slide-to="3"></li>
            </ol>

            {/* <!-- Wrapper for slides --> */}
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="data:image/jpeg;base64,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" alt="Image 1"/>
                <div className="carousel-caption">
                  <h3>Image 1</h3>
                  <p>Text for Image 1</p>
                </div>
              </div>

              <div className="carousel-item">
                <img src="data:image/jpeg;base64,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" alt="Image 2"/>
                <div className="carousel-caption">
                  <h3>Image 2</h3>
                  <p>Text for Image 2</p>
                </div>
              </div>

              <div className="carousel-item">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-wHDeCPtZfvq8EzNBgo4jHXdR-jL0W3gd_A&s" alt="Image 3"/>
                <div className="carousel-caption">
                  <h3>Image 3</h3>
                  <p>Text for Image 3</p>
                </div>
              </div>

              <div className="carousel-item">
                <img src="data:image/jpeg;base64,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" alt="Image 4"/>
                <div className="carousel-caption">
                  <h3>Image 4</h3>
                  <p>Text for Image 4</p>
                </div>
              </div>
            </div>

            {/* <!-- Left and right controls --> */}
            <a className="carousel-control-prev" href="#myCarousel" data-slide="prev">
              <span className="carousel-control-prev-icon"></span>
            </a>
            <a className="carousel-control-next" href="#myCarousel" data-slide="next">
              <span className="carousel-control-next-icon"></span>
            </a>
          </div>

          <hr></hr>

          <div className="row mt-5">
              <div className="col-md-6">
                  <h2>Top 3 Soda Brands:</h2>
                  <p>A refreshing companion for any occasion, adding sparkle to gatherings and moments of relaxation. Enjoy the effervescent delight of soda, a timeless beverage loved by all ages.</p>
              </div>
              <div className="col-md-6">
                  <img src="/images/coca-cola.jpg" className="img-fluid" alt="Coca-Cola" />
              </div>
          </div>
          <div className="row mt-5">
              <div className="col-md-6">
                  <img src="/images/guinness.jpg" className="img-fluid" alt="Guinness" />
              </div>
              <div className="col-md-6">
                  <h2>Top 3 Beer Brands:</h2>
                  <p>Fosters conviviality and shared moments, whether at the pub or a social gathering. Embrace the artistry and heritage behind each brew, ensuring a memorable and enjoyable experience with every sip.</p>
              </div>
          </div>
          <div className="row mt-5">
              <div className="col-md-6">
                  <h2>Top 3 Water Brands:</h2>
                  <p>A timeless necessity that quenches thirst and supports optimal bodily functions. Stay balanced and energized with the crisp purity of water, the ultimate refreshment for body and mind.</p>
              </div>
              <div className="col-md-6">
                  <img src="/images/evian.jpg" className="img-fluid" alt="Evian" />
              </div>
          </div>
          <div className="row mt-5">
              <div className="col-md-6">
                  <img src="/images/tropicana.jpg" className="img-fluid" alt="Tropicana" />
              </div>
              <div className="col-md-6">
                  <h2>Top 3 Juice Brands:</h2>
                  <p>A nourishing choice packed with vitamins and antioxidants, perfect for a healthy lifestyle. Indulge in the invigorating freshness of juice, a delicious and revitalizing way to hydrate your body.</p>
              </div>
          </div>

          <hr></hr>

          <div className="row mt-6">
            <div className="col-md-4">
                <img id="profile" src="./myotherimages/junsange.jpg" alt="junsang" width="160px" height="200px" />
                <h2 className="fw-normal">Jun-Sang Kim</h2>
                <p id="email">junsange@iastate.edu</p>
                <p>My name is Jun-Sang Kim, and I am a junior at Iowa State University majoring in Software Engineering. This is my first time learning about HTML, CSS, JavaScript, and web development, which means all the techniques and skills I am developing and utilizing here are basically all from the content of this course. However, as a student majoring in Software Engineering field, I have learned various types of languages and skills, such as C, C++, Java, Android Studio, MySQL, and Git, that can be transferred to this course and are actually helpful for me to understand the content easily.</p>
            </div>
            <div className="col-md-4">
                <h2>About Us</h2>
                <p>Iowa State University - May 5th, Spring 2024</p>
                <p>SE / COM S 319 - Construction of User Interfaces</p>
                <p>We are here to provide you a chance to select the best beverage in your lifetime.</p>
                <p>Welcome to the Paradise.</p>
            </div>
            <div className="col-md-4">
                <img id="profile" src="./myotherimages/antonio.jpg" alt="antonio" width="160px" height="200px"/>
                <h2 className="fw-normal">Antonio Perez</h2>
                <p id="email">avperez@iastate.edu</p>
                <p>My name is Antonio Perez; I am a senior here at Iowa State University majoring in Aerospace Engineering and minoring in Computer Science. While my background is mainly in engineering and design, I have experience with VS code, Git, and various coding languages. This is my first course where I have been introduced to HTML, CSS and Javascript. However, my skillset has aligned me for quick learning and ample problem-solving skills. These will prove essential for the midterm and the work that will come beyond this project's scope.</p>
            </div>
        </div>
      </div>
      )}

        {menu === 2 && <div>
          <h1 className='text-center text-danger'>Beer</h1>
          <div class="search-container" className='text-center'>
            <form action="/action_page.php">
              <input type="text" placeholder="Search.." name="search"
                onChange={(e) => {
                  setFilter(e.target.value);
                }}></input>
            </form>
          </div>
          <hr></hr>
          <div><span className='row row-cols-auto'>{showAllBeer}</span></div>
        </div>}

        {menu === 3 && <div>
          <h1 className='text-center text-danger'>Water</h1>
          <div class="search-container" className='text-center'>
            <form action="/action_page.php">
              <input type="text" placeholder="Search.." name="search"
                onChange={(e) => {
                  setFilter(e.target.value);
                }}></input>
            </form>
          </div>
          <hr></hr>
          <div><span className='row row-cols-auto'>{showAllWater}</span></div>
        </div>}

        {menu === 4 && <div>
          <h1 className='text-center text-danger'>Soda</h1>
          <div class="search-container" className='text-center'>
            <form action="/action_page.php">
              <input type="text" placeholder="Search.." name="search"
                onChange={(e) => {
                  setFilter(e.target.value);
                }}></input>
            </form>
          </div>
          <hr></hr>
          <div><span className='row row-cols-auto'>{showAllSoda}</span></div>
        </div>}

        {menu === 5 && <div>
          <h1 className='text-center text-danger'>Juice</h1>
          <div class="search-container" className='text-center'>
            <form action="/action_page.php">
              <input type="text" placeholder="Search.." name="search"
                onChange={(e) => {
                  setFilter(e.target.value);
                }}></input>
            </form>
          </div>
          <hr></hr>
          <div><span className='row row-cols-auto'>{showAllJuice}</span></div> 
        </div>}
      </div>
    </div>
  );
}
// App end
export default App
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
                <img src="img2.jpg" alt="Image 2"/>
                <div className="carousel-caption">
                  <h3>Image 2</h3>
                  <p>Text for Image 2</p>
                </div>
              </div>

              <div className="carousel-item">
                <img src="img3.jpg" alt="Image 3"/>
                <div className="carousel-caption">
                  <h3>Image 3</h3>
                  <p>Text for Image 3</p>
                </div>
              </div>

              <div className="carousel-item">
                <img src="img4.jpg" alt="Image 4"/>
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
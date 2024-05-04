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
                <img src="img1.jpg" alt="Image 1"/>
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
                  <img src="data:image/jpeg;base64,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" className="img-fluid" alt="Coca-Cola" />
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
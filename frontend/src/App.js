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

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isItemSelected, setIsItemSelected] = useState(false);

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
      <div className='card border border-dark' style={{ width: `25rem`, cursor: 'pointer' }}
        onClick={() => setSelectedProduct(el)}>
        <img src={el.url} width={20} alt={el.title} className='card-img-top' />
        <div className='card-body border border-dark' style={{ background: `lightgray` }}>
          <p className='card-text'><span className='fw-bold'>Title:</span> {el.title}</p>
          <p className='card-text'><span className='fw-bold'>Description:</span> {el.description}</p>
        </div>
      </div>
    </div>
  ));

  const showSelectedProduct = () => {
    if (selectedProduct) {
      return (
        <div className='selected-product'>
          <div className='selected-product-img'>
            <img src={selectedProduct.url} alt={selectedProduct.title} />
          </div>
          <div className='selected-product-details'>
            <h2>{selectedProduct.title}</h2>
            <p>{selectedProduct.description}</p>
            <button onClick={() => handleGoBack()}>Go Back</button>
          </div>
        </div>
      );
    }
    return null;
  };

  const handleGoBack = () => {
    setSelectedProduct(null);
    setIsItemSelected(false);
  };

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
              <div className="carousel-item" style={{backgroundImage: `url('data:image/jpeg;base64,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')`}}>
                <div className="carousel-caption d-flex h-100 align-items-center justify-content-center">
                  <h3>Image 1</h3>
                  <p>Text for Image 1</p>
                </div>
              </div>
    
              <div className="carousel-item" style={{backgroundImage: `url('img2.jpg')`}}>
                <div className="carousel-caption d-flex h-100 align-items-center justify-content-center">
                  <h3>Image 2</h3>
                  <p>Text for Image 2</p>
                </div>
              </div>
    
              <div className="carousel-item" style={{backgroundImage: `url('img3.jpg')`}}>
                <div className="carousel-caption d-flex h-100 align-items-center justify-content-center">
                  <h3>Image 3</h3>
                  <p>Text for Image 3</p>
                </div>
              </div>
    
              <div className="carousel-item" style={{backgroundImage: `url('img4.jpg')`}}>
                <div className="carousel-caption d-flex h-100 align-items-center justify-content-center">
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
          {!isItemSelected && <h1 className='text-center text-danger'>Beer</h1>}
          {!isItemSelected && (
          <div>
            <div className="search-container text-center">
              <form action="/action_page.php">
                <input
                  type="text"
                  placeholder="Search.."
                  name="search"
                  onChange={(e) => setFilter(e.target.value)}
                />
              </form>
            </div>
            <hr />
            <div className='row row-cols-auto'>
              {filteredBeer.map((el) => (
                <div key={el.beerID} className='col-3 px-2'>
                  <div className='card border border-dark' style={{ width: `25rem`, cursor: 'pointer' }}
                  onClick={() => {
                    setSelectedProduct(el);
                    setIsItemSelected(true);
                  }}>
                    <img src={el.url} width={20} alt={el.title} className='card-img-top' />
                    <div className='card-body border border-dark' style={{ background: `lightgray` }}>
                      <p className='card-text'><span className='fw-bold'>Title:</span> {el.title}</p>
                      <p className='card-text'><span className='fw-bold'>Description:</span> {el.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}
        {isItemSelected && showSelectedProduct()}
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
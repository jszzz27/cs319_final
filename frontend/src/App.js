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
              <div className="carousel-item active">
                <div className="image-crop">
                </div>
                <img src="data:image/jpeg;base64,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K9XZNtXObWbhIWO/UGaIomYd9EVhhuD3rn7vkSf3p3Sx2l7bIVDbnQAsBrGxoigXCFJBI0JG/MGKIkLjaRRFIwWDe6tx7YBWyhuXGkAKoIE6nXUgQO+iKOGG00RS+D4BsVfTD2ipuXDlUEwJgnU8tjRFFYwSCRI0oiKIiiIoiKIiiIoiKIiiIoiKIiiIoiKIiiIoiKIiiIoiKIiiIoiKIiiIoiKIiiIoiKIiiKbhuE3rihktyrGAcyie1l5nTtGNfyrCLocGv9j7P1/VllBPZzbEyDGusRWUUc4N5iBJiIYGZEgggwQQJkaURBwbxMCIBnMux2O+3j4HuoiUYG5/Dzjcb66b+B+FETLqQYP6+FEXNERRFougBcY1GSwcQyq5yKUDjsxnTrewXUkEA1g7IFtekPEMTg7GOupiXN/q8EZuJZ663L35t3BbBtlwNZiYYeZwBayTSmcX4V12ItrhrasMPxSzdvqmUZEa1h3ZyJHZJzmRzmsArNJcHx6+GwrJeQYe3jsVZxX+F2Va+BYBkZgCD6y94JNKS05wBsQFvG6HfErjP/VLaGGlrItWzbF03CFFg2+aa6n700KKnwnEGR+H2sLhxcsXFvX2wqi1LHrLuVs7ype2MpUZo7IA5VnvWFZ9di7d/EW7eJdsTewIa3avLh1vI6XTlV8g6pmyu5E7g6+qIxwWVkHN3iOFJ0sYLBYeWMW+1iEt67Zbma7m8RJ5mttlrutowxY4lZzCwOH/ALxb/dD9kNOpb/2+TtRvm8NtJrXSlssV0zvsi2WwjRgXtPbthRBDHS+t/ebzGTOxX1fvE7BYKxlZWEURFERREURFERREURFERREURFERREURFERREURFERREURFERREURFERREURFERREURSMPibmiC6yqZEZyFEzMgaAGT8aIpdx72hOKkgiPtmJE6SPcTtymsIm+qdmJN9Z/iNwyYkeffrtrREoW5v+8LIO/WGZ3O+s7a0RcLbcaC8oET/AIhG8E7c5PxFEUW8sEjMGjmDI25H8Kyi4oiKIkZQdCJ86IkVANgBG1ESG0p3UabaURdZR3URcm0umg0202oiUoDyGu9EQLYiIEd0aURKVG8a99ESdWuug1303oiWOdES0RFERREURFERREURFERREURFERREURFERREURFERREURFERREURFERREURFERREURFERREURFERREURFERRF/9k=" alt="Image 2" className="d-block w-100"/>
                <div className="carousel-caption d-flex h-100 align-items-center justify-content-center">
                  <h3>Image 1</h3>
                  <p>Text for Image 1</p>
                </div>
              </div>
        
              <div className="carousel-item">
                <img src="img2.jpg" alt="Image 2" className="d-block w-100"/>
                <div className="carousel-caption d-flex h-100 align-items-center justify-content-center">
                  <h3>Image 2</h3>
                  <p>Text for Image 2</p>
                </div>
              </div>
        
              <div className="carousel-item">
                <img src="img3.jpg" alt="Image 3" className="d-block w-100"/>
                <div className="carousel-caption d-flex h-100 align-items-center justify-content-center">
                  <h3>Image 3</h3>
                  <p>Text for Image 3</p>
                </div>
              </div>
        
              <div className="carousel-item">
                <img src="img4.jpg" alt="Image 4" className="d-block w-100"/>
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
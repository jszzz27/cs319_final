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

      {menu === 3 && 
        <div style={{
          backgroundImage: `url('data:image/jpeg;base64,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')`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          backgroundBlendMode: 'overlay'
        }}>
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
        </div>
      }

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
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
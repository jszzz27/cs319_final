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
          <div style={{
            backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzvcZT3TwWZdlnehELDmR2uD-qS3Eey7Erew&s')`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            backgroundBlendMode: 'overlay'
          }}>

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
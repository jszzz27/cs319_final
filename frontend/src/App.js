import './App.css';
import { useState, useEffect } from "react";

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

  // useEffect(() => {
  //   getAllBeerProducts();
  //   // getAllWaterProducts();
  //   // getAllSodaProducts();
  //   // getAllJuiceProducts();
  // }, [checked4]);

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

  const showAllWater = water.map((el) => (
    <div key={el.beerID} className='col mt-3'>
      <div className='card border border-dark' style={{ width: `18rem` }}>
        <img src={el.url} width={20} alt={el.title} className='card-img-top' />
        <div className='card-body border border-dark' style={{ background: `lightgray` }}>
          <p className='card-text'><span className='fw-bold'>Title:</span> {el.title}</p>
          <p className='card-text'><span className='fw-bold'>Description:</span> {el.description}</p>
        </div>
      </div>
    </div>
  ));

  const showAllBeer = beer.map((el) => (
    <div key={el.beerID} className='col mt-3'>
      <div className='card border border-dark' style={{ width: `18rem` }}>
        <img src={el.url} width={20} alt={el.title} className='card-img-top' />
        <div className='card-body border border-dark' style={{ background: `lightgray` }}>
          <p className='card-text'><span className='fw-bold'>Title:</span> {el.title}</p>
          <p className='card-text'><span className='fw-bold'>Description:</span> {el.description}</p>
        </div>
      </div>
    </div>
  ));

  const showAllSoda = soda.map((el) => (
    <div key={el.beerID} className='col mt-3'>
      <div className='card border border-dark' style={{ width: `18rem` }}>
        <img src={el.url} width={20} alt={el.title} className='card-img-top' />
        <div className='card-body border border-dark' style={{ background: `lightgray` }}>
          <p className='card-text'><span className='fw-bold'>Title:</span> {el.title}</p>
          <p className='card-text'><span className='fw-bold'>Description:</span> {el.description}</p>
        </div>
      </div>
    </div>
  ));

  const showAllJuice = juice.map((el) => (
    <div key={el.beerID} className='col mt-3'>
      <div className='card border border-dark' style={{ width: `18rem` }}>
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
      <div className='card border border-dark' style={{ width: `18rem` }}>
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
        <div className="row">
          <div className="col">
            <h1 className="text-center mt-5">Best Beverages</h1>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <h2>Top 3 Soda Brands:</h2>
            <p>A refreshing companion for any occasion, adding sparkle to gatherings and moments of relaxation. Enjoy the effervescent delight of soda, a timeless beverage loved by all ages.</p>
            <img src="/images/coca-cola.jpg" className="img-fluid" alt="Coca-Cola" />
          </div>
          <div className="col-md-6">
            <h2>Top 3 Beer Brands:</h2>
            <p>Fosters conviviality and shared moments, whether at the pub or a social gathering. Embrace the artistry and heritage behind each brew, ensuring a memorable and enjoyable experience with every sip.</p>
            <img src="/images/guinness.jpg" className="img-fluid" alt="Guinness" />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <h2>Top 3 Water Brands:</h2>
            <p>A timeless necessity that quenches thirst and supports optimal bodily functions. Stay balanced and energized with the crisp purity of water, the ultimate refreshment for body and mind.</p>
            <img src="/images/evian.jpg" className="img-fluid" alt="Evian" />
          </div>
          <div className="col-md-6">
            <h2>Top 3 Juice Brands:</h2>
            <p>A nourishing choice packed with vitamins and antioxidants, perfect for a healthy lifestyle. Indulge in the invigorating freshness of juice, a delicious and revitalizing way to hydrate your body.</p>
            <img src="/images/tropicana.jpg" className="img-fluid" alt="Tropicana" />
          </div>
        </div>
      </div>
      )}

        {menu === 2 && <div>
          <h1 className='text-center text-danger'>Beer</h1>
          <script type="text/javascript">
            {getAllBeerProducts()}
          </script>
          <hr></hr>
          <div><span className='row row-cols-auto'>{showAllBeer}</span></div>
        </div>}

        {menu === 3 && <div>
          <h1 className='text-center text-danger'>Water</h1>
          <script type="text/javascript">
            {getAllWaterProducts()}
          </script>
          {/* { getAllWaterProducts() } */}
          <hr></hr>
          <div><span className='row row-cols-auto'>{showAllWater}</span></div>
        </div>}

        {menu === 4 && <div>
          <h1 className='text-center text-danger'>Soda</h1>
          <script type="text/javascript">
            {getAllSodaProducts()}
          </script>
          {/* { getAllSodaProducts() } */}
          <hr></hr>
          <div><span className='row row-cols-auto'>{showAllSoda}</span></div>
        </div>}

        {menu === 5 && <div>
          <h1 className='text-center text-danger'>Juice</h1>
          <script type="text/javascript">
            {getAllJuiceProducts()}
          </script>
          {/* { getAllJuiceProducts() } */}
          <hr></hr>
          <div><span className='row row-cols-auto'>{showAllJuice}</span></div> 
        </div>}
      </div>
    </div>
  );
}
// App end
export default App
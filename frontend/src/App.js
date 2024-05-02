import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [product, setProduct] = useState([]);
  const [viewer1, setViewer1] = useState(false);

  const [oneProduct, setOneProduct] = useState([]);
  const [viewer2, setViewer2] = useState(false);

  const [checked4, setChecked4] = useState(false);
  const [index, setIndex] = useState(0);

  const [checked5, setChecked5] = useState(false);
  const [index2, setIndex2] = useState(0);

  const [menu, setMenu] = useState(2);

  const [addNewProduct, setAddNewProduct] = useState({
    _id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "http://127.0.0.1:4000/images/",
    rating: { rate: 0.0, count: 0 },
  });

  const [addNewPrice, setAddNewPrice] = useState(0);

  useEffect(() => {
    getAllProducts();
  }, [checked4]);

  function getAllProducts() {
    fetch("http://localhost:4000/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setProduct(data);
      });
    setViewer1(!viewer1);
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
    if (evt.target.name === "_id") {
      setAddNewProduct({ ...addNewProduct, _id: value });
    } else if (evt.target.name === "title") {
      setAddNewProduct({ ...addNewProduct, title: value });
    } else if (evt.target.name === "price") {
      setAddNewProduct({ ...addNewProduct, price: value });
    } else if (evt.target.name === "description") {
      setAddNewProduct({ ...addNewProduct, description: value });
    } else if (evt.target.name === "category") {
      setAddNewProduct({ ...addNewProduct, category: value });
    } else if (evt.target.name === "image") {
      const temp = value;
      setAddNewProduct({ ...addNewProduct, image: temp });
    } else if (evt.target.name === "rate") {
      console.log(value);
      setAddNewProduct({ ...addNewProduct, rating: { rate: value } });
    } else if (evt.target.name === "count") {
      const temp = addNewProduct.rating.rate;
      setAddNewProduct({ ...addNewProduct, rating: { rate: temp, count: value } });
    }
  }

  function handleUpdateChange(evt) {
    setAddNewPrice(evt.target.value);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://localhost:4000/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new product completed");
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

  const showAllItems = product.map((el) => (
    <div key={el._id} className='col mt-3'>
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
        <h1>Assignment #3: Catalog of Products</h1>
        <nav className="navbar navbar-expand-lg bg-body-tertiary border border-dark" style={{background: '#010203'}} >
          <div className="container-fluid">
            <div className="collapse navbar-collapse justify-content-center">
              <div className="btn-group-lg" role="group">
                <button className="btn btn-danger" style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => setMenu(1)}>Create</button>
                <button className="btn btn-danger" aria-current="page" style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => setMenu(2)}>Read</button>
                <button className="btn btn-danger" style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => setMenu(3)}>Update</button>
                <button className="btn btn-danger" style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => setMenu(4)}>Delete</button>
                <button className="btn btn-danger" style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => setMenu(5)}>About Us</button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className='m-4'>
        {menu === 2 && <div>
          <h1 className='text-center text-danger'>Show All Products</h1>
          <div id='showall'><button className='btn btn-danger btn-lg' onClick={() => getAllProducts()}>Show All</button></div>
          <hr></hr>
          {viewer1 && <div><span className='row row-cols-auto'>{showAllItems}</span></div>}

          <hr></hr>
          <h1 className='text-center text-danger'>Show One Product by ID</h1>
          <input type="text" id="message" name="message" placeholder="id" className='form-control form-control-lg' style={{ maxWidth: `10vw` }} onChange={(e) => getOneProduct(e.target.value)} />
          {viewer2 && <div>{showOneItem}</div>}
          <hr></hr>
        </div>}

        {menu === 1 && <div>
          <h1 className='text-center fs-1 fw-bold text-danger fw-underline'>Add a New Product</h1>
          <form style={{ maxWidth: `50vw`, marginLeft: `25vw` }}>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label col-form-label-lg">Product ID</label>
              <div className="col-sm-10">
                <input type="number" className="form-control form-control-lg" placeholder="ID" name="_id" value={addNewProduct._id} onChange={handleChange} />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label col-form-label-lg">Name</label>
              <div className="col-sm-10">
                <input type="text" className="form-control form-control-lg" name="title" value={addNewProduct.title} onChange={handleChange} />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label col-form-label-lg">Price</label>
              <div className="col-sm-10">
                <input type="number" className="form-control form-control-lg" name="price" value={addNewProduct.price} onChange={handleChange} />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label col-form-label-lg">Category</label>
              <div className="col-sm-10">
                <input type="text" className="form-control form-control-lg" name="category" value={addNewProduct.category} onChange={handleChange} />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label col-form-label-lg">Description</label>
              <div className="col-sm-10">
                <input type="text" className="form-control form-control-lg" name="description" value={addNewProduct.description} onChange={handleChange} />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label col-form-label-lg">Image URL</label>
              <div className="col-sm-10">
                <input type="text" className="form-control form-control-lg" name="image" value={addNewProduct.image} onChange={handleChange} />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label col-form-label-lg">Rating</label>
              <div className="col-sm-10">
                <input type="number" className="form-control form-control-lg" name="rate" value={addNewProduct.rating.rate} onChange={handleChange} />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label col-form-label-lg">Count</label>
              <div className="col-sm-10">
                <input type="number" className="form-control form-control-lg" name="count" value={addNewProduct.rating.count} onChange={handleChange} />
              </div>
            </div>
            <div className="row mb-3">
              <button type="submit" onClick={handleOnSubmit} className="btn btn-danger col-auto">
                Submit
              </button>
            </div>
          </form>
        </div>}

        {menu === 4 && <div>
          <h1 className='text-center fs-1 fw-bold text-danger fw-underline'>Delete One Product</h1>
          <div style={{width: `286px`, marginLeft: `41vw`}}>
            <div>
              <div className="row flex-nowrap">
                <div className="col">
                <button className='btn btn-secondary' onClick={() => getOneByOneProductPrev()}>Prev.</button>
                </div>
                <div className="col">
                <button className='btn btn-secondary' onClick={() => getOneByOneProductNext()}>Next</button>
                </div>
                <div className="col">
                <button className='btn btn-danger' onClick={() => deleteOneProduct(product[index]._id)}>Delete</button>
                </div>
              </div>
            </div>
          <div key={product[index]._id}>
            <div className='card border border-dark' style={{ width: `18rem`, marginTop: '4%' }}>
              <img src={product[index].image} width={20} alt={product[index].title} className='card-img-top' />
              <div className='card-body border border-dark' style={{ background: `lightgray` }}>
                <p className='card-text'><span className='fw-bold'>Title:</span> {product[index].title}</p>
                <p className='card-text'><span className='fw-bold'>Category:</span> {product[index].category}</p>
                <p className='card-text'><span className='fw-bold'>Price:</span> {product[index].price}</p>
                <p className='card-text'><span className='fw-bold'>Rate:</span> {product[index].rating.rate} <span className='fw-bold'>Count:</span> {product[index].rating.count}</p>
              </div>
            </div>
            </div>
          </div>
        </div>}

        {menu === 3 && <div>
          <h1 className='text-center fs-1 fw-bold text-danger fw-underline'>Update One Products's Price</h1>
          <div style={{width: `286px`, marginLeft: `41vw`}}>
            <div>
              <div className="row flex-nowrap">
                <div className="col">
                  <button className='btn btn-secondary' onClick={() => getOneByOneProductPrevU()}>Prev.</button>
                </div>
                <div className="col">
                  <button className='btn btn-secondary' onClick={() => getOneByOneProductNextU()}>Next</button>
                </div>
              </div>
            </div>
            <input style={{maxWidth: `50%`}} type="number" placeholder="New Price" name="updated_price" value={addNewPrice} onChange={handleUpdateChange} />
            <button className='btn btn-danger m-2' onClick={() => updateOneProduct(product[index2]._id, addNewPrice)}>Update Price</button>
            <div key={product[index2]._id}>
              <div className='card border border-dark' style={{ width: `18rem` }}>
                <img src={product[index2].image} width={20} alt={product[index2].title} className='card-img-top' />
                <div className='card-body border border-dark' style={{ background: `lightgray` }}>
                  <p className='card-text'><span className='fw-bold'>Title:</span> {product[index2].title}</p>
                  <p className='card-text'><span className='fw-bold'>Category:</span> {product[index2].category}</p>
                  <p className='card-text'><span className='fw-bold'>Price:</span> {product[index2].price}</p>
                  <p className='card-text'><span className='fw-bold'>Rate:</span> {product[index2].rating.rate} <span className='fw-bold'>Count:</span> {product[index2].rating.count}</p>
                </div>
              </div>
            </div>
          </div>
        </div>}

        {menu === 5 && <div>
          <h1 className='text-center fs-1 fw-bold text-danger fw-underline'>About Us</h1>
          <div className='text-center'>
            <p><span className='fw-bold'>Team:</span> #38</p>
            <p><span className='fw-bold'>Member #1:</span> Jun-Sang Kim (<a href="mailto:junsange@iastate.edu">junsange@iastate.edu</a>)</p>
            <p><span className='fw-bold'>Member #2:</span> Antonio Perez (<a href="mailto:avperez@iastate.edu">avperez@iastate.edu</a>)</p>
            <p><span className='fw-bold'>Course:</span> SE/ComS 319</p>
            <p><span className='fw-bold'>Instructor:</span> Dr. Jannesari </p>
            <p><span className='fw-bold'>Date:</span> April 27th, 2024 </p>
          </div>
        </div>}
      </div>
    </div>
  );
} // App end
export default App
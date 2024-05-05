import './App.css';
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [water, setWater] = useState([]);
  const [beer, setBeer] = useState([]);
  const [soda, setSoda] = useState([]);
  const [juice, setJuice] = useState([]);
  const [viewer1, setViewer1] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [menu, setMenu] = useState(2);
  const [filter, setFilter] = useState('');
  const [filteredBeer, setFilteredBeer] = useState([]);
  const [filteredWater, setFilteredWater] = useState([]);
  const [filteredSoda, setFilteredSoda] = useState([]);
  const [filteredJuice, setFilteredJuice] = useState([]);
  const [beerReview, setBeerReview] = useState([]);
  const [waterReview, setWaterReview] = useState([]);
  const [sodaReview, setSodaReview] = useState([]);
  const [juiceReview, setJuiceReview] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isItemSelected, setIsItemSelected] = useState(false);
  const [isSearchView, setIsSearchView] = useState(false);
  const [isUpdateView, setIsUpdateView] = useState(false);
  const [isAddReviewView, setIsAddReviewView] = useState(false);
  const [reviews, setReviews] = useState([]);

  const [addNewReview, setAddNewReview] = useState({
    username: "",
    comment: "",
    rating: "",
  });

  const [addNewBeer, setAddNewBeer] = useState({
    beerID: "",
    title: "",
    url: "",
    description: "",
    Cal: "",
    Carb: "",
    Alc: "",
  });

  const [addNewWater, setAddNewWater] = useState({
    waterID: "",
    title: "",
    url: "",
    description: "",
    bottled: "",
  });

  const [addNewSoda, setAddNewSoda] = useState({
    sodaID: "",
    title: "",
    url: "",
    description: "",
    Cal: "",
    Sug: "",
    Caf: "",
  });

  const [addNewJuice, setAddNewJuice] = useState({
    juiceID: "",
    title: "",
    url: "",
    description: "",
    Cal: "",
    Sug: "",
  });

  const [updateBeerMacro, setUpdateBeerMacro] = useState({
    Cal: "",
    Carb: "",
    Alc: "",
  })

  const [updateWaterMacro, setUpdateWaterMacro] = useState({
    bottled: "",
  })

  const [updateSodaMacro, setUpdateSodaMacro] = useState({
    Cal: "",
    Sug: "",
    Caf: "",
  })

  const [updateJuiceMacro, setUpdateJuiceMacro] = useState({
    Cal: "",
    Sug: "",
  })

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
  }, [filter, checked4]);

  useEffect(() => {
    getAllWaterProducts();
  }, []);

  useEffect(() => {
    getAllSodaProducts();
  }, []);

  useEffect(() => {
    getAllJuiceProducts();
  }, []);

  useEffect(() => {
    if (selectedProduct !== null) {
      getAllBeerReviews(selectedProduct.beerID);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (selectedProduct !== null) {
      getAllWaterReviews(selectedProduct.waterID);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (selectedProduct !== null) {
      getAllSodaReviews(selectedProduct.sodaID);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (selectedProduct !== null) {
      getAllJuiceReviews(selectedProduct.juiceID);
    }
  }, [selectedProduct]);

  const handleButtonClick = () => {
    setIsSearchView(false);
  };

  const handleGoBack = () => {
    setSelectedProduct(null);
    setIsItemSelected(false);
    setIsSearchView(false);
    setIsUpdateView(false);
    setIsAddReviewView(false);
  };

  //------------------------------------------------

  function getAllBeerProducts() {
    fetch("http://localhost:4000/beer")
    .then((response) => response.json())
    .then((data) => {
      console.log("Show Catalog of Products :");
      console.log(data);
      setBeer(data);
    });
    setViewer1(!viewer1);
  }

  function handleBeerChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "beerID") {
      setAddNewBeer({ ...addNewBeer, beerID: value });
    } else if (evt.target.name === "title") {
      setAddNewBeer({ ...addNewBeer, title: value });
    } else if (evt.target.name === "url") {
      setAddNewBeer({ ...addNewBeer, url: value });
    } else if (evt.target.name === "description") {
      setAddNewBeer({ ...addNewBeer, description: value });
    } else if (evt.target.name === "Cal") {
      setAddNewBeer({ ...addNewBeer, Cal: value });
    } else if (evt.target.name === "Carb") {
      setAddNewBeer({ ...addNewBeer, Carb: value });
    } else if (evt.target.name === "Alc") {
      setAddNewBeer({ ...addNewBeer, Alc: value });
    }
  }

  function handleOnSubmitBeer(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://localhost:4000/beer/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewBeer),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new beer completed");
        console.log(data);
        if (data) {
          const value = Object.values(data);
          alert(value);
          window.location.reload();
        }
      });
  }

  function deleteOneBeer(deleteid) {
    console.log("Product to delete :", deleteid);
    fetch("http://localhost:4000/beer/delete/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ beerID: deleteid }),
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

  function handleUpdateBeerChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "updated_Cal") {
      setUpdateBeerMacro({ ...updateBeerMacro, Cal: value });
    } else if (evt.target.name === "updated_Carb") {
      setUpdateBeerMacro({ ...updateBeerMacro, Carb: value });
    } else if (evt.target.name === "updated_Alc") {
      setUpdateBeerMacro({ ...updateBeerMacro, Alc: value });
    }
  }

  function updateOneBeer(updateid, new_Cal, new_Carb, new_Alc ) {
    fetch("http://localhost:4000/beer/update/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ beerID: updateid, Cal: new_Cal, Carb: new_Carb, Alc: new_Alc }),
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

  function getAllBeerReviews(id) {
    console.log(id);
    if (id >= 1) {
      fetch("http://localhost:4000/beer/review/" + id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show one product :", id);
          console.log(data);
          setBeerReview(data);
        })
        .catch((err) => {
          console.log("Wrong number of Product id.");
        })
    } else {
      console.log("Wrong number of Product id.");
    }
  }

  function handleBeerReviewChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "username") {
      setAddNewReview({ ...addNewReview, username: value });
    } else if (evt.target.name === "comment") {
      setAddNewReview({ ...addNewReview, comment: value });
    } else if (evt.target.name === "rating") {
      setAddNewReview({ ...addNewReview, rating: value });
    }
  }

  function handleOnSubmitBeerReview(id) {
    fetch("http://localhost:4000/beer/review/" + id, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewReview),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new beer completed");
        console.log(data);
        if (data) {
          const value = Object.values(data);
          alert(value);
          window.location.reload();
        }
      });
  }

  //------------------------------------------------

  function getAllWaterProducts() {
    fetch("http://localhost:4000/water")
    .then((response) => response.json())
    .then((data) => {
      console.log("Show Catalog of Products :");
      console.log(data);
      setWater(data);
    });
    setViewer1(!viewer1);
  }

  function handleWaterChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "waterID") {
      setAddNewWater({ ...addNewWater, waterID: value });
    } else if (evt.target.name === "title") {
      setAddNewWater({ ...addNewWater, title: value });
    } else if (evt.target.name === "url") {
      setAddNewWater({ ...addNewWater, url: value });
    } else if (evt.target.name === "description") {
      setAddNewWater({ ...addNewWater, description: value });
    } else if (evt.target.name === "bottled") {
      setAddNewWater({ ...addNewWater, bottled: value });
    }
  }

  function handleOnSubmitWater(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://localhost:4000/water/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewWater),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new water completed");
        console.log(data);
        if (data) {
          const value = Object.values(data);
          alert(value);
          window.location.reload();
        }
      });
  }

  function deleteOneWater(deleteid) {
    console.log("Product to delete :", deleteid);
    fetch("http://localhost:4000/water/delete/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ waterID: deleteid }),
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

  function handleUpdateWaterChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "updated_bottled") {
      setUpdateWaterMacro({ ...updateWaterMacro, bottled: value });
    }
  }

  function updateOneWater(updateid, new_bottled) {
    fetch("http://localhost:4000/water/update/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ waterID: updateid, bottled: new_bottled}),
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

  function getAllWaterReviews(id) {
    console.log(id);
    if (id >= 1) {
      fetch("http://localhost:4000/water/review/" + id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show one product :", id);
          console.log(data);
          setWaterReview(data);
        })
        .catch((err) => {
          console.log("Wrong number of Product id.");
        })
    } else {
      console.log("Wrong number of Product id.");
    }
  }

  function handleWaterReviewChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "username") {
      setAddNewReview({ ...addNewReview, username: value });
    } else if (evt.target.name === "comment") {
      setAddNewReview({ ...addNewReview, comment: value });
    } else if (evt.target.name === "rating") {
      setAddNewReview({ ...addNewReview, rating: value });
    }
  }

  function handleOnSubmitWaterReview(id) {
    fetch("http://localhost:4000/water/review/" + id, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewReview),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new water completed");
        console.log(data);
        if (data) {
          const value = Object.values(data);
          alert(value);
          window.location.reload();
        }
      });
  }

  //------------------------------------------------

  function getAllSodaProducts() {
    fetch("http://localhost:4000/soda")
    .then((response) => response.json())
    .then((data) => {
      console.log("Show Catalog of Products :");
      console.log(data);
      setSoda(data);
    });
    setViewer1(!viewer1);
  }

  function handleSodaChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "soadID") {
      setAddNewSoda({ ...addNewSoda, sodaID: value });
    } else if (evt.target.name === "title") {
      setAddNewSoda({ ...addNewSoda, title: value });
    } else if (evt.target.name === "url") {
      setAddNewSoda({ ...addNewSoda, url: value });
    } else if (evt.target.name === "description") {
      setAddNewSoda({ ...addNewSoda, description: value });
    } else if (evt.target.name === "Cal") {
      setAddNewSoda({ ...addNewSoda, Cal: value });
    } else if (evt.target.name === "Sug") {
      setAddNewSoda({ ...addNewSoda, Sug: value });
    } else if (evt.target.name === "Caf") {
      setAddNewSoda({ ...addNewSoda, Caf: value });
    }
  }

  function handleOnSubmitSoda(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://localhost:4000/soda/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewSoda),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new soda completed");
        console.log(data);
        if (data) {
          const value = Object.values(data);
          alert(value);
          window.location.reload();
        }
      });
  }

  function deleteOneSoda(deleteid) {
    console.log("Product to delete :", deleteid);
    fetch("http://localhost:4000/soda/delete/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sodaID: deleteid }),
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

  function handleUpdateSodaChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "updated_Cal") {
      setUpdateSodaMacro({ ...updateSodaMacro, Cal: value });
    } else if (evt.target.name === "updated_Sug") {
      setUpdateSodaMacro({ ...updateSodaMacro, Sug: value });
    } else if (evt.target.name === "updated_Caf") {
      setUpdateSodaMacro({ ...updateSodaMacro, Caf: value });
    }
  }

  function updateOneSoda(updateid, new_Cal, new_Sug, new_Caf ) {
    fetch("http://localhost:4000/soda/update/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sodaID: updateid, Cal: new_Cal, Sug: new_Sug, Caf: new_Caf }),
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

  function getAllSodaReviews(id) {
    console.log(id);
    if (id >= 1) {
      fetch("http://localhost:4000/soda/review/" + id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show one product :", id);
          console.log(data);
          setSodaReview(data);
        })
        .catch((err) => {
          console.log("Wrong number of Product id.");
        })
    } else {
      console.log("Wrong number of Product id.");
    }
  }

  function handleSodaReviewChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "username") {
      setAddNewReview({ ...addNewReview, username: value });
    } else if (evt.target.name === "comment") {
      setAddNewReview({ ...addNewReview, comment: value });
    } else if (evt.target.name === "rating") {
      setAddNewReview({ ...addNewReview, rating: value });
    }
  }

  function handleOnSubmitSodaReview(id) {
    fetch("http://localhost:4000/soda/review/" + id, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewReview),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new soda completed");
        console.log(data);
        if (data) {
          const value = Object.values(data);
          alert(value);
          window.location.reload();
        }
      });
  }

  //------------------------------------------------

  function getAllJuiceProducts() {
    fetch("http://localhost:4000/juice")
    .then((response) => response.json())
    .then((data) => {
      console.log("Show Catalog of Products :");
      console.log(data);
      setJuice(data);
    });
    setViewer1(!viewer1);
  }

  function handleJuiceChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "soadID") {
      setAddNewJuice({ ...addNewJuice, juiceID: value });
    } else if (evt.target.name === "title") {
      setAddNewJuice({ ...addNewJuice, title: value });
    } else if (evt.target.name === "url") {
      setAddNewJuice({ ...addNewJuice, url: value });
    } else if (evt.target.name === "description") {
      setAddNewJuice({ ...addNewJuice, description: value });
    } else if (evt.target.name === "Cal") {
      setAddNewJuice({ ...addNewJuice, Cal: value });
    } else if (evt.target.name === "Sug") {
      setAddNewJuice({ ...addNewJuice, Sug: value });
    }
  }

  function handleOnSubmitJuice(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://localhost:4000/juice/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewJuice),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new juice completed");
        console.log(data);
        if (data) {
          const value = Object.values(data);
          alert(value);
          window.location.reload();
        }
      });
  }

  function deleteOneJuice(deleteid) {
    console.log("Product to delete :", deleteid);
    fetch("http://localhost:4000/juice/delete/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ juiceID: deleteid }),
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

  function handleUpdateJuiceChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "updated_Cal") {
      setUpdateJuiceMacro({ ...updateJuiceMacro, Cal: value });
    } else if (evt.target.name === "updated_Sug") {
      setUpdateJuiceMacro({ ...updateJuiceMacro, Sug: value });
    }
  }

  function updateOneJuice(updateid, new_Cal, new_Sug) {
    fetch("http://localhost:4000/juice/update/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ juiceID: updateid, Cal: new_Cal, Sug: new_Sug}),
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

  function getAllJuiceReviews(id) {
    console.log(id);
    if (id >= 1) {
      fetch("http://localhost:4000/juice/review/" + id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show one product :", id);
          console.log(data);
          setJuiceReview(data);
        })
        .catch((err) => {
          console.log("Wrong number of Product id.");
        })
    } else {
      console.log("Wrong number of Product id.");
    }
  }

  function handleJuiceReviewChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "username") {
      setAddNewReview({ ...addNewReview, username: value });
    } else if (evt.target.name === "comment") {
      setAddNewReview({ ...addNewReview, comment: value });
    } else if (evt.target.name === "rating") {
      setAddNewReview({ ...addNewReview, rating: value });
    }
  }

  function handleOnSubmitJuiceReview(id) {
    fetch("http://localhost:4000/juice/review/" + id, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewReview),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new juice completed");
        console.log(data);
        if (data) {
          const value = Object.values(data);
          alert(value);
          window.location.reload();
        }
      });
  }

  //------------------------------------------------

  return (
    <div style={{ minHeight: `100vh` }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Best Beverages</h1>
        <nav className="navbar navbar-expand-lg bg-body-tertiary border border-dark" style={{background: '#010203'}} >
          <div className="container-fluid">
            <div className="collapse navbar-collapse justify-content-center">
              <div className="btn-group-lg" role="group">
                <button className="btn btn-danger" aria-current="page" style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => { setMenu(1); handleGoBack(); }}>Main</button>
                <button className="btn btn-danger" style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => {setMenu(2); handleGoBack(); }}>Beer</button>
                <button className="btn btn-danger" style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => {setMenu(3); handleGoBack(); }}>Water</button>
                <button className="btn btn-danger" style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => {setMenu(4); handleGoBack(); }}>Soda</button>
                <button className="btn btn-danger" style={{ marginLeft: `15px`, marginRight: `15px` }} onClick={() => {setMenu(5); handleGoBack(); }}>Juice</button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className='m-4'>
      {menu === 1 && (
          <div className="container" style={{
            backgroundImage: `url('https://i.pinimg.com/736x/3b/17/dd/3b17dd9d44b7c2b6c8d4ec9a22bcd00a.jpg')`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            backgroundBlendMode: 'overlay'
          }}>
            <div className="row mt-5">
              <div className="col-md-6">
                <h2>Top 3 Soda Brands:</h2>
                <p>A refreshing companion for any occasion, adding sparkle to gatherings and moments of relaxation. Enjoy the effervescent delight of soda, a timeless beverage loved by all ages.</p>
              </div>
              <div className="col-md-6">
                <img src="https://vinut.com.vn/wp-content/uploads/2023/12/website-65.png" className="img-fluid" alt="Coca-Cola" />
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-6">
                <img src="https://m.media-amazon.com/images/I/613-zxyw0cL._AC_UF1000,1000_QL80_DpWeblab_.jpg" className="img-fluid" alt="Guinness" />
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
                <img src="https://i0.wp.com/sporked.com/wp-content/uploads/2023/03/BEST_BOTTLED_WATER_HEADER.jpg?fit=1920%2C1080&ssl=1" className="img-fluid" alt="Evian" />
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-6">
                <img src="https://imgix.ranker.com/list_img_v2/5523/2565523/original/2565523-u3?fit=crop&fm=pjpg&q=80&dpr=2&w=1200&h=720" className="img-fluid" alt="Tropicana" />
              </div>
              <div className="col-md-6">
                <h2>Top 3 Juice Brands:</h2>
                <p>A nourishing choice packed with vitamins and antioxidants, perfect for a healthy lifestyle. Indulge in the invigorating freshness of juice, a delicious and revitalizing way to hydrate your body.</p>
              </div>
            </div>
            <hr></hr>
            <div className="row mt-6">
              <div className="col-md-4">
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
                <h2 className="fw-normal">Antonio Perez</h2>
                <p id="email">avperez@iastate.edu</p>
                <p>My name is Antonio Perez; I am a senior here at Iowa State University majoring in Aerospace Engineering and minoring in Computer Science. While my background is mainly in engineering and design, I have experience with VS code, Git, and various coding languages. This is my first course where I have been introduced to HTML, CSS and Javascript. However, my skillset has aligned me for quick learning and ample problem-solving skills. These will prove essential for the midterm and the work that will come beyond this project's scope.</p>
              </div>
            </div>
          </div>
        )}
        
      {menu === 2 && 
        <div style={{
          backgroundImage: `url('data:image/jpeg;base64,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')`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          backgroundBlendMode: 'overlay'
        }}>
          {!isItemSelected && !isSearchView && !isUpdateView && !isAddReviewView && <h1 className='text-center text-danger'>Beer</h1>}
          {!isItemSelected && !isSearchView && !isUpdateView && !isAddReviewView && (
          <div>
            <div className="search-container text-center d-flex justify-content-center align-items-center">
              <form action="/action_page.php">
                <input
                  type="text"
                  placeholder="Search.."
                  name="search"
                  onChange={(e) => setFilter(e.target.value)}
                />
              </form>
              <button onClick={() => {handleButtonClick(); setIsSearchView(true)}} className="btn btn-danger ml-2" style={{ borderRadius: '0.5rem', marginLeft: '4rem' }}>Add a New Beer</button>
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}
          {isSearchView && (
            <div>
              <h1 className='text-center fs-1 fw-bold text-danger fw-underline'>Add a New Beer</h1>
              <form style={{ maxWidth: `50vw`, marginLeft: `25vw` }}>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Beer ID</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control form-control-lg" name="beerID" value={addNewBeer.beerID} onChange={handleBeerChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Name</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control form-control-lg" name="title" value={addNewBeer.title} onChange={handleBeerChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Image URL</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control form-control-lg" name="url" value={addNewBeer.url} onChange={handleBeerChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Description</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control form-control-lg" name="description" value={addNewBeer.description} onChange={handleBeerChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Calories (cal)</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control form-control-lg" name="Cal" value={addNewBeer.Cal} onChange={handleBeerChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Carbohydrates (g)</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control form-control-lg" name="Carb" value={addNewBeer.Carb} onChange={handleBeerChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Alcohol (%)</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control form-control-lg" name="Alc" value={addNewBeer.Alc} onChange={handleBeerChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <button type="submit" onClick={handleOnSubmitBeer} className="btn btn-danger col-auto">Submit</button>
                </div>
              </form>
              <button onClick={() => handleGoBack()} className="btn btn-danger col-auto" style={{ borderRadius: '0.5rem', display:'block', margin:'auto' }}>Go Back</button>
            </div>
          )}
          {isUpdateView && ( 
          <div>
            <h1 className='text-center fs-1 fw-bold text-danger fw-underline'>Update Beer Macro Information</h1>
            <form style={{ maxWidth: `50vw`, marginLeft: `25vw` }}>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label col-form-label-lg">New Calory (cal)</label>
                <div className="col-sm-10">
                  <input type="number" className="form-control form-control-lg" name="updated_Cal" value={updateBeerMacro.Cal} onChange={handleUpdateBeerChange} />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label col-form-label-lg">New Carbohydrates (g)</label>
                <div className="col-sm-10">
                  <input type="number" className="form-control form-control-lg" name="updated_Carb" value={updateBeerMacro.Carb} onChange={handleUpdateBeerChange} />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label col-form-label-lg">New Alcohol (%)</label>
                <div className="col-sm-10">
                  <input type="number" className="form-control form-control-lg" name="updated_Alc" value={updateBeerMacro.Alc} onChange={handleUpdateBeerChange} />
                </div>
              </div>
              <div className="row mb-3">
                <button type="submit" onClick={() => updateOneBeer(selectedProduct.beerID, updateBeerMacro.Cal, updateBeerMacro.Carb, updateBeerMacro.Alc)} className="btn btn-danger col-auto">Update</button>
              </div>
            </form>
            <button onClick={() => handleGoBack()} className="btn btn-danger col-auto" style={{ borderRadius: '0.5rem', display:'block', margin:'auto' }}>Go Back</button>
          </div>
          )}
          {isAddReviewView && (
            <div>
              <h1 className='text-center fs-1 fw-bold text-danger fw-underline'>Add a Review</h1>
              <form style={{ maxWidth: `50vw`, marginLeft: `25vw` }}>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Name (Anonymous)</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control form-control-lg" name="username" value={addNewReview.username} onChange={handleBeerReviewChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Comment</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control form-control-lg" name="comment" value={addNewReview.comment} onChange={handleBeerReviewChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Rating (max 5.0)</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control form-control-lg" name="rating" value={addNewReview.rating} onChange={handleBeerReviewChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <button type="submit" onClick={() => handleOnSubmitBeerReview(selectedProduct.beerID)} className="btn btn-danger col-auto">Finish</button>
                </div>
              </form>
              <button onClick={() => handleGoBack()} className="btn btn-danger col-auto" style={{ borderRadius: '0.5rem', display:'block', margin:'auto' }}>Go Back</button>
            </div>
          )}
          {isItemSelected && (
            <div>
              <div className='selected-product'>
                <div className='selected-product-img'>
                  <img src={selectedProduct.url} style={{ marginLeft: `50px`}} alt={selectedProduct.title} />
                </div>
                <div className='selected-product-details'>
                  <h2>{selectedProduct.title}</h2>
                  <p>{selectedProduct.description}</p>
                  <p>Calories: {selectedProduct.Cal}</p>
                  <p>Carbs: {selectedProduct.Carb} g</p>
                  <p>Alcohol %: {selectedProduct.Alc} %</p>
                  <button className="btn btn-danger" style={{ marginLeft: `5px`, marginRight: `15px` }} onClick={() => handleGoBack()}>Go Back</button>
                  <button className="btn btn-danger" style={{ marginLeft: `5px`, marginRight: `15px` }} onClick={() => deleteOneBeer(selectedProduct.beerID)}>Delete</button>
                  <button className="btn btn-danger" style={{ marginLeft: `5px`, marginRight: `15px` }} onClick={() => {setIsUpdateView(true); setIsItemSelected(false);}}>Update Macro Information</button>
                </div>
              </div>
              <hr></hr>
              <div className="reviews">
                <h3>Review</h3>
                <button className="btn btn-danger" onClick={() => {setIsAddReviewView(true); setIsItemSelected(false);}}>Write a Review</button>
                <div className='row row-cols-auto'>
                  {beerReview.map((el) => (
                    <div key={el.beerID} className='col-3 px-2'>
                      <div className='card border border-dark' style={{ width: `25rem` }}>
                        <div className='card-body border border-dark' style={{ background: `lightgray` }}>
                          <p className='card-text'><span className='fw-bold'>Name:</span> {el.username}</p>
                          <p className='card-text'><span className='fw-bold'>Comment:</span> {el.comment}</p>
                          <p className='card-text'><span className='fw-bold'>Rating:</span> {el.rating}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
      </div>}


      {menu === 3 && 
        <div style={{
          backgroundImage: `url('data:image/jpeg;base64,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')`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          backgroundBlendMode: 'overlay'
        }}>
          {!isItemSelected && !isSearchView && !isUpdateView && !isAddReviewView && <h1 className='text-center text-danger'>Water</h1>}
          {!isItemSelected && !isSearchView && !isUpdateView && !isAddReviewView && (
          <div>
            <div className="search-container text-center d-flex justify-content-center align-items-center">
              <form action="/action_page.php">
                <input
                  type="text"
                  placeholder="Search.."
                  name="search"
                  onChange={(e) => setFilter(e.target.value)}
                />
              </form>
              <button onClick={() => {handleButtonClick(); setIsSearchView(true)}} className="btn btn-danger ml-2" style={{ borderRadius: '0.5rem', marginLeft: '4rem' }}>Add a New Water</button>
            </div>
            <hr />
            <div className='row row-cols-auto'>
              {filteredWater.map((el) => (
                <div key={el.waterID} className='col-3 px-2'>
                  <div className='card border border-dark' style={{ width: `25rem`, cursor: 'pointer' }}
                  onClick={() => {
                    setSelectedProduct(el);
                    setIsItemSelected(true);
                  }}>
                    <img src={el.url} width={20} alt={el.title} className='card-img-top' />
                    <div className='card-body border border-dark' style={{ background: `lightgray` }}>
                      <p className='card-text'><span className='fw-bold'>Title:</span> {el.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}
          {isSearchView && (
            <div>
              <h1 className='text-center fs-1 fw-bold text-danger fw-underline'>Add a New Water</h1>
              <form style={{ maxWidth: `50vw`, marginLeft: `25vw` }}>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Water ID</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control form-control-lg" name="waterID" value={addNewWater.waterID} onChange={handleWaterChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Name</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control form-control-lg" name="title" value={addNewWater.title} onChange={handleWaterChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Image URL</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control form-control-lg" name="url" value={addNewWater.url} onChange={handleWaterChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Description</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control form-control-lg" name="description" value={addNewWater.description} onChange={handleWaterChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Water Source(s)</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control form-control-lg" name="bottled" value={addNewWater.bottled} onChange={handleWaterChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <button type="submit" onClick={handleOnSubmitWater} className="btn btn-danger col-auto">Submit</button>
                </div>
              </form>
              <button onClick={() => handleGoBack()} className="btn btn-danger col-auto" style={{ borderRadius: '0.5rem', display:'block', margin:'auto' }}>Go Back</button>
            </div>
          )}
          {isUpdateView && ( 
          <div>
            <h1 className='text-center fs-1 fw-bold text-danger fw-underline'>Update Water Source Information</h1>
            <form style={{ maxWidth: `50vw`, marginLeft: `25vw` }}>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label col-form-label-lg">New Water Source</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control form-control-lg" name="updated_bottled" value={updateWaterMacro.bottled} onChange={handleUpdateWaterChange} />
                </div>
              </div>
              <div className="row mb-3">
                <button type="submit" onClick={() => updateOneWater(selectedProduct.waterID, updateWaterMacro.bottled)} className="btn btn-danger col-auto">Update</button>
              </div>
            </form>
            <button onClick={() => handleGoBack()} className="btn btn-danger col-auto" style={{ borderRadius: '0.5rem', display:'block', margin:'auto' }}>Go Back</button>
          </div>
          )}
          {isAddReviewView && (
            <div>
              <h1 className='text-center fs-1 fw-bold text-danger fw-underline'>Add a Review</h1>
              <form style={{ maxWidth: `50vw`, marginLeft: `25vw` }}>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Name (Anonymous)</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control form-control-lg" name="username" value={addNewReview.username} onChange={handleWaterReviewChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Comment</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control form-control-lg" name="comment" value={addNewReview.comment} onChange={handleWaterReviewChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Rating (max 5.0)</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control form-control-lg" name="rating" value={addNewReview.rating} onChange={handleWaterReviewChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <button type="submit" onClick={() => handleOnSubmitWaterReview(selectedProduct.waterID)} className="btn btn-danger col-auto">Finish</button>
                </div>
              </form>
              <button onClick={() => handleGoBack()} className="btn btn-danger col-auto" style={{ borderRadius: '0.5rem', display:'block', margin:'auto' }}>Go Back</button>
            </div>
          )}
          {isItemSelected && (
            <div>
              <div className='selected-product'>
                <div className='selected-product-img'>
                  <img src={selectedProduct.url} alt={selectedProduct.title} />
                </div>
                <div className='selected-product-details'>
                  <h2>{selectedProduct.title}</h2>
                  <p>{selectedProduct.description}</p>
                  <p>Sources: {selectedProduct.bottled}</p>
                  <button className="btn btn-danger" style={{ marginLeft: `5px`, marginRight: `15px` }} onClick={() => handleGoBack()}>Go Back</button>
                  <button className="btn btn-danger" style={{ marginLeft: `5px`, marginRight: `15px` }} onClick={() => deleteOneWater(selectedProduct.waterID)}>Delete</button>
                  <button className="btn btn-danger" style={{ marginLeft: `5px`, marginRight: `15px` }} onClick={() => {setIsUpdateView(true); setIsItemSelected(false);}}>Update Water Source</button>
                </div>
              </div>
              <hr></hr>
              <div className="reviews">
                <h3>Review</h3>
                <button className="btn btn-danger" onClick={() => {setIsAddReviewView(true); setIsItemSelected(false);}}>Write a Review</button>
                <div className='row row-cols-auto'>
                  {waterReview.map((el) => (
                    <div key={el.waterID} className='col-3 px-2'>
                      <div className='card border border-dark' style={{ width: `25rem` }}>
                        <div className='card-body border border-dark' style={{ background: `lightgray` }}>
                          <p className='card-text'><span className='fw-bold'>Name:</span> {el.username}</p>
                          <p className='card-text'><span className='fw-bold'>Comment:</span> {el.comment}</p>
                          <p className='card-text'><span className='fw-bold'>Rating:</span> {el.rating}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
      </div>}

      {menu === 4 && 
        <div style={{
          backgroundImage: `url('data:image/jpeg;base64,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')`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          backgroundBlendMode: 'overlay'
        }}>
          {!isItemSelected && !isSearchView && !isUpdateView && !isAddReviewView && <h1 className='text-center text-danger'>Soda</h1>}
          {!isItemSelected && !isSearchView && !isUpdateView && !isAddReviewView && (
          <div>
            <div className="search-container text-center d-flex justify-content-center align-items-center">
              <form action="/action_page.php">
                <input
                  type="text"
                  placeholder="Search.."
                  name="search"
                  onChange={(e) => setFilter(e.target.value)}
                />
              </form>
              <button onClick={() => {handleButtonClick(); setIsSearchView(true)}} className="btn btn-danger ml-2" style={{ borderRadius: '0.5rem', marginLeft: '4rem' }}>Add a New Soda</button>
            </div>
            <hr />
            <div className='row row-cols-auto'>
              {filteredSoda.map((el) => (
                <div key={el.sodaID} className='col-3 px-2'>
                  <div className='card border border-dark' style={{ width: `25rem`, cursor: 'pointer' }}
                  onClick={() => {
                    setSelectedProduct(el);
                    setIsItemSelected(true);
                  }}>
                    <img src={el.url} width={20} alt={el.title} className='card-img-top' />
                    <div className='card-body border border-dark' style={{ background: `lightgray` }}>
                      <p className='card-text'><span className='fw-bold'>Title:</span> {el.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}
          {isSearchView && (
            <div>
              <h1 className='text-center fs-1 fw-bold text-danger fw-underline'>Add a New Soda</h1>
              <form style={{ maxWidth: `50vw`, marginLeft: `25vw` }}>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Soda ID</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control form-control-lg" name="sodaID" value={addNewSoda.sodaID} onChange={handleSodaChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Name</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control form-control-lg" name="title" value={addNewSoda.title} onChange={handleSodaChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Image URL</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control form-control-lg" name="url" value={addNewSoda.url} onChange={handleSodaChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Description</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control form-control-lg" name="description" value={addNewSoda.description} onChange={handleSodaChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Calories (cal)</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control form-control-lg" name="Cal" value={addNewSoda.Cal} onChange={handleSodaChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Sugar (g)</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control form-control-lg" name="Sug" value={addNewSoda.Sug} onChange={handleSodaChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Caffine (mg)</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control form-control-lg" name="Caf" value={addNewSoda.Caf} onChange={handleSodaChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <button type="submit" onClick={handleOnSubmitSoda} className="btn btn-danger col-auto">Submit</button>
                </div>
              </form>
              <button onClick={() => handleGoBack()} className="btn btn-danger col-auto" style={{ borderRadius: '0.5rem', display:'block', margin:'auto' }}>Go Back</button>
            </div>
          )}
          {isUpdateView && ( 
          <div>
            <h1 className='text-center fs-1 fw-bold text-danger fw-underline'>Update Soda Macro Information</h1>
            <form style={{ maxWidth: `50vw`, marginLeft: `25vw` }}>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label col-form-label-lg">New Calory (cal)</label>
                <div className="col-sm-10">
                  <input type="number" className="form-control form-control-lg" name="updated_Cal" value={updateSodaMacro.Cal} onChange={handleUpdateSodaChange} />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label col-form-label-lg">New Sugar (g)</label>
                <div className="col-sm-10">
                  <input type="number" className="form-control form-control-lg" name="updated_Sug" value={updateSodaMacro.Sug} onChange={handleUpdateSodaChange} />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label col-form-label-lg">New Caffine (mg)</label>
                <div className="col-sm-10">
                  <input type="number" className="form-control form-control-lg" name="updated_Caf" value={updateSodaMacro.Caf} onChange={handleUpdateSodaChange} />
                </div>
              </div>
              <div className="row mb-3">
                <button type="submit" onClick={() => updateOneSoda(selectedProduct.sodaID, updateSodaMacro.Cal, updateSodaMacro.Sug, updateSodaMacro.Caf)} className="btn btn-danger col-auto">Update</button>
              </div>
            </form>
            <button onClick={() => handleGoBack()} className="btn btn-danger col-auto" style={{ borderRadius: '0.5rem', display:'block', margin:'auto' }}>Go Back</button>
          </div>
          )}
          {isAddReviewView && (
            <div>
              <h1 className='text-center fs-1 fw-bold text-danger fw-underline'>Add a Review</h1>
              <form style={{ maxWidth: `50vw`, marginLeft: `25vw` }}>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Name (Anonymous)</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control form-control-lg" name="username" value={addNewReview.username} onChange={handleSodaReviewChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Comment</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control form-control-lg" name="comment" value={addNewReview.comment} onChange={handleSodaReviewChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Rating (max 5.0)</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control form-control-lg" name="rating" value={addNewReview.rating} onChange={handleSodaReviewChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <button type="submit" onClick={() => handleOnSubmitSodaReview(selectedProduct.sodaID)} className="btn btn-danger col-auto">Finish</button>
                </div>
              </form>
              <button onClick={() => handleGoBack()} className="btn btn-danger col-auto" style={{ borderRadius: '0.5rem', display:'block', margin:'auto' }}>Go Back</button>
            </div>
          )}
          {isItemSelected && (
            <div>
              <div className='selected-product'>
                <div className='selected-product-img'>
                  <img src={selectedProduct.url} alt={selectedProduct.title} />
                </div>
                <div className='selected-product-details'>
                  <h2>{selectedProduct.title}</h2>
                  <p>{selectedProduct.description}</p>
                  <p>Calories: {selectedProduct.Cal}</p>
                  <p>Sugar: {selectedProduct.Sug} g</p>
                  <p>Caffine: {selectedProduct.Caf} mg</p>
                  <button className="btn btn-danger" style={{ marginLeft: `5px`, marginRight: `15px` }} onClick={() => handleGoBack()}>Go Back</button>
                  <button className="btn btn-danger" style={{ marginLeft: `5px`, marginRight: `15px` }} onClick={() => deleteOneSoda(selectedProduct.sodaID)}>Delete</button>
                  <button className="btn btn-danger" style={{ marginLeft: `5px`, marginRight: `15px` }} onClick={() => {setIsUpdateView(true); setIsItemSelected(false);}}>Update Macro Information</button>
                </div>
              </div>
              <hr></hr>
              <div className="reviews">
                <h3>Review</h3>
                <button className="btn btn-danger" onClick={() => {setIsAddReviewView(true); setIsItemSelected(false);}}>Write a Review</button>
                <div className='row row-cols-auto'>
                  {sodaReview.map((el) => (
                    <div key={el.sodaID} className='col-3 px-2'>
                      <div className='card border border-dark' style={{ width: `25rem` }}>
                        <div className='card-body border border-dark' style={{ background: `lightgray` }}>
                          <p className='card-text'><span className='fw-bold'>Name:</span> {el.username}</p>
                          <p className='card-text'><span className='fw-bold'>Comment:</span> {el.comment}</p>
                          <p className='card-text'><span className='fw-bold'>Rating:</span> {el.rating}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
      </div>}


        {menu === 5 && 
          <div style={{
            backgroundImage: `url('data:image/jpeg;base64,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')`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            backgroundBlendMode: 'overlay'
          }}>
            {!isItemSelected && !isSearchView && !isUpdateView && !isAddReviewView && <h1 className='text-center text-danger'>Juice</h1>}
          {!isItemSelected && !isSearchView && !isUpdateView && !isAddReviewView && (
          <div>
            <div className="search-container text-center d-flex justify-content-center align-items-center">
              <form action="/action_page.php">
                <input
                  type="text"
                  placeholder="Search.."
                  name="search"
                  onChange={(e) => setFilter(e.target.value)}
                />
              </form>
              <button onClick={() => {handleButtonClick(); setIsSearchView(true)}} className="btn btn-danger ml-2" style={{ borderRadius: '0.5rem', marginLeft: '4rem' }}>Add a New Juice</button>
            </div>
            <hr />
            <div className='row row-cols-auto'>
              {filteredJuice.map((el) => (
                <div key={el.juiceID} className='col-3 px-2'>
                  <div className='card border border-dark' style={{ width: `25rem`, cursor: 'pointer' }}
                  onClick={() => {
                    setSelectedProduct(el);
                    setIsItemSelected(true);
                  }}>
                    <img src={el.url} width={20} alt={el.title} className='card-img-top' />
                    <div className='card-body border border-dark' style={{ background: `lightgray` }}>
                      <p className='card-text'><span className='fw-bold'>Title:</span> {el.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}
          {isSearchView && (
            <div>
              <h1 className='text-center fs-1 fw-bold text-danger fw-underline'>Add a New Juice</h1>
              <form style={{ maxWidth: `50vw`, marginLeft: `25vw` }}>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Juice ID</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control form-control-lg" name="juiceID" value={addNewJuice.juiceID} onChange={handleJuiceChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Name</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control form-control-lg" name="title" value={addNewJuice.title} onChange={handleJuiceChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Image URL</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control form-control-lg" name="url" value={addNewJuice.url} onChange={handleJuiceChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Description</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control form-control-lg" name="description" value={addNewJuice.description} onChange={handleJuiceChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Calories (cal)</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control form-control-lg" name="Cal" value={addNewJuice.Cal} onChange={handleJuiceChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Sugar (g)</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control form-control-lg" name="Sug" value={addNewJuice.Sug} onChange={handleJuiceChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <button type="submit" onClick={handleOnSubmitJuice} className="btn btn-danger col-auto">Submit</button>
                </div>
              </form>
              <button onClick={() => handleGoBack()} className="btn btn-danger col-auto" style={{ borderRadius: '0.5rem', display:'block', margin:'auto' }}>Go Back</button>
            </div>
          )}
          {isUpdateView && ( 
          <div>
            <h1 className='text-center fs-1 fw-bold text-danger fw-underline'>Update Juice Macro Information</h1>
            <form style={{ maxWidth: `50vw`, marginLeft: `25vw` }}>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label col-form-label-lg">New Calory (cal)</label>
                <div className="col-sm-10">
                  <input type="number" className="form-control form-control-lg" name="updated_Cal" value={updateJuiceMacro.Cal} onChange={handleUpdateJuiceChange} />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label col-form-label-lg">New Sugar (g)</label>
                <div className="col-sm-10">
                  <input type="number" className="form-control form-control-lg" name="updated_Sug" value={updateJuiceMacro.Sug} onChange={handleUpdateJuiceChange} />
                </div>
              </div>
              <div className="row mb-3">
                <button type="submit" onClick={() => updateOneJuice(selectedProduct.juiceID, updateJuiceMacro.Cal, updateJuiceMacro.Sug)} className="btn btn-danger col-auto">Update</button>
              </div>
            </form>
            <button onClick={() => handleGoBack()} className="btn btn-danger col-auto" style={{ borderRadius: '0.5rem', display:'block', margin:'auto' }}>Go Back</button>
          </div>
          )}
          {isAddReviewView && (
            <div>
              <h1 className='text-center fs-1 fw-bold text-danger fw-underline'>Add a Review</h1>
              <form style={{ maxWidth: `50vw`, marginLeft: `25vw` }}>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Name (Anonymous)</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control form-control-lg" name="username" value={addNewReview.username} onChange={handleJuiceReviewChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Comment</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control form-control-lg" name="comment" value={addNewReview.comment} onChange={handleJuiceReviewChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label col-form-label-lg">Rating (max 5.0)</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control form-control-lg" name="rating" value={addNewReview.rating} onChange={handleJuiceReviewChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <button type="submit" onClick={() => handleOnSubmitJuiceReview(selectedProduct.juiceID)} className="btn btn-danger col-auto">Finish</button>
                </div>
              </form>
              <button onClick={() => handleGoBack()} className="btn btn-danger col-auto" style={{ borderRadius: '0.5rem', display:'block', margin:'auto' }}>Go Back</button>
            </div>
          )}
          {isItemSelected && (
            <div>
              <div className='selected-product'>
                <div className='selected-product-img'>
                  <img src={selectedProduct.url} alt={selectedProduct.title} />
                </div>
                <div className='selected-product-details'>
                  <h2>{selectedProduct.title}</h2>
                  <p>{selectedProduct.description}</p>
                  <p>Calories: {selectedProduct.Cal}</p>
                  <p>Sugar: {selectedProduct.Sug} g</p>
                  <button className="btn btn-danger" style={{ marginLeft: `5px`, marginRight: `15px` }} onClick={() => handleGoBack()}>Go Back</button>
                  <button className="btn btn-danger" style={{ marginLeft: `5px`, marginRight: `15px` }} onClick={() => deleteOneJuice(selectedProduct.juiceID)}>Delete</button>
                  <button className="btn btn-danger" style={{ marginLeft: `5px`, marginRight: `15px` }} onClick={() => {setIsUpdateView(true); setIsItemSelected(false);}}>Update Macro Information</button>
                </div>
              </div>
              <hr></hr>
              <div className="reviews">
                <h3>Review</h3>
                <button className="btn btn-danger" onClick={() => {setIsAddReviewView(true); setIsItemSelected(false);}}>Write a Review</button>
                <div className='row row-cols-auto'>
                  {juiceReview.map((el) => (
                    <div key={el.juiceID} className='col-3 px-2'>
                      <div className='card border border-dark' style={{ width: `25rem` }}>
                        <div className='card-body border border-dark' style={{ background: `lightgray` }}>
                          <p className='card-text'><span className='fw-bold'>Name:</span> {el.username}</p>
                          <p className='card-text'><span className='fw-bold'>Comment:</span> {el.comment}</p>
                          <p className='card-text'><span className='fw-bold'>Rating:</span> {el.rating}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>}
      </div>
    </div>
  );
}
// App end
export default App
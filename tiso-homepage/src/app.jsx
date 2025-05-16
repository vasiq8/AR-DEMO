import { useState, useRef, useEffect } from 'react';
import './app.css';

// Navbar images (served from public/assets)
import strikeImg from './assets/strike.jpeg';
import searchImg from './assets/search.jpeg';

// Products mapping for AR products
const productsByCategory = {
  PIZZA: [
    {
      name: "Garlic Bread",

      description:
        "Delicious bread with fresh garlic.",
      price: "SAR 8",
      calories: "300 kcal",
      modelUrl:
        "https://raw.githubusercontent.com/Vasiq89/tiso-homepage/cd0063c9768615d3faee3248ef5e2ce04cd40f3c/garlicbread%28f%29.glb",
    },
    {
      name: "Chicken Pizza",

      description:
        "Chicken pizza with a variety of toppings.",
      price: "SAR 12",
      calories: "300 kcal",
      modelUrl:
        "https://raw.githubusercontent.com/Vasiq89/tiso-homepage/cd0063c9768615d3faee3248ef5e2ce04cd40f3c/chickenpizza%28f%29.glb",
    },
    {
      name: "Paneer Pizza",

      description:
        "Paneer pizza with a variety of toppings.",
      price: "SAR 10",
      calories: "280 kcal",
      modelUrl:
        "https://raw.githubusercontent.com/Vasiq89/tiso-homepage/cd0063c9768615d3faee3248ef5e2ce04cd40f3c/paneerpizza%28f%29.glb",
    },
  ],
  BURGERS: [
    {
      name: "Burger Lowpoly",
      image: "/assets/burger_lowpoly.glb",
      description: "Stylized low poly burger for a modern look.",
      price: "$10",
      calories: "400 kcal",
      modelUrl:
        "https://raw.githubusercontent.com/vasiq8/tiso-homepage/b61db800da21f2e9ca6adc880cd936a75b111ade/burger_lowpoly.glb",
    },
    {
      name: "Hamburger 3D",
      image: "/assets/hamburger_3d_scan.glb",
      description: "Realistic 3D scanned hamburger experience.",
      price: "$11",
      calories: "420 kcal",
      modelUrl:
        "https://raw.githubusercontent.com/vasiq8/tiso-homepage/b61db800da21f2e9ca6adc880cd936a75b111ade/hamburger_3d_scan.glb",
    },
  ],
  SANDWICHES: [
    {
      name: "Best Spring Sandwich",
      image: "/assets/best_spring_sandwitch.glb",
      description: "Fresh, light, and flavorful spring sandwich.",
      price: "$9",
      calories: "350 kcal",
      modelUrl:
        "https://raw.githubusercontent.com/vasiq8/tiso-homepage/8c43ccb15e10e4757b61c32be10d0c0469ba56cf/best_spring_sandwitch.glb",
    },
    {
      name: "Grilled Sandwich",
      image: "/assets/grilled_sandwich.glb",
      description: "Delicious grilled sandwich with melted cheese.",
      price: "$8",
      calories: "300 kcal",
      modelUrl:
        "https://raw.githubusercontent.com/vasiq8/tiso-homepage/8c43ccb15e10e4757b61c32be10d0c0469ba56cf/grilled_sandwich%20(1).glb",
    },
  ],
  NOODLES: [
    {
      name: "Asian Take‑Out Noodles",
      image: "/assets/asian_take_out_container_w_noodles.glb",
      description: "Savory noodles in an authentic Asian take‑out container.",
      price: "$11",
      calories: "400 kcal",
      modelUrl:
        "https://raw.githubusercontent.com/vasiq8/tiso-homepage/8c43ccb15e10e4757b61c32be10d0c0469ba56cf/asian_take_out_container_w_noodles.glb",
    },
  ],
  "DONUTS": [
    {
      name: "Vanilla Donut",
    
      description: "Hearty vanilla donut with delicious taste.",
      price: "SAR 10",
      calories: "420 kcal",
      modelUrl:
        "https://raw.githubusercontent.com/Vasiq89/tiso-homepage/cd0063c9768615d3faee3248ef5e2ce04cd40f3c/vanilladonut%28f%29.glb",
    },
    {
      name: "Choco Donut",

      description: "Hearty chocolate donut with delicious taste.",
      price: "SAR 12",
      calories: "380 kcal",
      modelUrl:
        "https://raw.githubusercontent.com/Vasiq89/tiso-homepage/cd0063c9768615d3faee3248ef5e2ce04cd40f3c/chocodonut%28f%29.glb",
    },
  ],
  SALADS: [
    {
      name: "Veg Salad",

      description: "A refreshing and colorful fruit salad.",
      price: "SAR 7",
      calories: "180 kcal",
      modelUrl:
        "https://raw.githubusercontent.com/Vasiq89/tiso-homepage/cd0063c9768615d3faee3248ef5e2ce04cd40f3c/vegsalad%28f%29.glb",
    },
    {
      name: "Breakfast Food Dish",
      image: "/assets/breakfast_food_dish.glb",
      description: "Hearty and healthy breakfast salad dish.",
      price: "$9",
      calories: "220 kcal",
      modelUrl:
        "https://raw.githubusercontent.com/vasiq8/tiso-homepage/b61db800da21f2e9ca6adc880cd936a75b111ade/breakfast_food_dish.glb",
    },
  ],
  FISH: [
    {
      name: "Seafood Platter",
      image: "/assets/seafood.glb",
      description: "A delightful assortment of fresh seafood.",
      price: "$15",
      calories: "250 kcal",
      modelUrl:
        "https://raw.githubusercontent.com/vasiq8/tiso-homepage/8c43ccb15e10e4757b61c32be10d0c0469ba56cf/seafood.glb",
    },
    {
      name: "Toro Sushi",
      image: "/assets/toro_sushi.glb",
      description: "Premium toro sushi, melt‑in‑your‑mouth delight.",
      price: "$20",
      calories: "210 kcal",
      modelUrl:
        "https://raw.githubusercontent.com/vasiq8/tiso-homepage/8c43ccb15e10e4757b61c32be10d0c0469ba56cf/toro_sushi.glb",
    },
  ],
  DESSERTS: [
    {
      name: "The Cake Is A Lie",
      image: "/assets/the_cake_is_a_lie.glb",
      description: "A mysterious dessert that defies expectations.",
      price: "$8",
      calories: "250 kcal",
      modelUrl:
        "https://raw.githubusercontent.com/vasiq8/tiso-homepage/b61db800da21f2e9ca6adc880cd936a75b111ade/the_cake_is_a_lie.glb",
    },
    {
      name: "Ice Cream",
      image: "/assets/ice_cream_lp.glb",
      description: "Cool and refreshing ice cream treat.",
      price: "$5",
      calories: "200 kcal",
      modelUrl:
        "https://raw.githubusercontent.com/vasiq8/tiso-homepage/b61db800da21f2e9ca6adc880cd936a75b111ade/ice_cream_lp.glb",
    },
    {
      name: "Pancake",
    
      description: "A mysterious Pancake that defies expectations.",
      price: "SAR 13",
      calories: "350 kcal",
      modelUrl:
        "https://raw.githubusercontent.com/vasiq8/AR-DEMO/4cca700769ed3cc1a77c37375676287ef1079e32/optimized_pancake.glb",
    },
  ],
  DRINKS: [
    {
      name: "Fizzy Drink",
      image: "/assets/fizzy_drink.glb",
      description: "Refreshing fizzy drink to quench your thirst.",
      price: "$4",
      calories: "150 kcal",
      modelUrl:
        "https://raw.githubusercontent.com/Vasiq89/tiso-homepage/cd0063c9768615d3faee3248ef5e2ce04cd40f3c/ruabzatangentset-opt.glb",
    },
    {
      name: "Monster Energy Drink",
      image: "/assets/monster_energy_drink.glb",
      description: "High-energy Monster drink for a boost.",
      price: "$5",
      calories: "200 kcal",
      modelUrl:
        "https://raw.githubusercontent.com/vasiq8/tiso-homepage/8c43ccb15e10e4757b61c32be10d0c0469ba56cf/monster_energy_drink.glb",
    },
    {
      name: "Test Pizza",
      image: "/assets/tea.glb",
      description: "A soothing cup of tea to warm you up.",
      price: "$3",
      calories: "0 kcal",
      modelUrl:
        "https://raw.githubusercontent.com/vasiq8/AR-DEMO/2419089cdde8db20cf1c9489c8c7c85b74930191/optimized.glb",
    },
  ],
};

function App() {
  // Navbar + search/menu
  const [searchOpen, setSearchOpen]   = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Product‑modal state
  const [currentCategoryProducts, setCurrentCategoryProducts] = useState([]);
  const [animClass, setAnimClass]                             = useState("");

  // Refs for click‑outside & AR
  const searchRef = useRef(null);
  const arModelRef = useRef(null);

  // Flatten all products for search lookup
  const allProducts = Object.values(productsByCategory).flat();

  const foodCategories = Object.keys(productsByCategory);

  // Add new useEffect to select first category on mount
  useEffect(() => {
    const firstCategory = foodCategories[0];
    if (firstCategory) {
      setCurrentCategoryProducts(productsByCategory[firstCategory] || []);
    }
  }, []); // Empty dependency array means this runs once on mount

  // Hide dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = e => {
      if (searchRef.current && !searchRef.current.contains(e.target))
        setSearchOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle handlers
  const toggleSearch = () => {
    setSearchOpen(o => !o);
    if (!searchOpen) setTimeout(() => document.querySelector(".search-input")?.focus(), 100);
  };

  // Show details for a clicked category
  const handleCategoryClick = category => {
    const items = productsByCategory[category] || [];
    setCurrentCategoryProducts(items);
  };

  // Search submit (on Enter)
  const handleSearchSubmit = e => {
    e.preventDefault();
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;
    const found = allProducts.find(p => p.name.toLowerCase().includes(q));
    if (found) {
      setCurrentCategoryProducts([found]);
      setSearchOpen(false);
    } else {
      alert("No product found. Try another name.");
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim()) {
      const filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchResultClick = (product) => {
    setCurrentCategoryProducts([product]);
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  // Activate AR
  const viewInAR = () => {
    if (arModelRef.current?.activateAR) {
      arModelRef.current.activateAR();
    } else {
      alert("AR not supported on this device/browser.");
    }
  };

  return (
    <div className="app">
      {/* Navbar */}
      <header className={`navbar ${searchOpen ? "search-active" : ""}`}>
        <h1 className="logo">TISO MEALS</h1>
        <img
          src={searchImg}
          alt="Search"
          className="icon search-icon"
          onClick={toggleSearch}
        />
      </header>

      {/* Categories Sidebar */}
      <div className="categories-sidebar">
        {foodCategories.map((cat, i) => (
          <div
            key={i}
            className="category-box"
            onClick={() => handleCategoryClick(cat)}>
            {cat}
          </div>
        ))}
      </div>

      {/* Products Grid */}
      {currentCategoryProducts.length > 0 && (
        <div className="products-grid">
          {currentCategoryProducts.map((product, index) => (
            <div key={index} className="product-card">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
              <p>Calories: {product.calories}</p>
              <div className="ar-preview">
                <model-viewer
                  src={product.modelUrl}
                  alt={`${product.name} AR Model`}
                  camera-controls
                  auto-rotate
                  ar
                  ar-modes="scene-viewer webxr quick-look"
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0
                  }}
                />
              </div>
              <button className="ar-button" onClick={() => viewInAR()}>
                View in AR
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Blur overlay */}
      {searchOpen && (
        <div
          className="blur-overlay"
          onClick={() => {
            setSearchOpen(false);
          }}
        />
      )}

      {/* Search dropdown */}
      {searchOpen && (
        <div className="search-dropdown" ref={searchRef}>
          <div className="search-header">
            <div className="search-title">SEARCH</div>
            <button className="search-close" onClick={() => setSearchOpen(false)}>
              ×
            </button>
          </div>
          <div className="search-input-container">
            <input
              type="text"
              className="search-input"
              placeholder="Start typing to search..."
              value={searchQuery}
              onChange={handleSearch}
            />
            {searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map((product, index) => (
                  <div
                    key={index}
                    className="search-result-item"
                    onClick={() => handleSearchResultClick(product)}
                  >
                    {product.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;


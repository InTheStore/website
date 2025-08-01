import { useState, useEffect } from "react";
import api from "../api";
import NavBar from "./navbar";
import ShopGrid from "./ShopGrid";
import LoadingIndicator from "./LoadingIndicator";
import "../styles/Shops.css";
import Footer from "./Footer";

function GetShops(props) {
  const [shops, setShops] = useState(null);
  const [loading, setLoading] = useState(true);
  const city = props.city;
  const cafetype = props.cafetype;
  useEffect(() => {
    getShops();
  }, []);

  const getShops = () => {
    if (city && cafetype) {
      api
        .get("/api/drinks/?sort=name&type=" + cafetype + "&city=" + city)
        .then((res) => res.data)
        .then((data) => {
          setShops(data);
          setLoading(false);
        })
        .catch((err) => {
          alert(err);
          setLoading(false);
        });
    } else if (city) {
      api
        .get("/api/drinks/?sort=name&city=" + city)
        .then((res) => res.data)
        .then((data) => {
          setShops(data);
          setLoading(false);
        })
        .catch((err) => {
          alert(err);
          setLoading(false);
        });
    } else if (cafetype) {
      api
        .get("/api/drinks/?sort=name&type=" + cafetype)
        .then((res) => res.data)
        .then((data) => {
          setShops(data);
          setLoading(false);
        })
        .catch((err) => {
          alert(err);
          setLoading(false);
        });
    } else {
      api
        .get("/api/drinks/?sort=name")
        .then((res) => res.data)
        .then((data) => {
          setShops(data);
          setLoading(false);
        })
        .catch((err) => {
          alert(err);
          setLoading(false);
        });
    }
  };
  console.log(shops);
  return (
    <div className="Shops">
      <NavBar />
      <div
        style={{
          backgroundColor: props.color,
          minHeight: "100vh",
          width: "100vw",
          margin: 0,
          padding: "1rem",
          boxSizing: "border-box",
        }}
      >
        {loading ? <LoadingIndicator /> : <ShopGrid shops={shops} />}
      </div>
      <Footer />
    </div>
  );
}

export default GetShops;

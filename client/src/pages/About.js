import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Shoppe"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Welcome to Shoppe, your one-stop destination for all things stylish
            and innovative. At Shoppe, we believe that shopping should be an
            enjoyable and seamless experience, and we strive to provide our
            customers with the latest trends and top-quality products. Whether
            you're looking for fashion-forward clothing, cutting-edge gadgets,
            or unique home decor, our curated collection has something for
            everyone. Join us on this exciting journey of discovery and shop
            with confidence at Shoppe - where convenience meets creativity.
            Happy shopping!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;

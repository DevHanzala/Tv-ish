import React from "react";
import FrontSupport from "../components/frontsupport"; 
import FAQ from "../components/FAQ";
import Container from "../components/banner"; // Adjust path if needed

const Support = () => {
  return (
    <>
      <div>
        <FrontSupport />
      </div>

      <div className="mt-10 px-4 md:px-10 max-w-10xl mx-auto">
        <FAQ />
      </div>

      <div className="mt-10 px-4 md:px-50 max-w-6xl mx-auto pb-10">
        <Container />
      </div>
    </>
  );
};

export default Support;

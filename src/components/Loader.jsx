import React from "react";

function Loader() {
  return (
    <>
      <div className="loder-container">
        <div className="loader">
          <div class="loading-wave">
            <div class="loading-bar"></div>
            <div class="loading-bar"></div>
            <div class="loading-bar"></div>
            <div class="loading-bar"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loader;

import { useState } from "react";
import dataGlasses from "./assets/dataGlasses.json";
import background from "./assets/glassesImage/background.jpg";
import model from "./assets/glassesImage/model.jpg";

const glassesImages = import.meta.glob(
  "./assets/glassesImage/*.{png,jpg,jpeg}",
  { eager: true, import: "default" },
);

const getGlassesImage = (url) =>
  glassesImages[`./assets/glassesImage/${url.split("/").pop()}`];

function App() {
  const [selectedGlasses, setSelectedGlasses] = useState(dataGlasses[0]);

  return (
    <div
      className="min-vh-100 py-5"
      style={{ background: `url(${background}) center / cover no-repeat` }}
    >
      <div className="container">
        <h1 className="text-center text-white fs-4 fw-light mb-5">
          TRY GLASSES APP ONLINE
        </h1>

        {/* Hai người mẫu */}
        <div className="row justify-content-center g-5 mb-5">
          <div className="col-6 col-lg-4">
            <div className="position-relative overflow-hidden shadow">
              <img
                src={model}
                alt="Người mẫu thử kính"
                className="d-block w-100"
              />

              {selectedGlasses && (
                <>
                  <img
                    src={getGlassesImage(selectedGlasses.url)}
                    alt={selectedGlasses.name}
                    className="position-absolute start-50 translate-middle-x pe-none"
                    style={{ top: "26%", width: "63%" }}
                  />

                  <div className="position-absolute bottom-0 start-0 end-0 bg-dark bg-opacity-50 text-white p-3">
                    <p className="text-warning fw-bold mb-1">
                      {selectedGlasses.name}
                    </p>
                    <p className="small mb-1 lh-sm">{selectedGlasses.desc}</p>
                    <p className="small fw-semibold mb-0">
                      {selectedGlasses.price}$
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="col-6 col-lg-4">
            <div className="overflow-hidden shadow">
              <img
                src={model}
                alt="Người mẫu chưa thử kính"
                className="d-block w-100"
              />
            </div>
          </div>
        </div>

        {/* Danh sách kính */}
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="bg-white bg-opacity-75 rounded shadow p-3">
              <div className="row row-cols-3 row-cols-md-6 g-2">
                {dataGlasses.map((item) => {
                  const isActive = selectedGlasses?.id === item.id;

                  return (
                    <div className="col" key={item.id}>
                      <button
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => setSelectedGlasses(item)}
                        className={`btn border w-100 h-100 p-2 ${
                          isActive ? "btn-warning border-warning" : "btn-light"
                        }`}
                      >
                        <img
                          src={getGlassesImage(item.url)}
                          alt={item.name}
                          className="img-fluid"
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

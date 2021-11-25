import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Link} from "react-router-dom";

export default function LocationPage() {

  const {locationId} = useParams();

  const [location, setLocation] = useState(
    {
      id: 0,
      title: "",
      message: "",
      imageData: "",
      latitude: 0,
      longitude: 0
    }
  );

  useEffect(() => {
    fetch('http://localhost:8080/location/' + locationId,
      {headers: {"Content-Type": "application/json"}})
      .then(response => response.json())
      .then((response) => {
        setLocation(response)
      });
  }, []);

  const deleteLocation = (event) => {
    fetch(
      'https://localhost:8080/delete-location/' + event.target.id,
      {
        method: 'DELETE'
      })
      .then(response => console.log(response.json()));
  }

  return (
    <section className="inner-page">
      <div className="container">
          <div key={location.id} className="card mb-3" /*style={{maxWidth: "800px"}}*/>
            <div className="row g-0">
              <div className="col-md-4">
                <img className="img-fluid rounded-start" src={`data:image/jpeg;base64,${location.imageData}`}
                     alt=""/>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{location.title}</h5>
                  <p className="card-text">{location.message}</p>
                  <p><button id={location.id} onClick={deleteLocation}>Delete location</button></p>
                  <p><button id={location.id}>Update location</button></p>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
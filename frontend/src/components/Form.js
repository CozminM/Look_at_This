import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'
import {DisplayMapFC} from "./Map"

export default function Form() {
  let navigate = useNavigate()

  useEffect(() => {
    fetch("http://localhost:8080/tag/list")
      .then(response => response.json())
      .then(data => setAllTags(data))
  }, []);

  const [location, setLocation] = useState({
    id: 0,
    title: "",
    message: ""
  });

  const [coordinates, setCoordinates] = useState({
    longitude: 0,
    latitude: 0
  })

  const [imageUrl, setImageUrl] = useState("")

  const [allTags, setAllTags] = useState([])
  const [tags, setTags] = useState([]);

  const handleChange = event => {
    const {name, value} = event.target;
    setLocation({
      ...location,
      [name] : value
    });
    console.log(location);
  }

  const handleImageChange = e => {
    let reader = new FileReader();
    let dataURL = e.target.files[0]
    reader.readAsDataURL(dataURL)
    reader.onload = function (e) {
      setImageUrl(reader.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""))
    }
    setCoordinates({
      latitude: document.getElementById("locationLatitude").innerText,
      longitude: document.getElementById("locationLongitude").innerText
    })
  }

  const handleTagClick = (event) => {

    let tag = {
      id: event.target.id,
      name: event.target.innerText
    }

    event.target.classList.toggle("bg-lime-600")
    if(event.target.classList.contains("text-black")) {
      event.target.classList.replace("text-black", "text-white")

      setTags(
        [...tags, {
          id: event.target.id,
          name: event.target.innerText
        }]
      );

    } else {
      event.target.classList.replace("text-white", "text-black")

      setTags(tags.filter(tag => tag.name !== event.target.innerText))
    }
    console.log(tag)
    console.log(tags);
  }

  const handleSubmit = event => {
    event.preventDefault();
    let locationToSend = {
      ...location,
      imageData: imageUrl,
      ...coordinates,
      tags : tags,
      username: localStorage.getItem("username")
    }
    fetch(
      "http://0.0.0.0:8080/location/add",
      {
        method : "POST",
        headers : {
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(locationToSend)
      })
      .then(response => response.json())
      .catch(function() {});
    setTimeout(() => navigate('/location-list'), 500)
  }

  return (
    <div>
      <div className="md:grid md:grid-cols-3 md:gap-6" id="map-container">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-1">
            <DisplayMapFC/>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2 border border-lime-600">
          <form action="#" onSubmit={handleSubmit}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div>
                  <div className="col-span-3 sm:col-span-2">
                    <label htmlFor="company-website" className="block text-xl font-medium text-gray-700 ">
                      Title
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="title"
                        id="locationName" value={location.title} onChange={handleChange} required
                        className="bg-gray-100 border border-lime-800 text-gray-900 sm:text-xs rounded-lg focus:ring-lime-800 focus:border-lime-800 block w-full p-2.5"
                        placeholder="Give your location a title"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="about" className="block text-xl font-medium text-gray-700">
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      value={location.message} onChange={handleChange} required
                      id="message" 
                      name="message"
                      rows={3}
                      className="bg-gray-100 border border-lime-800 text-gray-900 sm:text-sm rounded-lg focus:ring-lime-800 focus:border-lime-800 block w-full p-2"
                      placeholder="Enter your description here"
                    />
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label for="first_name" class="block text-xl font-medium text-gray-700">Location latitude</label>
                  <p className="bg-gray-100 border border-lime-800 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 cursor-not-allowed" id="locationLatitude">{coordinates.latitude}</p>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label for="last_name" class="block text-xl font-medium text-gray-700">Location longitude</label>
                  <p className="bg-gray-100 border border-lime-800 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 cursor-not-allowed" id="locationLongitude">{coordinates.longitude}</p>
                </div>
                <div>
                  <label for="formFile" className="form-label block text-xl font-medium text-gray-700">Location photo</label>
                  <input type="file" name="imageData" id="formFile" accept=".png,.jpg,.jpeg" value={imageUrl.imageData} onChange={handleImageChange} required
                    className="border-lime-800 focus:ring-lime-800 block w-full overflow-hidden cursor-pointer border text-gray-900 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent p-2.5"/>
                </div>
                <div className="col-span-6 sm:col-span-3 h-3/5 w-3/5">
                  <img src={`data:image/jpeg;base64,${imageUrl}`} className="img-responsive " alt='' />
                </div>
                <div className="container h-20 w-full  space-x-4">
                  <label for="formFile" className="form-label block text-xl font-medium text-gray-700">Location tags</label>
                  {allTags.map((tag) => 
                    <span id={tag.id} class="inline-flex items-center justify-center px-5 py-2 text-l font-bold leading-none text-black rounded-full border border-lime-600" onClick={handleTagClick}>{tag.name}</span>
                  )}
                  </div>
              </div>
                <div className="px-4 py-3 bg-gray-100 text-center sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-lime-600 hover:bg-lime-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-800"
                  >
                    Save location
                </button>
              </div>
            </div>
          </form>
          </div>
        </div>
      </div>
    
  );
}
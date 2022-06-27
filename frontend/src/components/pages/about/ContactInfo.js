/* eslint-disable import/no-webpack-loader-syntax */
import React, { useEffect, useRef } from 'react'

import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from '!mapbox-gl'
import '../../../App.css'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const ContactInfo = () => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [21.555, 41.3451],
      zoom: 15,
    })
  }, [])
  return (
    <>
      <section className="p-5" id="contact">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <h2 className="text-center mb-4">Contact Info</h2>
              <ul className="list-group list-group-flush lead">
                <li className="list-group-item">
                  <span className="fw-bold">Main Location:</span> Avenue
                  Aleksandar The Great, Prilep MKD
                </li>
                <li className="list-group-item">
                  <span className="fw-bold">Order Phone:</span> (078) 555-5555
                </li>
                <li className="list-group-item">
                  <span className="fw-bold">Reservation Phone:</span> (048)
                  333-3333
                </li>
                <li className="list-group-item">
                  <span className="fw-bold">Email:</span>
                  contact@alapacha.com.mk
                </li>
              </ul>
            </div>

            <div className="col-md-6">
              <div ref={mapContainer} className="map-container" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactInfo

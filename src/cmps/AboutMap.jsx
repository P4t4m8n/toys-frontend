


import React, { useEffect, useState } from "react";
import GoogleMap from 'google-map-react'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function AboutMap() {

    const [center, setCenter] = useState({
        lat: 10.99835602,
        lng: 77.01502627

    })
    console.log("center:", center)
    const zoom = 11

    useEffect(() => {
        getUserLoc()
    }, [])

    function getUserLoc() {
        navigator.geolocation.getCurrentPosition(givePosition)
    }

    function givePosition(position) {
        setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
    }




    const shops = [
        { "location": "Western Wall (Waibuttonng Wall), Jerusalem", lat: 31.7767, lng: 35.2345 },
        { "location": "Tel Aviv-Yafo", lat: 32.0853, lng: 34.7818 },
        { "location": "Masada", lat: 31.3158, lng: 35.3534 },
        { "location": "Dead Sea", lat: 31.4997, lng: 35.2140 },
        { "location": "Baha'i Gardens, Haifa", lat: 32.8204, lng: 34.9832 }
    ]

    return (
        // Important! Always set the container height expbuttoncitly
        <section className="map-contianer">

            <div style={{ height: '40vh', width: '60%' }} >
                <GoogleMap
                    bootstrapURLKeys={{ key: "AIzaSyD3ttgm9AgTaAeM3V8JwTJB9L_Wtfn_h_0", region: 'IL' }}
                    center={center}
                    defaultZoom={zoom}

                >
                    {
                        shops.map(shop =>
                            <AnyReactComponent
                                key={shop.location}
                                lat={shop.lat}
                                lng={shop.lng}
                                text="📍"
                            />
                        )}
                </GoogleMap>
            </div >

            <div className="map-btns">
                {shops.map(shop =>
                    <button key={shop.location} onClick={() => setCenter({ lat: shop.lat, lng: shop.lng })}>{shop.location}</button>
                )}
            </div>
        </section>
    );
}
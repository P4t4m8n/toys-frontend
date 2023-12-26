

export const mapServices = {
    getUserLoc,
}

function getUserLoc() {
  
    navigator.geolocation.getCurrentPosition()
   


}

function givePosition(position) {
    console.log("position:", position.coords.latitude)
    return {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    }
}


import {
  CHANGE_VIEWPORT,
  ADD_NEEDED_PLACES,
  ADD_FOUNDED_PATH,
  FILTER_CHECKED_PLACE
} from "./types";
import axios from "axios";

const hexagonPointSettings = (coordinates, color, displayName) => {
  return {
    lat: coordinates.lat,
    lon: coordinates.lon,
    centroid: [coordinates.lat, coordinates.lon],
    elevation: 2500,
    display_name: displayName,
    color
  };
};

const detectYourLocation = () => {
  let positionCoords;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      positionCoords = position.coords;
    });
    if (positionCoords !== undefined) {
      return hexagonPointSettings(
        positionCoords,
        [255, 0, 0],
        "Your current location"
      );
    }
  }
  const MY_POINT = {
    lat: 51.609973,
    lon: -0.134503
  };
  return hexagonPointSettings(
    MY_POINT,
    [255, 0, 0],
    "Your location could not be determined. Default location for Demo is used"
  );
};

export const changeViewport = newViewport => {
  return {
    type: CHANGE_VIEWPORT,
    payload: newViewport
  };
};


export const addNeededPlaces = placeName => async dispatch => {
  const town = "London";
  const country = "Great Britain";
  const boundingBox = "-0.5103, 51.2868, 0.3340, 51.6923";

  try {
    const response = await axios(
      `https://us1.locationiq.com/v1/search.php?key=51d8457aee4d15&q=${placeName}&viewbox=${encodeURIComponent(
        boundingBox
      )}&format=json&limit=50&bounded=1`
    );

    const yourPosition = await detectYourLocation();
    await response.data.push(yourPosition);

    dispatch({
      type: ADD_NEEDED_PLACES,
      payload: response.data
    });

    //dispatch(addLinesNearNeededPlaces(response.data));
  } catch (err) {
    dispatch({
      type: ADD_NEEDED_PLACES,
      payload: {
        error: true
      }
    });
  }
};

export const filterCheckedPlace = (index) => {
  return {
    type: FILTER_CHECKED_PLACE,
    payload: index
  }
}

export const findPath = coordinates => async dispatch => {
  console.log("findpath");


  const APP_ID = "bafe1922";
  const APP_KEY = "20ff777722f9f7ee2ec27ff30abc6b5a";

  const request = `https://api.tfl.gov.uk/Journey/JourneyResults/${coordinates[1]},${
    coordinates[0]}/to/${coordinates[3]},${coordinates[2]}?walkingOptimization=false&app_id=${APP_ID}&app_key=${APP_KEY}`;
  const response = await axios(request);
  console.log(request);
  dispatch({
    type: ADD_FOUNDED_PATH,
    payload: response.data
  })
  // const startToNeededPlacesPathes = [];

  // const neededPlacesLength = neededPlaces.length;

  // neededPlaces.forEach(async (el, index) => {
  //   const response = await axios(
  //     `https://api.tfl.gov.uk/Journey/JourneyResults/${MY_POINT.lat},${
  //       MY_POINT.lon
  //     }/to/${Number(el.lat)},${Number(
  //       el.lon
  //     )}?walkingOptimization=false&app_id=${APP_ID}&app_key=${APP_KEY}`
  //   );
  //   console.log(el);
  //   startToNeededPlacesPathes.push(response.data);
  //   if (startToNeededPlacesPathes.length === neededPlacesLength) {
  //     dispatch({
  //       type: ADD_FOUNDED_PATH,
  //       payload: startToNeededPlacesPathes
  //     });
  //   }
  // });
};
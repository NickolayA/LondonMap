import {
  CHANGE_VIEWPORT,
  ADD_NEEDED_PLACES,
  ADD_START_STOP_POINTS_PAIR
} from "./types";
import axios from "axios";

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
    // const response = await axios(
    //   `https://us1.locationiq.com/v1/search.php?key=51d8457aee4d15&q=${placeName}&city=${encodeURIComponent(
    //     town
    //   )}&county=${encodeURIComponent(country)}&viewbox=${encodeURIComponent(
    //     boundingBox
    //   )}&format=json&limit=50&bounded=1`
    // );
    const response = await axios(
      `https://us1.locationiq.com/v1/search.php?key=51d8457aee4d15&q=${placeName}&viewbox=${encodeURIComponent(
        boundingBox
      )}&format=json&limit=50&bounded=1`
    );

    dispatch({
      type: ADD_NEEDED_PLACES,
      payload: response.data
    });

    dispatch(addLinesNearNeededPlaces(response.data));

  } catch (err) {
    dispatch({
      type: ADD_NEEDED_PLACES,
      payload: {
        error: true
      }
    });
  }
};

export const addLinesNearNeededPlaces = neededPlaces => async dispatch => {

  const MY_POINT = {
    lat: 51.609973,
    lon: -0.134503
  };

  const RADIUS = 1000;

  const APP_ID = "bafe1922";
  const APP_KEY = "20ff777722f9f7ee2ec27ff30abc6b5a";
  const STOP_POINT_TYPES = [
    "NaptanMetroStation",
    "NaptanRailStation",
    "NaptanBusCoachStation",
    "NaptanFerryPort",
    "NaptanPublicBusCoachTram",
    "NaptanBusWayPoint"
  ];

  let request = `https://api.tfl.gov.uk/Stoppoint?lat=${MY_POINT.lat}&lon=${
    MY_POINT.lon
  }&stoptypes=${STOP_POINT_TYPES.join(
    ","
  )}&app_id=${APP_ID}&app_key=${APP_KEY}&radius=${RADIUS}`;

  let response = await axios(request);

  let nearestToMeStopPoint;

  if (response.data.stopPoints.length) {
    nearestToMeStopPoint = response.data.stopPoints[0];
  } else {
    dispatch({
      type: ADD_START_STOP_POINTS_PAIR,
      payload: {
        error: `StopPoints near you position within a radius of ${RADIUS} kilometers was not found`
      }
    })
    return null;
  }



  const startStopPointsPairs = [];

  const neededPlacesLength = neededPlaces.length;

  neededPlaces.forEach(async (el, index) => {
    request = `https://api.tfl.gov.uk/Stoppoint?lat=${el.lat}&lon=${
      el.lon
    }&stoptypes=${STOP_POINT_TYPES.join(
      ","
    )}&app_id=${APP_ID}&app_key=${APP_KEY}&radius=${RADIUS}`;


    const response = await axios(request);

    if (response.data.stopPoints.length) {
      startStopPointsPairs.push([nearestToMeStopPoint, response.data.stopPoints[0]]);

    } else {
      startStopPointsPairs.push([nearestToMeStopPoint, "error"]);
    }

    if (startStopPointsPairs.length === neededPlacesLength) {
      dispatch({
        type: ADD_START_STOP_POINTS_PAIR,
        payload: startStopPointsPairs
      })
    }

  });




};
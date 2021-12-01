import { fetchRequest } from "./index";
import { Trip } from 'Types';

const TRIPS_URL = "/trips";

async function addNewTrip(trip: Trip): Promise<Trip[]> {
  return fetchRequest(TRIPS_URL, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(trip),
  });
}

export function getOnePersonalTrip(id: string) {
  return fetchRequest(`${TRIPS_URL}/${id}`);
}

export function getAllPersonalTrips(id: string | number): Promise<any> {
  return fetchRequest(`${TRIPS_URL}/${id}`);
}
// async function getAllPersonalTrips(body) {
// const {
//   destination,
//    dates,
//      sights,
//      tags
// } = body;

// }

// export function updateJournal(id: string | number, update: Trip): Promise<Trip> {
//   return fetchRequest(`${TRIPS_URL}/${id}`, {
//     method: 'PUT',
//     mode: 'cors',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(update)
//   })
// }
async function deleteOnePersonalTrip(id: string) {
  await fetchRequest(`${TRIPS_URL}/SSS/${id}`, {
    method: "DELETE",
  });
}

const tripsService = {
  addNewTrip,

  getAllPersonalTrips,
  getOnePersonalTrip,
  // updateOnePersonalTrip,
  deleteOnePersonalTrip,
};

export default tripsService;

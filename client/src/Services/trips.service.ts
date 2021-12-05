import { fetchRequest } from "./index";
import { Trip } from "Types";

const TRIPS_URL = "/trips";

async function addNewTrip(trip: Trip): Promise<Trip[]> {
  const { uid, city, visit, dateFrom, dateTo } = trip;
  return fetchRequest(TRIPS_URL, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      uid,
      city,
      dateFrom,
      dateTo,
      visit,
    }),
  });
}

export function getOnePersonalTrip(id: string): Promise<Trip> {
  return fetchRequest(`${TRIPS_URL}/${id}`);
}

export function getAllPersonalTrips(
  uid: string | number
): Promise<{ plans: Trip[] }> {
  return fetchRequest(`${TRIPS_URL}/${uid}`);
}

export function updateTrip(id: string | number, update: Trip): Promise<Trip> {
  console.log("id", id);

  return fetchRequest(`${TRIPS_URL}/${id}`, {
    method: "PUT",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(update),
  });
}
async function deleteOnePersonalTrip(id: string): Promise<void> {
  await fetchRequest(`${TRIPS_URL}/${id}`, {
    method: "DELETE",
  });
}

const tripsService = {
  addNewTrip,
  getAllPersonalTrips,
  getOnePersonalTrip,
  updateTrip,
  deleteOnePersonalTrip,
};

export default tripsService;

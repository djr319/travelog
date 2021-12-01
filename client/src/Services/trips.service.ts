import fetchRequest from "./index";

const TRIPS_URL = "/trips";

async function addNewTrip(trips: any): Promise<any> {
  return fetchRequest(TRIPS_URL, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(trips),
  });
}

export function getOnePersonalTrip(id: string) {
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

async function deleteOnePersonalTrip(id: string) {
  await fetchRequest(`${TRIPS_URL}/SSS/${id}`, {
    method: "DELETE",
  });
}

const tripsService = {
  addNewTrip,

  //  getAllPersonalTrips,
  getOnePersonalTrip,
  //  updateOnePersonalTrip,
  deleteOnePersonalTrip,
};

export default tripsService;

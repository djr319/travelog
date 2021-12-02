import { fetchRequest } from "./index";
import { Profile } from "Types";

const PROFILE_URL = "/profile";

async function addNewProfile(profile: Profile): Promise<Profile> {
  return fetchRequest(PROFILE_URL, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });
}
export function getProfile(id: string) {
  return fetchRequest(`${PROFILE_URL}/${id}`);
}

const profileService = {
  addNewProfile,
  getProfile,
};

export default profileService;

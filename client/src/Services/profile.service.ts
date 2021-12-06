import { fetchRequest } from "./index";
import { Profile } from "Types";

const PROFILE_URL = "/profile";

async function addProfile(profile: Profile): Promise<Profile> {
  return fetchRequest(PROFILE_URL, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });
}

export function getProfile(uid: string): Promise<Profile> {
  return fetchRequest(`${PROFILE_URL}/${uid}`);
}

const profileService = {
  addProfile,
  getProfile,
};

export default profileService;

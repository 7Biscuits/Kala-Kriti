import { ICoordinates } from "../interface/ICoordinates";

export async function getCoordinates(): Promise<ICoordinates> {
  try {
    const response = await fetch("https://ipinfo.io/json");
    if (!response.ok) {
      throw new Error(
        `Failed to fetch IP information. Status: ${response.status}`
      );
    }

    const data = await response.json();
    const [latitude, longitude] = data.loc.split(",");

    return { latitude, longitude };
  } catch (error: any) {
    throw new Error(`Error getting location: ${error.message}`);
  }
}
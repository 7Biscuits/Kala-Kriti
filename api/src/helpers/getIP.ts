import { networkInterfaces } from "os";

export const getIPAddress = (): string | undefined => {
  const interfaces = networkInterfaces();

  for (const key of Object.keys(interfaces)) {
    const networkInterface = interfaces[key];

    const ipAddressInfo = networkInterface?.find(
      (info) => !info.internal && info.family === "IPv4"
    );

    if (ipAddressInfo) return ipAddressInfo.address;
  }
  return undefined;
}
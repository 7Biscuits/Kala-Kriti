export interface ApiResponse {
  _id: string;
  mq2: string;
  quality: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}
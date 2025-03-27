//  defining the visual type of response from the server
// type safety is maintained here by defining the type of response from the server as ApiResponse
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  error?: string | null;
}

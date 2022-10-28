export interface UserResponse {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string | null;
  /**
   * The user's unique ID.
   */
  uid: string;
}

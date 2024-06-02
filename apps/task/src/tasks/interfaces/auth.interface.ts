import { Observable } from "rxjs";

export interface AuthService {
    validateToken(data: LoginResponse): Observable<ValidateTokenResponse>;
  }
  
  export interface LoginResponse {
    token: string;
  }
  
  export interface ValidateTokenResponse {
    isValid: boolean;
    userId: string;
  }
  
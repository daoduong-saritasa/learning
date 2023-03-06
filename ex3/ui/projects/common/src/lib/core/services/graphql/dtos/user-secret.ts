/** User secret. */
export interface JwtToken {

  /** Jwt token. */
  jwtToken: string;
}

/** Authenticate function. */
export interface AuthenticateDto {

  /** Authenticate response. */
  authenticate: JwtToken;
}

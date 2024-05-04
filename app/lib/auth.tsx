// // import { jwtVerify } from "jose";

// // export function getJwtSecretKey() {
// //   const secret = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
// //   if (!secret) {
// //     throw new Error("JWT Secret key is not matched");
// //   }
// //   return new TextEncoder().encode(secret);
// // }

// // export async function verifyJwtToken(token:any) {
// //   try {
// //     const { payload } = await jwtVerify(token, getJwtSecretKey());
// //     return payload;
// //   } catch (error) {
// //     return null;
// //   }
// // }
// import jwt from "jsonwebtoken";

// // Hàm giải mã token và lấy vai trò từ token
// const decodeTokenAndGetRole = (token: string): string | null => {
//   try {
//     // Giải mã token và lấy thông tin được mã hóa trong payload
//     const decodedToken: any = jwt.verify(token, "your-secret-key");

//     // Trả về vai trò từ payload
//     return decodedToken.role;
//   } catch (error) {
//     console.error("Error decoding token:", error);
//     return null;
//   }
// };

// export default decodeTokenAndGetRole;

// import { verify } from "jsonwebtoken";

// interface TokenPayload {
//   username: string;
//   role: number;
// }

// export function decodeToken(token: string): TokenPayload | null {
//   try {
//     const decoded = verify(token, "secret-key") as TokenPayload;
//     return decoded;
//   } catch (error) {
//     console.error("Failed to decode token:", error);
//     return null;
//   }
// }

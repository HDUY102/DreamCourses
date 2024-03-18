import {z} from "zod";
const RegisterSchema = z.object({
    username: z.string().min(3,"Requires username to be more than 3 characters").max(255),
    PassWord: z.string().min(3,"Requires password to be more than 3 characters").max(8),
})
export default RegisterSchema
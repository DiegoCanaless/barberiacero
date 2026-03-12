import { UserResponseDTO } from "../user/UserResponseDTO";


export interface AuthResponseDTO {
    message: string;
    user: UserResponseDTO;
}

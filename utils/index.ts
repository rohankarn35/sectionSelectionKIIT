import { store } from "@/Redux/store/store";
import { addUser } from "./functions";
import { setConfirmOpen, setOpenCreate } from "@/Redux/reducers/sectionswap";




export const section = Array.from({ length: 55 }, (_, index) => index + 1);


export const handleOnConfirm=async(name:string,email:string,alloted:number,lookingFor:number[],contact:string):Promise<boolean|Error>=>{
    try {
        const pc = await addUser(name,email,alloted,lookingFor,contact);
    // console.log("getting data",pc);

    return pc;
    } catch (error) {
        return new Error("Whats up baby");
    }
}
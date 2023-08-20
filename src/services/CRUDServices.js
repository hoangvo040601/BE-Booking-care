import bcrypt from "bcrypt";
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
// const someOtherPlaintextPassword = 'not_bacon';
import db from "../models";


const createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashPasword(data.password);
            await db.User.create({
                firstName: data.firstName,
                password: hashPasswordFromBcrypt,
                lastName: data.lastName,
                email: data.email,
                address: data.address,
                gender: data.gender === 1 ? true : false,
                roleId: data.roleId,
                phoneNumber: data.phoneNumber,
                // positionId: data.positionId,
                // image: data.image
            }
            )
            resolve("ok");
        } catch (e) {
            reject(e);
        }
    })
}
const hashPasword = async (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPasword = await bcrypt.hashSync(password, salt);
            resolve(hashPasword);
        } catch (e) {
            reject(e);
        }
    })

}

const read_crud = async () => {
    return new Promise(async(resolve, reject) => {
        try {
            let read_data = db.User.findAll({raw:true});
            resolve(read_data);
        } catch (e) {
            reject(e)
        }
    })
}

const getEditUser = async (dataIdEdit) => {
    return new Promise(async(resolve, reject) => {
        try{
            let id = await db.User.findOne({
                where: {id: dataIdEdit},
            })
            if(id){
                resolve(id)
            }else{
                resolve({})
            }
        }catch(e){
            reject(e)
        }
    })
}
const updateUserEdit = async(data) => {
   return new Promise(async(resolve, reject) => {
    try{
        let user = await db.User.findOne({
            where : {id: data.id}
        })
        if(user){
            user.firstName= data.firstName;
            user.lastName= data.lastName;
            user.email= data.email;
            user.phoneNumber= data.phoneNumber;
            user.gender= data.gender;
            
            await user.save()

            let allUsers = await db.User.findAll();

            resolve(allUsers);
        }else{
            resolve();
        }
    }catch(e){
        reject(e)
    }

   })
}

// const deleteUserById = async(id) => {
//     return new Promise(async(resolve, reject) => {
//         try{
//             let user = await db.User.findOne({
//                 where: {id: id}
//             })
//             if(user){
//                 await user.destroy();
//             }
//             resolve();
//         }catch(e){
//             reject(e)
//         }
//     })
// }
export { createNewUser,read_crud,getEditUser,updateUserEdit, /*deleteUserById*/ };
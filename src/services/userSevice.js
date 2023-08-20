import db from "../models/index";
import bcrypt from "bcrypt";
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            let isExist = await checkEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ["email", "roleId", "password","firstName", "lastName"],
                })
                if (user) {

                    let check = bcrypt.compareSync(password, user.password)
                    if (check) {
                        data.errCode = 0;
                        data.errMessage = "ok";
                        delete user.password;
                        data.user = user;
                    }
                    else {
                        data.errCode = 3;
                        data.errMessage = "Wrong password";
                    }
                } else {
                    data.errCode = 2;
                    data.errMessage = `User not found`
                }
            } else {
                data.errCode = 1;
                data.errMessage = `Your's email isn't exist in your system. Please try again!`
            }
            resolve(data)
        } catch (err) {
            reject(err);
        }
    })
}

const checkEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (err) {
            reject(err);
        }
    })
}

const getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = "";
            if (userId === "ALL") {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ["password"],
                    },
                })
            }
            if (userId && userId !== "ALL") {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ["password"],
                    },
                })
            }
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

const hashPasword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasword = bcrypt.hashSync(password, salt);
            resolve(hashPasword);
        } catch (e) {
            reject(e);
        }
    })

}


const createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errmessage: "Your email is already used, please try another email!",
                });
            }
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
            resolve({
                errCode: 0,
                errmessage: "ok",
            });
        } catch (e) {
            reject(e);
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id }
            })
            if (!user) {
                resolve({
                    errCode: 1,
                    errMessage: `The user isn't exist`
                })
            }
            await db.User.destroy({
                where: { id: id }
            });

            resolve({
                errCode: 0,
                errMessage: `The user was deleted`
            })

        } catch (e) {
            reject(e);
        }
    })
}

const editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data)
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Mising required parameter!"
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            console.log(user)
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.email = data.email;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                user.gender = data.gender;

                await user.save()
                resolve({
                    errCode: 0,
                    errMessage: "Update user is succeeds!"
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `User's not found!`
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

const getAllCode = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter! "
                })
            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }
        } catch (e) {
            reject(e)
        }
    })
}
export {
    handleUserLogin,
    getAllUser,
    createNewUser,
    deleteUser,
    editUser,
    getAllCode,
}
import { handleUserLogin, getAllUser, createNewUser, deleteUser, editUser, getAllCode } from "../services/userSevice";
const handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing inputs parameter",

        })
    }
    let userData = await handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

const handleGetAllUsers = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 0,
            errMessage: "Mising require parameters",
            users: []
        })
    }
    let users = await getAllUser(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: "ok",
        users
    })
}

const handleCreateNewUser = async (req, res) => {
    let users = req.body;
    let data = await createNewUser(users);
    return res.status(200).json(data)
}

const handleEditUser = async (req, res) => {
    let dataEdit = req.body;
    let data = await editUser(dataEdit);
    // console.log(dataEdit)
    return res.status(200).json(data)

}

const handleGetAllCode = async (req, res) => {
    try {
        let data = await getAllCode(req.query.type);
        return res.status(200).json(data);

    }catch(e){
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

const handleDeleteUser = async (req, res) => {
    let id = req.body.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Mising required parameters!"
        })
    }
    let user = await deleteUser(id);
    return res.status(200).json(user)
}
export { handleLogin, handleGetAllUsers, handleCreateNewUser, handleEditUser, handleDeleteUser, handleGetAllCode };
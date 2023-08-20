import db from "../models/index"
import { createNewUser, read_crud, getEditUser, updateUserEdit, deleteUserById } from "../services/CRUDServices";
const getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('Home.ejs',
            { data: JSON.stringify(data) });
    } catch (e) {
        console.log(e)
    }
}

const getAbout = async (req, res) => {
    return res.render("About.ejs")
}
const getCrud = async (req, res) => {
    return res.render("crud.ejs")

}

const postCrud = async (req, res) => {
    let mess = await createNewUser(req.body)
    return res.send("page post crud on server")
}

const getReadCrud = async (req, res) => {
    let readCrud = await read_crud()
    // console.log(readCrud)
    return res.render("read_crud.ejs", { readCrud })
}

const editCrud = async(req, res) => {
    let dataIdEdit = req.query.id;
    // console.log(dataIdEdit)
    if (dataIdEdit) {
        let editCrud = await getEditUser(dataIdEdit);
        return res.render("editCrud.ejs",{editCrud})

    } else {
        return res.send("User not found")
        // console.log(req.query.id)
    }}

const putEditCrud = async(req,res) =>{
    let data = req.body;
    let allUsers = await updateUserEdit(data);
    // console.log(allUsers)
    return res.render("read_crud.ejs",{readCrud:allUsers})
}

// const putDeleteCrud = async(req, res) =>{
//     let id = req.query.id;
//     if(id){
//         await deleteUserById(id);
//     }else{
//         return res.send("User not found")
// }}
    export { getHomePage, getAbout, postCrud, getCrud, getReadCrud, editCrud, putEditCrud,/*putDeleteCrud*/ }
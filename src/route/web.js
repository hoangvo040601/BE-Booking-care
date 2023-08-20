import express from "express";
import { getAbout, getCrud, getHomePage, getReadCrud, postCrud,editCrud,putEditCrud,putDeleteCrud} 
from "../controllers/homeController";
import { handleGetAllUsers, handleLogin, handleCreateNewUser, handleEditUser, handleDeleteUser, handleGetAllCode} from "../controllers/userController";

let router = express.Router();
const initWebRouter =(app) => {
    router.get("/", getHomePage)
    router.get("/about", getAbout)
    router.get("/crud", getCrud)
    router.post("/post-crud", postCrud)
    router.get("/read-crud",getReadCrud)
    router.get("/edit-crud",editCrud)
    router.post("/put-crud",putEditCrud)
    // router.get("/delete-crud",putDeleteCrud)
    router.post("/api/login",handleLogin)
    router.get("/api/get-all-users",handleGetAllUsers)
    router.post("/api/create-new-user",handleCreateNewUser)
    router.put("/api/edit-user",handleEditUser)
    router.delete("/api/delete-user",handleDeleteUser)
    router.get("/api/allcode",handleGetAllCode )






    
    return app.use("/",router);
}

export default initWebRouter;
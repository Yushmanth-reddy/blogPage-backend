const express = require("express");
const {getAllblogs, postblog, addLike, removeLike, updateBlog, deleteBlog, getSpecificBlog} = require("../controllers/blogs");
const { tokenCheck } = require("../middleware/tokenVerification");
const router = express.Router();

router.get("/allblogs",tokenCheck,getAllblogs);
router.post("/postblog",tokenCheck,postblog);
router.get("/specificBlog/:blogid",tokenCheck,getSpecificBlog);
router.put("/updateBlog/:blogid",tokenCheck,updateBlog);
router.delete("/deleteblog/:blogid",deleteBlog,);

router.post("/addlike/:blogid",addLike);
router.post("/removelike/:blogid",removeLike);

module.exports = router;
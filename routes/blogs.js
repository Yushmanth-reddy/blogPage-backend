const express = require("express");
const {getAllblogs, postblog, addLike, removeLike, updateBlog, deleteBlog, getSpecificBlog, likeCkeck, getfeatureBlogs} = require("../controllers/blogs");
const { tokenCheck } = require("../middleware/tokenVerification");
const router = express.Router();

router.get("/allblogs",tokenCheck,getAllblogs);
router.post("/postblog",tokenCheck,postblog);
router.get("/featureingBlogs",tokenCheck,getfeatureBlogs);
router.get("/specificBlog/:blogid",tokenCheck,getSpecificBlog);
router.put("/updateBlog/:blogid",tokenCheck,updateBlog);
router.delete("/deleteblog/:blogid",deleteBlog,);

router.get("/likeCheck/:blogid",tokenCheck,likeCkeck);
router.put("/addlike/:blogid",tokenCheck,addLike);
router.put("/removelike/:blogid",tokenCheck,removeLike);

module.exports = router;
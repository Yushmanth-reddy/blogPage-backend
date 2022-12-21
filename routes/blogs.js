const express = require("express");
const {getAllblogs, postblog, addLike, removeLike, updateBlog, deleteBlog} = require("../controllers/blogs");
const { tokenCheck } = require("../middleware/tokenVerification");
const router = express.Router();

router.get("/allblogs",tokenCheck,getAllblogs);
router.post("/postblog",tokenCheck,postblog);
router.put("/updateBlog/:blogid",tokenCheck,updateBlog);
router.delete("/deleteblog/:blogid",deleteBlog,);

router.post("/addlike/:blogid",tokenCheck,addLike);
router.post("/removelike/:blogid",tokenCheck,removeLike);

module.exports = router;
const client = require("../configs/db");

exports.getAllblogs = (req,res)=>{
    const email = req.email;
    client.query(`select * from blogs where email = '${email}';`)
    .then((data)=>{
        const blogs = data.rows;
        const filteredBlogs = blogs.map((eachBlog)=>{
            return({
                blogid : eachBlog.blogid,
                title : eachBlog.title,
                content : eachBlog.blogcontent,
                likes : eachBlog.likes
            })
        })
        res.status(200).json({
            data : filteredBlogs,
            msg:"Blogs recieved"
        })
    })
    .catch((err)=>{
        console.log(err);
    })

}

exports.postblog = (req,res)=>{
    const {title,blogcontent} = req.body;
    const email = req.email;
    const likes = 0;
    client.query(`insert into blogs(email,title,blogcontent,likes) values('${email}','${title}','${blogcontent}','${likes}');`)
    .then((data)=>{
        res.status(200).json({
            msg:"blog added"
        })
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({
            msg:"database error"
        })
    })
}

exports.addLike = (req,res)=>{
    const blogid = req.params.blogid;
    const email = req.email;
    client.query(`select likes from blogs where blogid = ${blogid}`)
    .then((data)=>{
        const oldLikes = data.rows[0].likes;
        const newLikes = oldLikes+1;
        client.query(`update blogs set likes = ${newLikes} where blogid = ${blogid}`)
        .then((data)=>{
            res.status(200).json({
                msg : "Likes added"
            })
        })
        .catch((err)=>{
            res.status(500).json({
                msg : "database error"
            })
        })
    })
    .catch((err)=>{
        console.log(err);
    })
}

exports.removeLike = (req,res)=>{
    const blogid = req.params.blogid;
    const email = req.email;
    client.query(`select likes from blogs where blogid = ${blogid}`)
    .then((data)=>{
        const oldLikes = data.rows[0].likes;
        const newLikes = oldLikes-1;
        client.query(`update blogs set likes = ${newLikes} where blogid = ${blogid}`)
        .then((data)=>{
            res.status(200).json({
                msg : "Likes removed"
            })
        })
        .catch((err)=>{
            res.status(500).json({
                msg : "database error"
            })
        })
    })
    .catch((err)=>{
        console.log(err);
    })
}

exports.updateBlog = (req,res)=>{
    const {title,blogcontent} = req.body;
    const blogid = req.params.blogid;
    client.query(`update blogs set title = '${title}', blogcontent='${blogcontent}' where blogid = ${blogid}`)
    .then((data)=>{
        res.status(200).json({
            msg : "blog updated"
        })
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({
            msg : "database error"
        })
    })
}

exports.deleteBlog = (req,res)=>{
    const blogid = req.params.blogid;
    client.query(`delete from blogs where blogid = ${blogid}`)
    .then((data)=>{
        res.status(200).json({
            msg : "blog deleted"
        })
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({
            msg : "database error"
        })
    })
}

exports.getSpecificBlog = (req,res)=>{
    const blogid = req.params.blogid;
    client.query(`select * from blogs where blogid = ${blogid};`)
    .then((data)=>{
        const blogData = data.rows[0];
        res.status(200).json({
            data: blogData,
            msg : "Data sent"
        })
    })
    .catch((err)=>{
        console.log(err);
    })
}
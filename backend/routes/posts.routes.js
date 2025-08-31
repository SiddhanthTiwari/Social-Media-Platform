import { Router } from "express";
import { activeCheck, commentPost, createPost, deleteComment, deletePost, get_comment_by_post, getAllPosts, increment_likes } from "../controllers/post.controllers.js";
import multer from "multer";

const router=Router();

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});

const upload=multer({storage:storage});

router.route("/").get(activeCheck);

router.route("/post").post(upload.single("media"),createPost)
router.route("/posts").get(getAllPosts);
router.route("/delete_post").delete(deletePost);
router.route("/comment").post(commentPost);
router.route("/get_comments").get(get_comment_by_post);
router.route("/delete_comment").delete(deleteComment);
router.route("/increment_post_like").post(increment_likes);

export default router;
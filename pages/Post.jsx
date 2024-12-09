import React,{ useEffect,useState } from "react";
import { Link,useNavigate,useParams } from "react-router-dom";
import appwriteService from '../appWrite/configure'
import { Button,Container } from "../index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

export default function Post() {
    const [post,setPost] = useState(null);
    const [loading,setloading] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;
    const [url,setUrl] = useState()
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    appwriteService.getFilePreview(post.featuredImage).then((data) => {
                        setUrl(data.href)
                    })
                    setPost(post);
                }
                else navigate("/");
            })
        } else navigate("/");
    },[slug,navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };
    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex flex-wrap justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={url}
                        alt={post.title}

                        width="300px"
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`} >
                                <Button bgColor="bg-green-500" className="mr-3" onClick={()=>(setloading(true))}>
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
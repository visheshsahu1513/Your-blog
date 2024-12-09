// import React,{ useCallback,useEffect,useState } from "react";
// import { set,useForm } from "react-hook-form";
// import { Button,Input,RTE,Select } from "../index";
// import appwriteService from "../appWrite/configure";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Loading from "./Loading";

// export default function PostForm({ post }) {
//     const { register,handleSubmit,watch,setValue,control,getValues } = useForm({
//         defaultValues: {
//             title: post?.title || "",
//             slug: post?.$id || "",
//             content: post?.content || "",
//             status: post?.status || "active",
//         },
//     });
//     const [loading,setLoading] = useState(false);
//     const [error,seterror] = useState(false);

//     const navigate = useNavigate();
//     const userData = useSelector((state) => (state.auth.userData));

//     const submit = async (data) => {
//         setLoading(true);
//         if (post) {
//             const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
//             if (file) {
//                 appwriteService.deleteFile(post.featuredImage);
//             }

//             const dbPost = await appwriteService.updatePost(post.$id,{
//                 ...data,
//                 featuredImage: file ? file.$id : undefined,
//             });

//             if (dbPost) {
//                 navigate(`/post/${dbPost.$id}`);
//             }
//         } else {
//             const file = await appwriteService.uploadFile(data.image[0]);
//             if (file) {
//                 const fileId = file.$id;
//                 data.featuredImage = fileId;
//                 const dbPost = await appwriteService.createPost({ ...data,userId: userData?.$id });
//                 // const dbPost = await appwriteService.createPost({ ...data,userId:data.slug});
//                 // console.log(data,userData);
//                 if (dbPost) {
//                     navigate(`/post/${dbPost.$id}`);
//                 }
//             }
//         }
//     };

//     const slugTransform = useCallback((value) => {
//         if (value && typeof value === "string")
//             return value
//                 .trim()
//                 .toLowerCase()
//                 .replace(/[^a-zA-Z\d\s]+/g,"-")
//                 .replace(/\s/g,"-");

//         return "";
//     },[]);

//     React.useEffect(() => {
//         const subscription = watch((value,{ name }) => {
//             if (name === "title") {
//                 setValue("slug",slugTransform(value.title),{ shouldValidate: true });
//             }
//         });

//         return () => subscription.unsubscribe();
//     },[watch,slugTransform,setValue]);

//     if (loading===false) {
//         return <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
//             <div className="w-2/3 px-2">
//                 <Input
//                     label="Title :"
//                     placeholder="Title"
//                     className="mb-4"
//                     {...register("title",{ required: true })}
//                 />
//                 <Input
//                     label="Slug :"
//                     placeholder="Slug"
//                     className="mb-4"
//                     {...register("slug",{ required: true })}
//                     onInput={(e) => {
//                         setValue("slug",slugTransform(e.currentTarget.value),{ shouldValidate: true });
//                     }}
//                 />
//                 <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
//             </div>
//             <div className="w-1/3 px-2">
//                 <Input
//                     label="Featured Image :"
//                     type="file"
//                     className="mb-4"
//                     accept="image/png, image/jpg, image/jpeg, image/gif"
//                     required={true}
//                     {...register("image",{ required: !post })}
//                 />
//                 {/* {post && (
//                         <div className="w-full mb-4">
//                             <img
//                                 src={appwriteService.getFilePreview(post.featuredImage)}
//                                 alt={post.title}
//                                 height="100px" width="100px"
//                                 className="rounded-lg"
//                             />
//                         </div>
//                     )} */}
//                 <Select
//                     options={["active","inactive"]}
//                     label="Status"
//                     className="mb-4"
//                     {...register("status",{ required: true })}
//                 />
//                 <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full" >
//                     {post ? "Update" : "Submit"}
//                 </Button>
//             </div>
//         </form>
//     }
//     else{
//         return <Loading/>
//     }
// }
import React,{ useCallback,useEffect,useState } from "react";
import { useForm } from "react-hook-form";
import { Button,Input,RTE,Select } from "../index";
import appwriteService from "../appWrite/configure";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "./Loading";
// import debounce from "lodash.debounce";

export default function PostForm({ post }) {
    const { register,handleSubmit,watch,setValue,control,getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        setLoading(true);
        try {
            let file = null;
            if (data.image[0]) {
                file = await appwriteService.uploadFile(data.image[0]);
                if (file && post) {
                    await appwriteService.deleteFile(post.featuredImage);
                }
            }

            let dbPost;
            if (post) {
                dbPost = await appwriteService.updatePost(post.$id,{
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                });
            } else {
                data.featuredImage = file ? file.$id : undefined;
                dbPost = await appwriteService.createPost({ ...data,userId: userData?.$id });
            }

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } catch (err) {
            console.error("Error handling post:",err);
            setError("An error occurred while processing the post. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g,"-")
                .replace(/\s/g,"-");

        return "";
    },[]);
    useEffect(() => {
        const subscription = watch((value,{ name }) => {
            if (name === "title") {
                setValue("slug",slugTransform(value.title),{ shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    },[watch,slugTransform,setValue]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title",{ required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug",{ required: true })}
                    onInput={(e) => {
                        setValue("slug",slugTransform(e.currentTarget.value),{ shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    required={!post}
                    {...register("image")}
                />
                <Select
                    options={["active","inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status",{ required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

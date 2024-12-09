import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import authService from "../appWrite/configure";
import Loading from "./Loading";

function PostCard({ $id, title, featuredImage }) {
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState('');

    useEffect(() => {
        authService.getFilePreview(featuredImage).then((data) => {
            setUrl(data.href);
            setLoading(false);
        });
    }, [featuredImage]);

    if (loading) {
        return <Loading />;
    }

    return (
        <Link to={`/post/${$id}`} className="block w-full">
            <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                <div className='w-full h-48 flex justify-center items-center overflow-hidden'>
                    <img src={url} alt={title} className='object-cover w-full h-full' />
                </div>
                <div className='p-4'>
                    <h2 className='text-xl font-bold mb-2'>{title}</h2>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;

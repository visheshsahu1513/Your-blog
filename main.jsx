import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Route, RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./store/store.js";
import { Provider } from "react-redux";
import AuthLayout from './components/AuthLayout.jsx'
import Login from "./components/Login.jsx";

import Home from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import AllPosts from './pages/AllPosts.jsx'
import Github from './pages/Github.jsx'
import Contact from "./pages/Contact.jsx";






const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "",
            element: <Home />,
        },
        {
            path: "login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "my-posts",
            element: (
                <AuthLayout authentication>
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "add-post",
            element: (
                <AuthLayout authentication>
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "post/:slug",
            element: <Post />,
        },
        {
            path: "github",
            element: <Github />,
        },
        {
            path: "contact",
            element: <Contact />,
        },
    ],
},
])
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store} >
        <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);

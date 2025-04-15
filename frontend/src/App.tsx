import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";

const Blogs = lazy(() => import("./pages/Blogs"));
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const Blog = lazy(() => import("./pages/Blog"));
const Create = lazy(() => import("./pages/Create"));

function App() {
  
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ToastContainer theme="dark" />
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/create" element={<Create />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App

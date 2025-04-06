import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";

const Blog = lazy(() => import("./pages/Blog"));
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));

function App() {
  
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ToastContainer theme="dark" />
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App

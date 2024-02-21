import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route,createBrowserRouter,createRoutesFromElements,RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout.jsx';
import ErrorBoundary from './Components/ErrorBoundary.jsx'

import HomeScreen from './Screens/Homescreen.jsx'
import LoginScreen from './Screens/Loginscreen.jsx'
import RegisterScreen from './Screens/Registerscreen.jsx'
import MyPostsScreen from './Screens/MyPostsscreen.jsx'
import TestScreen from './Screens/TestScreen.jsx'
import CreateNewPostScreen from './Screens/CreateNewPostScreen.jsx'
import PostViewScreen from './Screens/PostViewScreen.jsx'
import AdminRoutes from './Screens/Admin/AdminRoutes.jsx'
import AdminAllPostsScreen from './Screens/Admin/AdminAllPostsScreen.jsx'


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import store from "./store.js"
import { Provider } from 'react-redux'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path='' element={<HomeScreen />}></Route>
      <Route path='/login' element={<LoginScreen />}></Route>
      <Route path='/register' element={<RegisterScreen   />}></Route>
      <Route path='/profile' element={<MyPostsScreen />}></Route>
      <Route path='/post/:id' element={<PostViewScreen />}></Route>
      <Route path='/new' element={<CreateNewPostScreen />}></Route>
      {/* <Route path='admin' element={<AdminRoutes />}>

        <Route path='' element={<AdminAllPostsScreen />}></Route>
        <Route path='/post/:id' element={<PostViewScreen />}></Route>
      </Route> */}

      {/* <Route path='/admin' element={<AdminRoutes />}>
        <Route path='/' element={<AdminAllPostsScreen />} />
        <Route path='/post/:id' element={<PostViewScreen />} />
      </Route> */}

      <Route path='/admin' element={<AdminRoutes />}>
        <Route index element={<AdminAllPostsScreen />} />
        <Route path='post/:id' element={<PostViewScreen />} />
      </Route>


    </Route>
  ))


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // // <React.StrictMode>
  //   <App />
  // // </React.StrictMode>

      <>
    <Provider store={store}>
      <RouterProvider router={router} errorElement={<ErrorBoundary />} >

      </RouterProvider>
    </Provider>
</>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

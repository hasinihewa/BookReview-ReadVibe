import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import Landingpage from './components/userpage/Landingpage';
import LoginPage from './components/auth/LoginPage';
import RegistrationPage from './components/auth/RegistrationPage';
import UserService from './components/service/UserService';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/common/Sidebar';
import Profile from './components/userpage/profile';
import EditProfile from './components/userpage/EditProfile';
import UserDashboard from './components/userpage/User/UserDashboard';
import ReviewCard from './components/userpage/User/reviewCards';
import Reviewss from './components/userpage/User/reviews';
import Succcess from './components/userpage/User/success';
import Books from './components/userpage/User/Books';
import GetReviewForm from './components/userpage/User/GetReviewForm';
import PutReview from './components/userpage/User/PutReview';
import SampleReview from './components/userpage/User/dashComponent/SampleReview';





import EditReview from './components/userpage/User/editReview'

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSidebarCollapse = (isCollapsed) => {
    setIsSidebarCollapsed(isCollapsed);
  };
  return (
    <BrowserRouter>
      <div className="App flex">
        {UserService.isAuthenticated() && (
          <Sidebar onCollapse={handleSidebarCollapse} />
        )}
        <div
  className={`content transition-all duration-300`}
  style={{ 
    ...(UserService.isAuthenticated() 
      ? isSidebarCollapsed 
        ? { width: '97%', marginLeft: '3%' }
        : { width: '83.7%', marginLeft: '16.3%' }
      : { width: '100%', marginLeft: '0%' })
  }}
>
          <Routes>
            {!UserService.isAuthenticated() && (
              <>
                <Route path="/" element={<Landingpage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/editProfile/:userId" element={<EditProfile />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}

            <Route element={<ProtectedRoute />}>
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/register" element={<Navigate to="/" />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/editProfile/:userId" element={<EditProfile />} />

            
              {!UserService.isUser() ? (
                <>
                  <Route path="/profile" element={<Navigate to="/" />} />
                </>
              ) : (
                <>
                  <Route path="/dashboard" element={<UserDashboard />} />
                  <Route path="/admin/user-management" element={<Navigate to="/profile" />} />
                  <Route path="/update-user/:userId" element={<Navigate to="/profile" />} />
                  <Route path="/ReviewCard" element={<ReviewCard />} />
                  <Route path="/edit/:id" element={<EditReview />} />
                  <Route path="/reviews" element={<Reviewss />} />
                  <Route path="/success" element={<Succcess/>}/>
                  <Route path="/books" element={<Books />} />
                  <Route path="/getreview" element={<GetReviewForm />} />
                  <Route path="/putreview" element={<PutReview />} />
                  <Route path="/sampleReview" element={<SampleReview />} />
                  
                  





                                    
                </>
              )}
         
            </Route>
          </Routes>
        </div>
      </div>
      <div
        className={`content ${
          !UserService.isAuthenticated() ? "w-full" : "w-full"
        }`}
      >
      </div>
    </BrowserRouter>
  );
}

export default App;

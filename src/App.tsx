import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookingPage from "./pages/BookingPage";
import ReservationsPage from "./pages/ReservationsPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<BookingPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      
      />
    </>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Activities from './components/Activities';
import ActivityDetail from './components/ActivityDetail';
import Ganapathis32 from './components/Ganapathis32';
import BanquetHallsList from './components/BanquetHallsList.jsx';
import BanquetHallsDetail from './components/BanquetHallsDetail';
import IdolDetail from './components/IdolDetail';
import IdolsList from './components/IdolsList';
import Donation from './components/Donation';
import BlogDetail from './components/BlogDetail';
import Blog from './components/Blog';
import Login from './components/Login';
import BookingConfirmation from './components/BookingConfirmation';
import About from './components/About';
import Footer from './components/Footer';
import data from './data.json';

function App() {
  const [bookings, setBookings] = useState([]);
  const [donations, setDonations] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Load booking history
    const savedBookings = localStorage.getItem('templeBookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }

    // Load donation history
    const savedDonations = localStorage.getItem('templeDonations');
    if (savedDonations) {
      setDonations(JSON.parse(savedDonations));
    }

    // Load order history
    const savedOrders = localStorage.getItem('templeOrders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const addBooking = (booking) => {
    const bookingId = `BOOK${Date.now()}`;
    const newBooking = {
      ...booking,
      id: bookingId,
      bookingId: bookingId,
      date: new Date().toISOString().split('T')[0],
      status: 'Confirmed'
    };
    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem('templeBookings', JSON.stringify(updatedBookings));
    return newBooking;
  };

  const addDonation = (donation) => {
    const donationId = `DON${Date.now()}`;
    const newDonation = {
      ...donation,
      id: donationId,
      donationId: donationId,
      date: new Date().toISOString().split('T')[0],
      status: 'Completed'
    };
    const updatedDonations = [...donations, newDonation];
    setDonations(updatedDonations);
    localStorage.setItem('templeDonations', JSON.stringify(updatedDonations));
    return newDonation;
  };

  const addOrder = (order) => {
    const orderId = `ORD${Date.now()}`;
    const newOrder = {
      ...order,
      id: orderId,
      orderId: orderId,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing'
    };
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('templeOrders', JSON.stringify(updatedOrders));
    return newOrder;
  };

  const findBookingById = (id) => {
    const booking = bookings.find(b => b.id === id);
    if (booking) return { ...booking, type: 'booking' };
    
    const donation = donations.find(d => d.id === id);
    if (donation) return { ...donation, type: 'donation' };
    
    const order = orders.find(o => o.id === id);
    if (order) return { ...order, type: 'order' };
    
    return null;
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home data={data} />} />
          <Route path="/about" element={<About />} />
          <Route path="/activities" element={<Activities data={data} />} />
          <Route path="/activity/:id" element={<ActivityDetail data={data} onBooking={addBooking} />} />
          <Route path="/ganapathis32" element={<Ganapathis32 data={data} />} />
          {/* Banquet Halls Routes */}
          <Route path="/banquetHalls" element={<BanquetHallsList data={data} />} />
          <Route path="/banquetHalls/:id" element={<BanquetHallsDetail data={data} onBooking={addBooking} />} />
          {/* End Banquet Halls Routes */}
         <Route path="/idols/:id" element={<IdolDetail data={data} onOrder={addOrder} />} />
         <Route path="/idols" element={<IdolsList data={data} />} />
          <Route path="/donation" element={<Donation onDonation={addDonation} />} />
          <Route path="/blog" element={<Blog data={data} />} />
       <Route path="/blog/:id" element={<BlogDetail data={data} />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/booking-confirmation/:id" 
            element={<BookingConfirmation findBookingById={findBookingById} />} 
          />
        </Routes>
      </Layout>
      <Footer />
    </Router>
  );
}

export default App;
import React from 'react';
import Footer from '../components/Footer';
import Typingbox from '../components/Typingbox';
import Header from '../components/Header';

const HomePage = () => {
    return (
        <div className="canvas">
            <Header />
            <Typingbox />
            <Footer />
        </div>
    )
}

export default HomePage
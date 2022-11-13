import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import Layout from '../components/Layout/HomeLayout';

export default function Home() {
    return (
        <div>
            <Layout>
                <HeroSection />
            </Layout>
        </div>
    )
}

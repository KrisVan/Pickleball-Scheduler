import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Header } from '../components/Header/Header';
import { PickleballCalendar } from '../components/PickleballCalendar/PickleballCalendar';

const queryClient = new QueryClient();

export default function Home() {
    return(
        <div>
            <QueryClientProvider client={queryClient}>
                <h2>Home</h2>
                <Header />
                <PickleballCalendar />
            </QueryClientProvider>
        </div>
        
    )
}

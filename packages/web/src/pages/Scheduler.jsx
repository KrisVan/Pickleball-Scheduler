import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Header } from '../components/Header/Header';
import { PickleballCalendar } from '../components/PickleballCalendar/PickleballCalendar';

const queryClient = new QueryClient();

export default function Scheduler() {
    return(
        <div>
            <QueryClientProvider client={queryClient}>
                <h2>Scheduler</h2>
                <Header />
                <PickleballCalendar />
            </QueryClientProvider>
        </div>
        
    )
}

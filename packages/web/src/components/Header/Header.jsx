import React from 'react';
import { useQuery } from 'react-query';

export const Header = () => {
    const { isLoading, error, data } = useQuery('helloWorldData', () =>
        fetch('/api/hello').then((response) => response.json())
    );

    if (error) {
        return 'An error has occurred: ' + error.message;
    }

    return (
        <div>
            <h1>Pickleball Scheduler</h1>
            {error ? (
                <div>{'An error has occurred: ' + error.message}</div>
            ) : null}
            {isLoading
              ? <div>Loading...</div>
              : (
                <div>
                    <span>For the boys at Van Dyke Park:</span>
                    <span>{JSON.stringify(data)}</span>
                </div>
            )}
        </div>
    );
};

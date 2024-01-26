import { useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAxiosFunction from "../hooks/useAxiosFunction";

export default function About() {
    const axiosPrivate = useAxiosPrivate();

    useEffect (() => {
        let isMounted = true;
        const controller = new AbortController();
        
        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/api/users', {
                    signal: controller.signal
                });
                console.log(response.data);
            } catch (err) {
                console.error(err);
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    },[]);

    

    return(
        <div>
            <h2>About</h2>
            <h2>Testing</h2>

        </div>
    )
}

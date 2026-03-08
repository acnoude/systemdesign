import {useState, useEffect} from 'react';

interface Job{
    id: string;
    title: string;
    matchScore: string;
}

export function useJobMatches(url: string){
    const[data, setData] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = async ()=>{try{
            const response = await fetch('API Call');
            if (!response.ok){
                throw new Error(`HTTP error: ${response.status}`);
            }
            const result = await response.json();
            setData(result);
            setError(null);
        }catch(err){
            setError(err.message);
            setData(null);
        }finally{
            setLoading(false);
        }
    };
    fetchData();
        
    },[url]

    );

    return {data, loading};
}
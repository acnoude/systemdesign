import React from 'react';
import {useMemo} from 'react';
import { useJobMatches } from './CustomHook1';
function JobDashBoard(){
    const {data, loading} = useJobMatches('API Call');

    const topMatches = useMemo(()=>{
// It should filter 'data' to only include jobs where matchScore > 0.8
return data.filter(job => parseFloat(job.matchScore)>0.8)
    }, [data]);

    if(loading){
        return (<div> Loading...</div>);
    }
    return (
        <div>
        <h2> Top Job Matches</h2>
        {topMatches.map(job => <JobCard key = {job.id} job ={job}/>)}
        </div>
    );
    
}

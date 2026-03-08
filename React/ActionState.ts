import {useActionState} from '@react-stately/action';

async function uploadResumeAction(prevState: any, formData:FormData){
    const file = formData.get('resume');
    const response= await fetch('/api/upload',{method: 'POST',body: formData});
    return await response.json();
}

export function ResumeUpload(){
    // TASK: Initialize useActionState with the uploadResumeAction
  // Hint: const [state, formAction, isPending] = useActionState(uploadResumeAction, null);

  const [state,formAction,isPending] = useActionState(uploadResumeAction, null);
  return(
    <form action={formAction}>
    <input type ="hidden" name="jobId" value="job_123_abc"/>
    <input type ="file" name = "resume" required/>
    <button type="submit" disabled={isPending}>
    {isPending? 'Uploading': "Upload Resume"}
    </button>
    {/* Accessing the 'state' returned by the action */}
    {state?.success && <p> Match score:{state.score}%</p>}
    </form>
  );

}
import {create} from 'zustand';

interface UseStore{
    userName: string|null;
    isAuthenticated: boolean;
    login: (name:string) => void;
    logout: () => void;
}

export const useUserStore= create<UseStore>((set)->{
    userName : null;
    isAuthenticated: false;

    login : (name:string)=> set({userName: name , isAuthenticated: true}),

    logout: () => set({userName: null, isAutheticated: false}),
});


// 1. We have a simple store
const useMatchScore = create((set) => ({
    latestScore =0,
    setScore:(score) => set({latestScore: score}),
}));

// 2. We use our React 19 Action

function ResumeUpload(){
    const setScore = useMatchScore((state)=> state.setScore);
    async function clientAction(formData: FormData){
        const result = await uploadResumeAction(null, formData);
        if(result.success){
            setScore(result.score);
        }
    }

    return(
        <form action={clientAction}>
        <input type = "file" name = "resume"/>
        <button type="submit">Upload & match </button>
        </form>
    );
}
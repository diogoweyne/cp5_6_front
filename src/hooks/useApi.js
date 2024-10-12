import { useState } from "react";

export default function useApi(){
    const [currentTarget, setCurrentTarget] = useState(null);

    return{
        currentTarget, setCurrentTarget
    }
}
'use client';
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import { logOutAction } from '@/actions/users';

function LogOutButton() {
    const router= useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogOut = async() =>{
        setLoading(true)
        
        //await new Promise((resolve)=>setTimeout(resolve,2000));

        const{errorMessage}= await logOutAction();

        //const errorMessage=null;

        if (!errorMessage){
            toast("You have been successfully logged out")
            router.push("/");
        }else{
            toast("errorMessage")
        }

        setLoading(false);
        console.log("Logging out...");
    };
  return (
    <Button 
    variant="outline"
    onClick={handleLogOut}
    className="w-24">{loading ? <Loader2 className="Animate-spin"/>:"Log Out"}</Button>
  )
}

export default LogOutButton
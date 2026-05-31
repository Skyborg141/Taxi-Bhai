import { createContext, useEffect, useState } from "react";
import app from "../../firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export const TaxiContextManagement = createContext(null)
// WhatEver push context in the taxiContext, it holds the value and return children whenever it is called

const TaxiContext = ({children}) => {
//    userInformation
// state is used to store  the user Information in the context.Initially in the system , user is null.
const[user,setUser] = useState(null)
// loader state is used to store a loading dial , initially it is true,means neccessary info is not come yet, so we will wait for the info, if info is our hand , it becomes false,means no need to wait, we can do next steps.
const[loader,setLoader] = useState(true)

// create user with email and password
const createUser = (email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password)
}

// sign in with registered email and password
const signIn = (email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)
}

// update UserProfile
const updateUser = (name,profileLink)=>{
    return updateProfile(auth.currentUser,{
        displayName:name,photoURL:profileLink
    })
}

// signIn with Google
const googleSignIn =()=>{
    return signInWithPopup(auth,provider)
}

// logout
const logOut =()=>{
    return signOut(auth)
}

// user state Tracking through userEffect
// userEffect continously observe the chnages , if any chnages happens , it perform his sideEffect

useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth,(user)=>{
        setUser(user)
        if(user){
            setLoader(false)
            const user_email = {email:user.email}
            console.log(user_email);
        }
        else{
            console.log("no user in the system.");
            setLoader(false)
        }
    })
    return ()=>{
        return unSubscribe()
    }
})




// values will be stored in the objects
let value ={user,createUser,signIn,updateUser,googleSignIn,logOut,loader}
return(
    <TaxiContextManagement.Provider value={value}>
        {children}
    </TaxiContextManagement.Provider>
)
};

export default TaxiContext;
import React from 'react'
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const useAuthStatus = () => {

    const auth = getAuth()
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setLoggedIn(true)
            }
            setCheckingStatus(false)
        })
    })

  return {loggedIn, checkingStatus}
}

export default useAuthStatus

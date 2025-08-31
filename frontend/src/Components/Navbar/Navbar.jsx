import React, { useEffect } from 'react'
import styles from "./styles.navbar.module.css"
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { getAboutUser } from '@/config/redux/action/authAction';
import { reset } from '@/config/redux/reducer/authReducer';


export default function NavbarComponent() {
    const router = useRouter();
    const authState=useSelector((state)=> state.auth)

    const dispatch=useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && !authState.profileFetched) {
            dispatch(getAboutUser({token}));
        }
    }, [dispatch, authState.profileFetched]);


    return (
        <div className={styles.container}>
            <nav className={styles.navBar}>
                <h1 style={{cursor:"pointer"}}
                    onClick={() => {
                        router.push("/")
                    }}>
                    Pro Connect
                </h1>

                <div className={styles.navBarOptionContainer}>

                    {authState.profileFetched && <div>
                        <div style={{display:"flex", gap: "1.2rem"}}>
                            {/* <p>Hey, {authState.user.userId.name}</p> */}
                            <p onClick={()=>{
                                router.push("/profile")
                            }} style={{fontWeight: "bold" ,cursor: "Pointer"}}>Profile</p>

                            <p onClick={()=>{
                                localStorage.removeItem("token")
                                dispatch(reset())
                                router.push("/login");
                            }}  style={{fontWeight: "bold" ,cursor: "Pointer"}}>Logout</p>
                        </div>
                        
                        
                        </div>}

                    {!authState.profileFetched &&  <div style={{cursor:"pointer"}}
                        onClick={() => {
                            router.push("/login")
                        }}
                        className={styles.buttonJoin}>
                        <p >Be a part</p>
                    </div>}
                    
                </div>
            </nav>
        </div>
    )
}

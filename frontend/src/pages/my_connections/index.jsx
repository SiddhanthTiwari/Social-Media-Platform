import UserLayout from '@/layout/UserLayout'
import React, { useEffect } from 'react'
import DashboardLayout from '@/layout/DashboardLayout'
import { useDispatch, useSelector } from 'react-redux'
import { AcceptConnection, getMyConnectionRequests } from '@/config/redux/action/authAction';
import { BASE_URL } from '@/config';
import styles from "./connection.module.css";
import { useRouter } from 'next/router';

export default function connection() {

    const router = useRouter();

    const dispatch = useDispatch();

    const authState = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getMyConnectionRequests({ token: localStorage.getItem("token") }));
    }, [])

    useEffect(() => {

        if (authState.connectionRequest.length !== 0) {
            console.log(authState.connectionRequest)
        }
    }, [authState.connectionRequest])
    

    return (
        <UserLayout>
            <DashboardLayout>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "1.7rem" }}>
                    <h4>My Connections</h4>


                    {authState.connectionRequest.length === 0 && <h1>No Connection Request Pending</h1>}

                    {authState.connectionRequest.length != 0 && authState.connectionRequest.filter((connection) => connection.status_accepted === null).map((user, index) => {
                        return (
                            <div onClick={() => {
                                router.push(`/view_profile/${user.userId.username}`)
                            }} className={styles.useCard} key={index}>
                                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                                    <div className={styles.profilePicture}>
                                        <img src={`${BASE_URL}/${user.userId.profilePicture}`} alt='picture' />
                                    </div>
                                    <div className={styles.userInfo}>
                                        <h3>{user.userId.name}</h3>
                                        <p>{user.userId.username}</p>
                                    </div>
                                    <button onClick={async(e) => {
                                        e.stopPropagation();

                                        await dispatch(AcceptConnection({
                                            connectionId: user._id,
                                            token: localStorage.getItem("token"),
                                            action: "accept"
                                        }));
                                        dispatch(getMyConnectionRequests({ token: localStorage.getItem("token") }));
                                    }} className={styles.connectedButton}>Accept</button>
                                </div>
                            </div>
                        )
                    })}

                    <h4>My Networks</h4>
                    
                    {authState.connectionRequest.filter((connection) => connection.status_accepted !== null).map((user, index) => {
                    return (
                        <div onClick={() => {
                            router.push(`/view_profile/${user.userId.username}`)
                            }} className={styles.useCard} key={index}>
                                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                                    <div className={styles.profilePicture}>
                                        <img src={`${BASE_URL}/${user.userId.profilePicture}`} alt='picture' />
                                    </div>
                                    <div className={styles.userInfo}>
                                        <h3>{user.userId.name}</h3>
                                        <p>{user.userId.username}</p>
                                    </div>

                                </div>
                            </div>
                    )
                        
                    })}
                </div>
            </DashboardLayout>
        </UserLayout>
    )
}

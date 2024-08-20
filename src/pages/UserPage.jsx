// import React, { useEffect, useState } from "react";
// import { auth, db } from "../firebaseConfig";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useNavigate } from "react-router-dom";
// import { CircularProgress } from "@mui/material";

// const UserPage = () => {

//     const [data, setdata] = useState([]);
//     const [user , loading]=useAuthState(auth);
//     const navigate=useNavigate();

//     const fetchUserData = () => {
//         const resultsRef = db.collection('Result');
//         const { uid } = auth.currentUser;
//         let tempData=[];
//         resultsRef.where('userid', '==', uid).get().then((snapshot) => {
//            snapshot.docs.forEach((doc)=>{
//             tempData.push({...doc.data()});
//            });
//            setdata(tempData);
//         });

//     };

//     useEffect(() => {
//         if(!loading){
//             fetchUserData();
//         }
//         if(!loading && !user){
//             navigate('/');
//         }
//     }, [loading])

//     if(loading){
//         return <CircularProgress/>
//     }
//     return (
//         <div>
//             <div>userpage</div>
//         </div>
//     )
// }
// export default UserPage;

import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import TableforuserData from "../components/TableforuserData";
const UserPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const { uid } = user; // Safely destructure user.uid
                console.log('User ID:', uid); // Verify the user ID

                try {
                    const resultRef = db.collection("Result");
                    const snapshot = await resultRef.where('userid', '==', uid).get();

                    console.log('Query snapshot:', snapshot.empty ? 'No documents' : snapshot.docs.map(doc => doc.data()));

                    if (snapshot.empty) {
                        console.log('No matching documents.');
                        setData([]);
                    } else {
                        const results = snapshot.docs.map((doc) => ({
                            ...doc.data()
                           
                        }))
                         setData(results);
                        console.log('Fetched results:', results);
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setData([]);
                } finally {
                    setLoading(false);
                }
            } else {
                console.log('No user is currently logged in.');
                setData([]);
                navigate('/');
                setLoading(false);
            }
        });

        // Clean up subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <div>
            <h1>User Page</h1>
            {/* {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {data.length > 0 ? (
                        <ul>
                            {data.map((item, index) => (
                                <li key={index}>{JSON.stringify(item)}</li>
                            ))}
                        </ul>
                    ) :
                        // <p>No data found</p> 
                        <p></p>
                    }
                </div>
            )} */}
            <div className="canvas">
                <TableforuserData data={data}/>
            </div>
        </div>
    );
}

export default UserPage;

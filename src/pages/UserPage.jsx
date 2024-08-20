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
import Graph from "../components/Graph";
import UserInfo from "../components/UserInfo";


const UserPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [graphData, setGraphData] = useState([]);
    const navigate = useNavigate();

    const formatDate = (TimeStamp) => {
        console.log('Timestamp:', TimeStamp); // Check the structure
        if (TimeStamp && TimeStamp.toDate instanceof Function) {
            return TimeStamp.toDate().toLocaleDateString();
        }
        if (TimeStamp && TimeStamp.seconds) {
            return new Date(TimeStamp.seconds * 1000 + TimeStamp.nanoseconds / 1000000).toLocaleString();
        }
        return "Date not available";
        console.log(data);
    };


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const { uid } = user; // Safely destructure user.uid
                console.log('User ID:', uid); // Verify the user ID

                try {
                    const resultRef = db.collection("Result");
                    const snapshot = await resultRef.where('userid', '==', uid)
                        .orderBy('TimeStamp', 'desc').get();

                    console.log('Query snapshot:', snapshot.empty ? 'No documents' : snapshot.docs.map(doc => doc.data()));

                    if (snapshot.empty) {
                        console.log('No matching documents.');
                        setData([]);
                        setGraphData([]); // Ensure graphData is also cleared
                    } else {
                        const results = snapshot.docs.map((doc) => ({
                            ...doc.data()
                            // return {
                            //     ...data,
                            //     TimeStamp: data.TimeStamp ? data.TimeStamp.toDate() : new Date(), // Ensure TimeStamp is a Date object
                            // };
                        }));

                        // results.sort((a, b) => b.TimeStamp - a.TimeStamp);
                        // Process data for graph
                        const tempGraphData = results.map((item) => [
                            formatDate(item.TimeStamp),
                            item.wpm
                        ]);

                        setData(results);
                        setGraphData(tempGraphData.reverse());
                        console.log('Fetched results:', results);
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setData([]);
                    setGraphData([]); // Ensure graphData is cleared on error
                } finally {
                    setLoading(false);
                }
            } else {
                console.log('No user is currently logged in.');
                setData([]);
                setGraphData([]); // Ensure graphData is cleared when no user is logged in
                navigate('/');
                setLoading(false);
            }
        });

        // Clean up subscription on unmount
        return () => unsubscribe();
    }, [navigate]);

    if (loading) {
        return <div className="center-of-screen"><p  size={300}>Loading...</p></div>
        
    }

    return (
        <div>
          
            <div className="canvas">
                <UserInfo totaltesttaken={data.length} />
                <div className="graph-user-page">
                    <Graph graphdata={graphData} />
                </div>

                <TableforuserData data={data} />
            </div>
        </div>
    );
}

export default UserPage;

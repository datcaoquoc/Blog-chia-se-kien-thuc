import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
// import '../css/login.css';
function Home(props) {
    const cookies = new Cookies();
    // const [data, setData] = useState({ hits: [] });
    let history = useHistory();
    // axios.interceptors.response.use(
    //     (response) => {
    //     },
    //     async (error) => {

    //         if (error.response.statusText === "Unauthorized") {
    //             const abc = cookies.get('tokenRefresh');
    //             await axios.post('http://localhost:3800/auth/generationToken', {
    //                 headers: {
    //                     'Authorization': `Bearer ${abc}`
    //                   }
    //             })
    //             .then((respone) => {
    //                 console.log(respone.data.message)
    //             }).catch(error => {
    //                 console.log("error")
    //             })
    //         }
    //     }

    // );

    // useEffect(async () => {
    //     const abc = cookies.get('tokenaccess');
    //     const result = await axios.get('http://localhost:3800/trang-chu',
    //         {
    //             headers: {
    //                 'Authorization': `Bearer ${abc}`
    //             }
    //         });
    //     setData(result);
    //     console.log(data)
    // });
    // useEffect(async () => {
    //     const abc = cookies.get('tokenaccess');
    //     await axios.get('http://localhost:3800/trang-chu', {
    //         headers: {
    //             'Authorization': `Bearer ${abc}`
    //           }
    //     })
    //     .then((res) => {
    //         console.log("res")
    //     }).catch(error => {
    //         console.log("error")
    //     })
    //   })

    return (
        <div>
           <h2 color="#000 !important">trang chủ</h2>

            
        </div>
    );
}

export default Home;
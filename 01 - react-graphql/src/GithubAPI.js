import { useEffect, useState } from 'react'
import axios from 'axios'

//* Fetch method hr browser support nhi krta,, so hmain axios use krni chahiye bcoz mostly browsers isko support krty

const api = axios.create({
    // ! base url is starting point of your API
    baseURL: 'https://api.github.com'
});

function GithubAPI() {

    const [userData, setUserData] = useState(null)
    const [userRepos, setUserRepos] = useState(null)

    // componentDidMount
    useEffect(() => {
        // ? hm asl me apna kam async fucntion me krna chah rhy,, ar hmain wo call bi krwana pry ga.. so hmain IIFE use krna pry ga
        // Immediately Invoked Function Expression - IIFE
        (async () => {
            //! destruturing data and also renaming it,, ho skta data already variable apny khi use kiya ho..
            const { data: user } = await api.get('/users/uqutub')
            console.log('user ', user)
            setUserData(user);      // update state of the userData

            const { data: repo } = await api.get('/users/uqutub/repos')
            console.log('repos: ', repo)
            setUserRepos(repo);     // update state of the userRepos
        })()
    }, [])

    return (
        <div>
            {/* here we are using pre for presentaion of data*/}
            <pre>      
                {/* data show krwany k liye stringify me convert krna pra.. */}
                {userData && JSON.stringify(userData, null, 4)}
            </pre>
            <hr />
            <pre>
                {userRepos && JSON.stringify(userRepos, null, 4)}
            </pre>
        </div>
    );
}

export default GithubAPI;

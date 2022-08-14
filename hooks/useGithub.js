import axios from 'axios';
import React, { useState } from 'react';

const useGithub = () => {
    const [repositories, setRepositories] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [isFirstFetch, setIsFirstFetch] = useState(true);

    const searchRepositories = (param = "hetkansara") => {
        setIsFetching(true);
        setIsFirstFetch(false);
        axios({
            method: 'get',
            url: `https://api.github.com/search/repositories?q=${param}`,
        })
        .then((response) => {
            if(response?.data?.items?.length) {
                setRepositories(response.data.items)
            } else {
                setRepositories([])
            }
            setIsFetching(false);
        }).catch((error) => {
            console.log("Fetch error", error)
            setRepositories([])
            setIsFetching(false);
        });
    }

    return {
        isFetching,
        isFirstFetch,
        repositories, 
        searchRepositories
    };
}

export default useGithub;
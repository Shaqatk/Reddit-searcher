//exports this to index.js
export default {
    // this is the search funtion in which lies the fetch funtion. This reutrns fetch contents
    search: function (searchterm, searchlimit, sortby) {
        // all the inputs we got from index.js

        // fetch reddit api(?q= means query=)
        return fetch(`http://www.reddit.com/search.json?q=' ${searchterm}&sort=${sortby}&limit=${ searchlimit}`)
            //results from search in json
            .then(res => res.json())
            //data from res.json()    
            .then(data => data.data.children.map(data => data.data))
            //catch error
            .catch(err => console.log(err));
    }
}

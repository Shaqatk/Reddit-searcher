//import reddit.js file
import reddit from './redditapi';


var searchform = document.getElementById('searchform');
var searchinput = document.getElementById('searchinput');

// listen for form submission of search button clicked
searchform.addEventListener('submit', e => {
    e.preventDefault();

    //get seach term
    const searchterm = searchinput.value;

    //get any input with name sortby and is checked.then get value
    const sortby = document.querySelector('input[name="sortby"]:checked').value;

    //get limit
    const serachlimit = document.getElementById('limit').value;

    //check input not empty
    if (searchterm === '') {
        //show message functio if empty
        showmessage('Please add a  search term', 'alert-danger');
    }

    //clear input box
    searchinput.value = '';

    //Search Reddit. using search funtion in it and giving it these 3 values /////
    reddit.search(searchterm, serachlimit, sortby)
        // because this^^ returns a promise
        .then(results => {
        console.log(results);
            //output div tag
            let output = '<div class="card-columns">';
            //loop through results
            results.forEach(post => {
    //check for images becausesome dont have preview
    // if image preview array exist use it otherwise use reddit logo/ url
        const image= post.preview ? post.preview.images[0].source.url:'http://www.info24android.com/wp-content/uploads/2017/10/Les-meilleurs-clients-Reddit-pour-iPhone-et-iPad.jpg';
                
                
                output += `
<div class="card">
<img class="card-img-top" src="${image}" alt="Card image cap">
<div class="card-body">
<h5 class="card-title">${post.title}</h5>
<p class="card-text">${shorttext(post.selftext,100)}</p>
<a href="${post.url}" target="_blank" class="btn btn-primary">Read More...</a>
<hr>
<span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
<br>
<span class="badge badge-dark">Score: ${post.score}</span>
</div>
</div>`});

// target="_blank" to open new tab
//hr tag is a line break

            //ending div tag
            output += '</div>';
        
        //output to results div
document.getElementById('results').innerHTML=output;
        });

});

//show message if input empty
function showmessage(message, className) {
    //create div
    const div = document.createElement('div');
    //Add classes
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(message));
    //get parent container (searchcon)
    const searchcontainer = document.getElementById('searchcon');
    // get search
    const search = document.getElementById('search');

    //insert message before search div
    searchcontainer.insertBefore(div, search);

    //timeout alert
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}


//shorten text AKA truncate
function shorttext(text,limit){
    // so it cuts of text  afte a space not in the middle of a word
    const short= text.indexOf(' ',limit);
    if(short == -1) return text;
    
    return text.substring(0,short);
}
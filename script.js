// NOTES: make empty card and clone entire node on command? or: create html elements on command
// for ten at time -- set count to ten, increment by ten on forEach (would for loop be better??) loop for item display? use slice to control array listing visibility & internalCount to stop each ten?
// CHILDREN is the ARRAY


// FUNCTIONS

// post card generation function
function cardGenerator(post){
    // generate all card elements -- div, title, image, and link to OP
    const card = document.createElement("div");
    card.setAttribute("class", "card");

    // create card title and insert into card
    const cardTitle = document.createElement("h2");
    cardTitle.setAttribute("class", "card-title");
    cardTitle.innerText = post.data.title;
    card.appendChild(cardTitle);

    // create card image and insert into card if image exists
    if (post.data.thumbnail){
        const cardImage = document.createElement("img");
        cardImage.setAttribute("class", "card-image");
        cardImage.setAttribute("alt", "broken image");
        cardImage.src = post.data.thumbnail;
        card.appendChild(cardImage); 
    }
        

    // create link to OP on card bottom
    const cardLink = document.createElement("a");
    cardLink.setAttribute("href", "https:reddit.com" + post.data.permalink);
    cardLink.innerText = "View Original Post";
    card.appendChild(cardLink);


    // insert entire card onto screen
    postCardEl.appendChild(card);
    // for each in return array but only up to ten. on function call, increment next ten
    // count += 10;
    // console.log(count);

}

// loading function
function loading(){
    const loadingEl = document.createElement("p");
    loadingEl.setAttribute("class", "loading")
    loadingEl.innerText = "Patience, grasshopper...";
    document.body.appendChild(loadingEl);
}

// VARIABLES
let count = 0;

// CAPTURE HTML ELEMENTS
const postCardEl = document.querySelector(".post-card");
const form = document.querySelector("form");
let subredditInput = document.querySelector("#reddit-input");
// delete below if not used. is this necessary?
let subredditInputValue = subredditInput.value;

// delete below if not used
let button = document.querySelector("button");





// get data from diff subredit
function getSubredditData(subredditInput){
    fetch(`https://www.reddit.com/r/${subredditInput}/.json`).then((response) => {
        // whilst loading
        loading();
        return response.json();
    }).then((responseData) => {
        const redditPosts = responseData.data.children;
        redditPosts.forEach((post) => {
            cardGenerator(post);
        });
        console.log(redditPosts);
    });
}
// getSubredditData(subredditInput = "aww");
getSubredditData(subredditInput);

// get input data from user to generate new subreddit display
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData();
    getSubredditData(formData.get(subredditInput.value));

    // getSubredditData(subredditInput);
    console.log(subredditInput.value);
})



// fetch("https://www.reddit.com/r/aww/.json").then((response) => {
//     // for loading
//     loading();
//     // returning the response in json format 
//     return response.json();
// }).then((responseData) => {
//     const redditPosts = responseData.data.children;
//     redditPosts.forEach((post) => {
//         cardGenerator(post);
//         // possibly put the children[10]
//     });
//     // making cards per array item up to ten @ time 
    
//     // for (let internalCount = 0; internalCount < 10; internalCount++){
//     //     redditPosts[count].data.forEach(cardGenerator());
//     // }


// });


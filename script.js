// FUNCTIONS

//card generation function
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
    if (post.data.thumbnail.includes("https:")){
        const cardImage = document.createElement("img");
        cardImage.setAttribute("class", "card-image");
        cardImage.setAttribute("alt", "broken image");
        cardImage.src = post.data.thumbnail;
        card.appendChild(cardImage);
        card.style["height"] = "375px"; 
    }
        
    // create link to OP on card bottom that opens in new tab
    const cardLink = document.createElement("a");
    cardLink.setAttribute("href", "https:reddit.com" + post.data.permalink);
    cardLink.setAttribute("target", "blank");
    cardLink.innerText = "View Original Post";
    card.appendChild(cardLink);

    // insert entire card onto screen
    postCardEl.appendChild(card);

}

// loading function
function loading(){
    loadingEl.setAttribute("class", "loading")
    loadingEl.innerText = "Patience, grasshopper...";
    document.body.appendChild(loadingEl);
}

// loadED function
const loaded = () => loadingEl.innerText = "";

// get data from diff subredit && calls function to display on screen
function getSubredditData(subredditInput){
    fetch(`https://www.reddit.com/r/${subredditInput}/.json`).then((response) => {
        // whilst loading
        loading();
        return response.json();
    }).then((responseData) => {
        loaded();
        const redditPosts = responseData.data.children;
        
        // to display only ten at a time on screen
        while (internalCount < 10) {

            // to prevent error being thrown on nextTen button click if there aren't enough posts to populate 10 cards
            if (count >= redditPosts.length){
                alert("End of the line, buckaroo.");
                break;
            };

            cardGenerator(redditPosts[count]);
            internalCount++;
            count++
        };
        
        console.log(subredditInput);
        incrementDisplay = subredditInput;
        console.log(redditPosts.length);
        console.log(count);
        
    });
}

// VARIABLES
let count = 0;
let internalCount = 0;
const formData = new FormData();
let incrementDisplay = "";

// capture HTML elements
const postCardEl = document.querySelector(".post-card");
const form = document.querySelector("form");
let subredditInput = document.querySelector("#reddit-input");
const loadingEl = document.createElement("p");
let nextTenButton = document.querySelector(".next-ten");

// initial function call to default to build spec
getSubredditData("aww");

// get input data from user to generate new subreddit display
form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    //resets counts for proper page display 
    internalCount = 0;
    count = 0;

    //resets page instead of adding onto end each time
    postCardEl.innerHTML = null; 
    const formData = new FormData();
    formData.append("subredditInput", subredditInput.value)
    getSubredditData(formData.get('subredditInput'));

    // for incrementing card set on screen to next ten in array
    incrementDisplay = subredditInput.value
    
})

nextTenButton.addEventListener("click", (event) => {
    event.preventDefault();
    loading();

    //resets counts & card section for proper page display 
    internalCount = 0;
    postCardEl.innerHTML = null; 

    getSubredditData(incrementDisplay);
    loaded();

})





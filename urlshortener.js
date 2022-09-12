const shortenButton = document.getElementById("shorten");
const shortenThisUrl = document.getElementById("shortenThisUrl");
const newUrlContainer = document.querySelector(".urlHolder");

const copyButton = document.querySelectorAll(".copyMe");
const newUrlToCopy = document.querySelector(".newURL");

shortenButton.addEventListener("click", () => {
    console.log(shortenThisUrl.value);
    fetch(`https://api.shrtco.de/v2/shorten?url=${shortenThisUrl.value}`)
    .then(response => {
        return response.json();
    })
    .catch(error => console.log(error))
    .then(data => {
        console.log(data)
        newShortURL()

        function newShortURL() {
            //creates the div
            let newDiv = document.createElement("div");
            newDiv.className = "urlGenerated";
            //appends new div to container
            newUrlContainer.appendChild(newDiv)
            //creates div within new div
            let newUrlText = document.createElement("div");
            newUrlText.className = "urlText"
            newDiv.appendChild(newUrlText)
            //now we add the p elements to populate data in the div
            let ogUrl = document.createElement("p");
            ogUrl.className = "ogURL";
            ogUrl.innerHTML = shortenThisUrl.value;
            newUrlText.appendChild(ogUrl)
            let newUrl = document.createElement("p");
            newUrl.className = "newURL";
            newUrl.innerHTML = `${data.result.full_short_link}`;
            newUrlText.appendChild(newUrl)
            //now we add the button to copy
            let newButton = document.createElement("button");
            newButton.className = "copyMe";
            newButton.innerHTML = "Copy";
            newDiv.appendChild(newButton)
        }
    })
})

copyButton.forEach(btn => {
    btn.addEventListener("click", () => {
        console.log("click")
    })
})
// copyButton.addEventListener("click", () => {
//     navigator.clipboard.writeText(newUrlToCopy.value)
//     console.log(newUrlToCopy)
// })
const shortenButton = document.getElementById("shorten");
const shortenThisUrl = document.getElementById("shortenThisUrl");
const newUrlContainer = document.querySelector(".urlHolder");

const mobileNav = document.getElementById("mobileNav");
const mobileTab = document.querySelector(".mobileSlide");

const copyContainer = document.querySelector(".urlHolder");
const copyButton = document.querySelector(".copyMe");
const newUrlToCopy = document.querySelector(".newURL");

mobileNav.addEventListener("click", () => {
    mobileTab.classList.toggle("mobileActive");
})

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

            newButton.addEventListener("click", (e) => {
                // Since this element is dynamically created, we need to delegate the action so we're using target
                if (e.target.classList.contains("copyMe")) {
                    navigator.clipboard.writeText(newUrl.innerHTML)
                    console.log(newUrl.innerHTML)
                    newButton.classList.add("copied")
                    newButton.innerHTML = "Copied!"
                } else {
                    console.log("couldn't copy")
                }
            })
        }
    })
})

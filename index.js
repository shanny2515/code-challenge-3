const endPoint = "http://localhost:3000/Blogs"
const list = document.getElementById("blog-list")
const details = document.getElementById("blog-details")
const form = document.getElementById("form")
const addPostBtn = document.getElementById("add post-btn")

fetch(endPoint)
.then(res => res.json())
.then(blogs => {
    if(blogs.length === 0){
        return details.innerHTML = " <p>No blogs yet </p>"
    }
    list.innerHTML = "";
    const countHeader = document.createElement("h6");
    countHeader.textContent = `Total Blogs: ${blogs.length}`;
    list.appendChild(countHeader)

blogs.forEach(blog => {
    const item = document.createElement('div')
    item.innerHTML = `
    <strong>${blog.name}</strong>
    <p>${blog.author}</p>
    `
    item.style.cursor = "pointer"
    item.onclick = () => blogDetails(blog)
    list.appendChild(item);
})
blogDetails(blogs[0])
})
function blogDetails(blog){
  details.innerHTML = `
    <h2>${blog.name}</h2>
    <button id = "edit-btn">Edit</button>
    <button id = "delete-btn">delete</button>
    <p><em>Author: ${blog.author}</em></p>
    <img src="${blog.imageUrl}" alt="${blog.name}" style="max-width: 100%; height: auto;" />
    <p>${blog.description}</p>
  `;
}

addPostBtn.addEventListener('click', function () {
 if( form.style.display === 'none' || form.style.display === ''){
    form.style.display = 'block'
 } else {
    form.style.display = 'none'
 }  
})
form.addEventListener('submit',function (e){
    e.preventDefault()
    const formData = new FormData(form)
    const thePost = {}
    formData.forEach(value, key)
    thePost[key]= value
})
pushData(thePost)
const pushData = (Object => {
    fetch(endpi)
})



 
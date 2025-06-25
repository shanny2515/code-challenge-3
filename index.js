const endPoint = "http://localhost:3000/Blogs"
const list = document.getElementById("blogList")
const details = document.getElementById("blogDetails")
const form = document.getElementById("form")
const addPostBtn = document.getElementById("addPostBtn")
const editForm = document.getElementById("edit-post-form")

fetch(endPoint)
.then(res => res.json())
.then(blogs => {
    if(blogs.length === 0){
        return details.innerHTML = " <p>No blogs yet </p>"
    }
    list.innerHTML = "";
    const countHeader = document.createElement("h6");
    countHeader.innerHTML = `<em id="how">${blogs.length} posts:</em>`;
    list.appendChild(countHeader)

blogs.forEach(blog => {
    const item = document.createElement('div')
    item.innerHTML = `
    <div class ="p-1" style = "margin-left:10px">
    <strong style ="">${blog.name}</strong>
    <p>${blog.author}</p>
    </div>
    `
    item.style.cursor = "pointer"
    item.dataset.id = blog.id; 
    item.onclick = () => blogDetails(blog)
    list.appendChild(item);
})
blogDetails(blogs[0])
})
function blogDetails(blog){
    const currentlySelected = list.querySelector('.selected');
  if (currentlySelected) {
    currentlySelected.classList.remove('selected');
  }
  const newItemToSelect = list.querySelector(`div[data-id="${blog.id}"]`);
  if (newItemToSelect) {
    newItemToSelect.classList.add('selected');
  }
  details.innerHTML = `
    <div class ="blog-header">
     <h2>${blog.name}</h2>
    <div class="button-group">
      <button class="editBtn btn btn-sm btn-primary">Edit</button>
      <button class="deleteBtn btn btn-sm btn-danger">Delete</button>
    </div>
    </div>
    <p><em>Author: ${blog.author}</em></p>
    <img src="${blog.imageUrl}" alt="${blog.name}" />
    <p>${blog.description}</p>
  `;
  details.querySelector('.deleteBtn').onclick = () => {
    confirm("Are you sure you want to delete?")
    deleteBlog(blog.id , details)
}
details.querySelector('.editBtn').onclick = () => 
    editBlog(blog);
    details.style.cursor = 'pointer';
}

addPostBtn.addEventListener('click', function () {
 if( form.style.display === 'none' || form.style.display === ''){
    form.style.display = 'block'
    document.getElementById("addPostBtn").scrollIntoView({behaviour : 'smooth'})
 } else {
    form.style.display = 'none'
 }  
})
const resetBtn = document.getElementById("reset")
resetBtn.addEventListener('click', () => {
      form.style.display = 'none';
      window.scrollTo({top:0, behaviour : 'smooth'})
  });
  
form.addEventListener('submit',function (e){
    e.preventDefault()
    const title = form.elements['name'].value.trim()
    const author = form.elements['author'].value.trim()
    const imageUrl = form.elements['imageUrl'].value.trim()
    const description = form.elements['description'].value.trim()

    if(title === "" || author === "" || imageUrl === "" || description === ""){
        alert ("Please fill in the whole form")
    }else {
    const formData = new FormData(form)
    const thePost = {}
    formData.forEach((value, key) => {
        thePost[key]= value;
    })
    pushData(thePost)
}
})
const pushData = (object) => {
    fetch(endPoint,{
    method : "POST", 
    headers :{
        "content-type":"application/json"
    }, 
    body:JSON.stringify(object)  
    })
    .then(response => response.json())
    .then(() =>{
        form.reset();
        form.style.display = 'none';
    })
    .catch(error => console.log(error))
}

function deleteBlog( id, details){
    fetch(`${endPoint}/${id}`, {method : 'DELETE'})
    .then(res =>{
        if(res.ok){
            details.remove();
        }else{
            alert('failed to delete blog')
        }
    })
}
 let editingBlogId = null;
function editBlog(blog){
    editingBlogId = blog.id;
    editForm.style.display = 'block';
  editForm.elements['name'].value = blog.name;
  editForm.elements['author'].value = blog.author;
  editForm.elements['imageUrl'].value = blog.imageUrl;
  editForm.elements['description'].value = blog.description;
  editForm.scrollIntoView({behaviour: 'smooth'})
}
editForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const blogData = {
        name:editForm.elements['name'].value.trim(),
        author: editForm.elements['author'].value.trim(),
        imageUrl: editForm.elements['imageUrl'].value.trim(),
        description: editForm.elements['description'].value.trim()
    }
    if(!blogData.name || !blogData.author || !blogData.imageUrl || !blogData.description){
        return alert ("please fill in the whole form")
    }
    if(editingBlogId){
        fetch(`${endPoint}/${editingBlogId}`,{
            method:"PUT",
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(blogData)
        })
        .then(res => res.json())
        .then(data =>{
            form.reset();
            form.style.display = 'none';
            editingBlogId= null;
            fetchBlogs();
        })
    }
})
const cancelBtn = document.getElementById("cancel-edit")
cancelBtn.addEventListener('click', () =>{
            editForm.style.display = 'none';
            window.scrollTo({ top :0 , behaviour:'smooth'})

})


 
let container = document.getElementById('productsContainer');

fetch('/api/products').then(result=>result.json()).then(json=>{
    products = json;
    products.forEach(product=>{
        let card = document.createElement('div')
        card.setAttribute('class','productCard');
        let id = document.createElement('p');
        id.setAttribute('class','productText');
        id.innerHTML = product.id;
        let title = document.createElement('p');
        title.setAttribute('class','productText');
        title.innerHTML= product.title;
        let price = document.createElement('p');
        price.setAttribute('class','productText');
        price.innerHTML = product.price;
        let img = document.createElement('img');
        img.src = product.thumbnail;
        card.append(id);
        card.append(title);
        card.append(price);
        card.append(img);
        container.append(card);
    })
})

let form = document.getElementById('form')

const handleSubmit = (evt,form,route) =>{
    evt.preventDefault();
    let formData = new FormData(form)
    fetch(route,{
        method:"POST",
        body:formData
    }).then(result=>result.json()).then(json=>console.log(json))
    form.reset();
}

form.addEventListener('submit',(e)=>handleSubmit(e,e.target,'/api/products'))

let toggleProducts = document.getElementById('toggleProducts');

const handleToggle = () =>{
    if(container.style.display === 'none'){
        container.style.display = 'grid';
        toggleProducts.innerHTML = 'Hide Products'
    }
    else{
        container.style.display = 'none'
        toggleProducts.innerHTML = 'View Products'
    }
}

toggleProducts.addEventListener('click',handleToggle)
let container = document.getElementById('productsContainer');

fetch('/products').then(result=>result.json()).then(json=>{
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


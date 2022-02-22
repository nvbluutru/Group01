const renderProductFirst = (infoProduct) => {
    const productMaster = getEle("#render-master");
    const discount = infoProduct.price * ((100 - infoProduct.promotion) / 100);
    productMaster.innerHTML = `
    <div class="compare__products--img">
        <img src="${infoProduct.imageThumb}" alt="">
        </div>
        <div class="compare__desc">
            <div class="compare__price">Giá tiền <span>${fomatVnd(discount)}</span></div>
            <a href="../page/view_detail.html?id=${infoProduct.id}" class="compare__detail">Xem chi tiết</a>
    </div>
    `;
}
const renderCarouselProducts = (data) => {
    const product = new Products;
    const eleProduct = getEle("#render-products");
    const contentHTML = data.map((item) => {
        const discount = item.price * ((100 - item.promotion) / 100);
        return `<div class="products__item item">
        <div class="products__discount">
        Discount ${item.promotion}%
        </div>
        <div class="products__img">
            <a href="./view_detail.html?id=${item.id}">
                <img src=" ${item.imageThumb}" alt="">
            </a>
        </div>
        <h3 class="products__title"><a href="#">${product.overFolow(item.name, 29)}</a></h3>
        <div class="products__price">
            <span>${fomatVnd(discount)}</span>
            <span>${fomatVnd(item.price)}</span>
        </div>
        <div class="products__note">${product.overFolow(item.specifications.material, 30)}</div>
        <div class="products__evaluate">
            <div class="products__star">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
            </div>
            <span>${item.evaluate.length} evaluate</span>
            <div class="products__add" data-id="${item.id}"><i class="fa fa-cart-plus"></i></div>
        </div>
        <button class="compare__button" data-id="${item.id}">Product comparison</button>
    </div>`;
    }).join("");
    eleProduct.innerHTML = contentHTML;
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 6
            }
        }
    })
}
const setLocalStorage = (arr) => {
    localStorage.setItem("compare-product", JSON.stringify(arr));
}
const renderCompare = (data, obj) => {
    let product = new Products;
    let eleResult = getEle("#render-compare");
    let name = ``;
    let size = ``;
    let mass = ``;
    let loadBearing = ``;
    let material = ``;
    let attach = ``;
    let sameProvince = ``;
    let otherProvince = ``;
    let time = ``;
    let warrantyVoucher = ``;
    let price = ``;
    let dataLocalStorage = product.getLocalStorage("compare-product");
    let info = dataLocalStorage.map((item) => {
        return data.find(p => p.id == item);
    })
    info.unshift(obj);
    info.forEach((item) => {
        const discount = item.price * ((100 - item.promotion) / 100);
        name += `<td>${item.name}</td>`
        size += `<td>Length ${item.specifications.length}cm x Width ${item.specifications.width}cm x Height ${item.specifications.height}cm</td>`;
        mass += `<td>${item.specifications.mass}</td>`;
        loadBearing += `<td>${item.specifications.loadBearing}</td>`;
        material += `<td>${item.specifications.material}</td>`;
        attach += `<td>${item.specifications.attach}</td>`;
        sameProvince += `<td>${item.specifications.deliveryTime.sameProvince}</td>`;
        otherProvince += `<td>${item.specifications.deliveryTime.otherProvince}</td>`;
        time += `<td>${item.specifications.insurance.time}</td>`;
        warrantyVoucher += `<td>${item.specifications.insurance.warrantyVoucher}</td>`;
        price += `<td class="text-danger text-center item">${fomatVnd(discount)}<a href="./view_detail.html?id=${item.id}"><button class="compare__button" data-id="4">Detail</button></a></td>`
    });
    let content = `<tr>
    <th>Product's name</th>
    ${name}
</tr>
<tr>
    <th>Size</th>
    ${size}
</tr>
<tr>
    <th>Mass</th>
    ${mass}
</tr>
<tr>
    <th>Load, bearing</th>
    ${loadBearing}
</tr>
<tr>
    <th>Material</th>
    ${material}
</tr>
<tr>
    <th>Attach</th>
    ${attach}
</tr>
<tr>
    <th>Ho Chi Minh City</th>
    ${sameProvince}
</tr>
<tr>
    <th>Other provinces</th>
    ${otherProvince}
</tr>
<tr>
    <th>Warranty period</th>
    ${time}
</tr>
<tr>
    <th>Warranty voucher</th>
    ${warrantyVoucher}
</tr>
<tr>
    <th style="vertical-align: middle;">Price</th>
    ${price}
</tr>
`;
    eleResult.innerHTML = content;
}
const removeProduct = (event, data, idFirst) => {
    let product = new Products;
    const id = event.target.dataset.id;
    const infoProduct = product.findItemId(idFirst, data);
    let dataLocalStorage = product.getLocalStorage("compare-product");
    const indexDel = dataLocalStorage.findIndex(item => item == id);
    console.log(indexDel, dataLocalStorage);
    dataLocalStorage.splice(indexDel, 1);
    setLocalStorage(dataLocalStorage);
    renderProductsCp(data);
    renderCompare(data, infoProduct);
}

const renderProductsCp = (data) => {
    let product = new Products;
    const dataLocalStorage = product.getLocalStorage("compare-product");
    const products = getEle(".compare__suggest");
    if (dataLocalStorage.length > 0) {
        const content = dataLocalStorage.map((item) => {
            const itemProduct = data.find(product => product.id == item);
            return `<div class="compare__suggest--item">
            <img src="${itemProduct.imageThumb}"
                alt="">
            <div class="compare__suggest--name">${itemProduct.name}</div>
            <i class="fa fa-trash compare__sugest--del" data-id="${itemProduct.id}"></i>
        </div>`;
        }).join("");
        products.innerHTML = content;
    } else {
        products.innerHTML = `No product found!`;
    }
    const deleteProduct = document.querySelectorAll(".compare__sugest--del");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    deleteProduct.forEach((item) => {
        item.addEventListener("click", (event) => { removeProduct(event, data, id) });
    });
}
const addProductCompare = (event, data, id) => {
    let product = new Products;
    const idProduct = event.target.dataset.id;
    const infoProduct = product.findItemId(id, data);
    if (idProduct != id) {
        const findID = data.find(item => item.id == idProduct);
        const status = localStorage.getItem("compare-product");
        const arrId = product.getLocalStorage("compare-product");
        if (arrId.length == 6) {
            return;
        }
        if (findID) {
            if (!status || status == "undefined") {
                arrId.push(idProduct);
                setLocalStorage(arrId);
            } else {
                let statusId = arrId.findIndex(item => item == idProduct);
                if (statusId == -1) {
                    arrId.push(idProduct);
                    setLocalStorage(arrId);
                }
            }
            renderProductsCp(data);
            renderCompare(data, infoProduct);
        } else {
            console.log("Error not find ID on the system");
        }
    } else {
        console.log("Products already exist in the comparison section");
    }
}
const mainCompare = async () => {
    const product = new Products;
    const post = await fetch("https://nvbluutru.github.io/Group01/js/data/data.json");
    const data = await post.json();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    const infoProduct = product.findItemId(id, data.products);
    renderProductFirst(infoProduct);
    renderCarouselProducts(data.products);
    renderProductsCp(data.products);
    const buttonCompare = document.querySelectorAll(".compare__button");
    buttonCompare.forEach((item) => {
        item.addEventListener("click", (event) => { addProductCompare(event, data.products, id) });
    });
    renderCompare(data.products, infoProduct);

}
mainCompare();
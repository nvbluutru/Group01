const renderProductFirst = (infoProduct,) => {
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
            Giảm ${item.promotion}%
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
            <span>${item.evaluate.length} đánh giá</span>
            <div class="products__add" data-id="${item.id}"><i class="fa fa-cart-plus"></i></div>
        </div>
        <button class="compare__button" data-id="${item.id}">So sánh sản phẩm</button>
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
const removeProduct = (event, data) => {
    let product = new Products;
    const id = event.target.dataset.id;
    let dataLocalStorage = product.getLocalStorage("compare-product");
    const indexDel = dataLocalStorage.findIndex(item => item == id);
    console.log(indexDel, dataLocalStorage);
    dataLocalStorage.splice(indexDel, 1);
    setLocalStorage(dataLocalStorage);
    renderProductsCp(data);
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
        products.innerHTML = `Không tìm thấy sản phẩm nào!`;
    }
    const deleteProduct = document.querySelectorAll(".compare__sugest--del");
    deleteProduct.forEach((item) => {
        item.addEventListener("click", (event) => { removeProduct(event, data) });
    });
}
const addProductCompare = (event, data) => {
    let product = new Products;
    const idProduct = event.target.dataset.id;
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
    } else {
        console.log("lỗi không tìm thấy id trên hệ thống");
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
        item.addEventListener("click", (event) => { addProductCompare(event, data.products) });
    });
}
mainCompare();
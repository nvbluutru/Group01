const renderOrderProducts = (data) => {
    const products = new Products;
    let dataLocalStorage = products.getLocalStorage("shopping-cart");
    const renderHTML = getEle("#render-products");
    let total = 0;
    const contentHTML = dataLocalStorage.map((item) => {
        const findID = data.find(product => product.id == item.id);
        const discount = findID.price * item.quantity * ((100 - findID.promotion) / 100);
        total += discount;
        return `<div class="product">
        <div class="product__img"><img src="${findID.imageThumb}" alt=""></div>
        <div class="product__info">
        <i class="fa fa-trash product__info--delete" data-id="${item.id}"></i>
            <h3 class="product__header">${findID.name}
            </h3>
            <div class="product__add">
            <div class="products__price">
                <span>${fomatVnd(discount)}</span>
                <span>${fomatVnd(findID.price * item.quantity)}</span>
            </div>
                <div class="product__button" data-id="${item.id}">
                    <input class="btn btn-secondary count-prev" type="button" value="-">
                    <input class="btn btn-secondary" type="button" value="${item.quantity}">
                    <input class="btn btn-secondary count-next" type="button" value="+">
                </div>
            </div>
        </div>
    </div>`;
    }).join("");
    renderHTML.innerHTML = contentHTML;
    getEle("#render-total").innerHTML = fomatVnd(total);
    document.querySelectorAll(".product__info--delete").forEach((item) => {
        item.addEventListener("click", (event) => {
            products.removeShoppingCart(event, data);
            renderOrderProducts(data);
        })
    })
    document.querySelectorAll(".product__button .count-prev").forEach((item) => { item.addEventListener("click", (event) => { setCountCart(event, false, data) }) });
    document.querySelectorAll(".product__button .count-next").forEach((item) => { item.addEventListener("click", (event) => { setCountCart(event, true, data) }) });
}
const setCountCart = (event, next, data) => {
    const products = new Products;
    const id = event.target.parentElement.dataset.id;
    let dataLocalStorage = products.getLocalStorage("shopping-cart");
    let itemFind = dataLocalStorage.findIndex(item => item.id == id);
    if (itemFind != -1) {
        if (next) {
            dataLocalStorage[itemFind].quantity++;
        } else {
            dataLocalStorage[itemFind].quantity > 1 ? dataLocalStorage[itemFind].quantity-- : 1;
        }
        products.setLocalStorage(dataLocalStorage);
    }
    renderOrderProducts(data);
    products.renderShoppingCart(data);
}
const mainOrder = async () => {
    const product = new Products;
    const post = await fetch("https://nvbluutru.github.io/Eproject_Group01/js/data/data.json");
    const data = await post.json();
    product.renderShoppingCart(data.products);
    product.countOrder();
    renderOrderProducts(data.products);
}
mainOrder();
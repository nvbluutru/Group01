const main = async () => {
    const product = new Products;
    const post = await fetch("https://nvbluutru.github.io/Eproject_Group01/js/data/data.json");
    const data = await post.json();
    product.renderProducts(data.products, getEle("#products"));
    product.productsFlashSale(data.products);
    const inputSearch = getEle("#search-products");
    const buttonAddCart = document.querySelectorAll(".products__add");
    inputSearch.addEventListener("keyup", (event) => { product.renderSearch(event, data.products) });
    buttonAddCart.forEach(item => item.addEventListener("click", (event) => { product.addShoppingCart(event, data.products) }));
}
main();

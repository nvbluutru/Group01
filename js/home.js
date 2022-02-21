const main = async () => {
    const product = new Products;
    const post = await fetch("https://nvbluutru.github.io/Group01/js/data/data.json");
    const data = await post.json();
    product.renderProducts(data.products, getEle("#products"));
    product.productsFlashSale(data.products);
    const buttonAddCart = document.querySelectorAll(".products__add");
    buttonAddCart.forEach(item => item.addEventListener("click", (event) => { product.addShoppingCart(event, data.products) }));
}
main();

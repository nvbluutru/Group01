const mainShopping = async () => {
    const product = new Products;
    const post = await fetch("https://nvbluutru.github.io/Eproject_Group01/js/data/data.json");
    const data = await post.json();
    product.renderShoppingCart(data.products);
    product.countOrder();
    const buttonViewCart = getEle("#view-cart");
    buttonViewCart.addEventListener("click", product.changeActiveCart);
    const closeButtonViewCart = document.querySelectorAll("#closeCart, .shopping__black");
    closeButtonViewCart.forEach(item => item.addEventListener("click", product.changeActiveCart));
}
mainShopping();
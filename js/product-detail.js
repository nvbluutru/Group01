const renderImgDetail = (obj) => {
    const renderImg = getEle("#render-img");
    const renderSmall = getEle("#render-small");
    const content = obj.listImage.map((item, i) => {
        return `<div class="carousel-item ${i == 0 ? "active" : ""}">
            <img src="${item}" class="d-block w-100" alt="...">
    </div > `
    }).join("");
    const contentImgSmall = obj.listImage.map((item, i) => {
        return `<li data-target="#carouselExampleIndicators" data-slide-to="${i}" ${i == 0 ? "class='active'" : ""}>
            <img src="${item}" alt="">
        </li>`
    }).join("");
    renderImg.innerHTML = content;
    renderSmall.innerHTML = contentImgSmall;
}
const findItemId = (id, data) => {
    return data.find(item => item.id == id);
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
            <a href="./page/view_detail.html?id=${item.id}">
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
        <button>So sánh sản phẩm</button>
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
                items: 5
            }
        }
    })
}
const renderInformation = (obj, data) => {
    const discount = obj.price * ((100 - obj.promotion) / 100);
    const product = new Products;
    document.querySelectorAll("#render-name").forEach(item => item.innerHTML = obj.name.toUpperCase());
    document.querySelectorAll("#render-size").forEach(item => item.innerHTML = `Dài ${obj.specifications.length}cm x Rộng ${obj.specifications.width}cm x Cao ${obj.specifications.height}cm`);
    document.querySelectorAll("#render-mass").forEach(item => item.innerHTML = obj.specifications.mass);
    document.querySelectorAll("#render-loadBearing").forEach(item => item.innerHTML = obj.specifications.loadBearing);
    document.querySelectorAll("#render-material").forEach(item => item.innerHTML = obj.specifications.material);
    document.querySelectorAll("#render-attach").forEach(item => item.innerHTML = obj.specifications.attach);
    getEle("#new-price").innerHTML = fomatVnd(discount);
    getEle("#old-price").innerHTML = fomatVnd(obj.price);
    getEle("#render-desc").innerHTML = fomatVnd(obj.description);
    getEle("#render-sameProvince").innerHTML = fomatVnd(obj.specifications.deliveryTime.sameProvince);
    getEle("#render-otherProvince").innerHTML = fomatVnd(obj.specifications.deliveryTime.otherProvince);
    getEle("#render-time").innerHTML = fomatVnd(obj.specifications.insurance.time);
    getEle("#render-warrantyVoucher").innerHTML = fomatVnd(obj.specifications.insurance.warrantyVoucher);
    getEle(".buying").dataset.id = obj.id;
    const highlight = getEle("#render-highlight");
    const highlightHTML = obj.highlights.map((item) => {
        return `<li>${item}</li>`;
    }).join("");
    highlight.innerHTML = highlightHTML;
    const colorHTML = obj.color.map((item) => {
        return `<div class="price__setting__boder">
        <p><span>${item.name}</span></p>
        <span class="price__circle" style="background-color: ${item.style}"></span>
    </div>`
    }).join("");
    getEle(".price__setting").innerHTML = colorHTML;
    getEle(".buying").addEventListener("click", (event) => {
        product.addShoppingCart(event, data);
    })
}
const renderComment = (data) => {
    const renderComment = getEle("#render-comment");
    const content = data.evaluate.map((item) => {
        let star = "";
        for (let i = 0; i < item.star; i++) {
            star += `<i class="fa fa-star"></i>`;
        }
        return `<div class="comment__all">
        <div class="comment__row">
            <p><span class="font">P</span>${item.name}</p>
            <p class="time"><i class="fa fa-clock"></i> 1 ngày trước</p>
        </div>

        <div class="comment__bottom">
            <p><span>Đánh giá</span>${star}</p >
    <div class="cmt">
        <p><span>Nhận xét : </span>${item.comment}</p>
        <p class="cmt__input">Bình Luận</p>
    </div>
        </div >

    <div class="comment">
        <div class="ask">
            <div class="comment__mess">
                <input class="input_first" type="input"
                    placeholder="Xin mời để lại review về sản phẩm, Cellphone xin chân thành cảm ơn quý khách ">
                    <button class="send"><i class="fa fa-paper-plane"></i>Gửi</button>
            </div>

        </div>
    </div>

    </div > `
    }).join("");
    renderComment.innerHTML = content;
}
const mainDetail = async () => {
    const product = new Products;
    const post = await fetch("https://nvbluutru.github.io/Eproject_Group01/js/data/data.json");
    const data = await post.json();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    const infoProduct = findItemId(id, data.products);
    renderImgDetail(infoProduct);
    renderInformation(infoProduct, data.products);
    renderCarouselProducts(data.products);
    renderComment(infoProduct)
    const buttonAddCart = document.querySelectorAll(".products__add");
    buttonAddCart.forEach(item => item.addEventListener("click", (event) => { product.addShoppingCart(event, data.products) }));
}
mainDetail();
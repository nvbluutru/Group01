const getEle = (selector) => {
    return document.querySelector(selector);
}
const fomatVnd = (price) => {
    return price.toLocaleString('vi', { style: 'currency', currency: 'VND' });
}
window.addEventListener("DOMContentLoaded", function () {
    const loader = getEle(".lds-wrapper");
    loader.classList += " active"; // class "loader hidden"
});
let headerContent = getEle(".header__content");
$(window).scroll(() => {
    if ($("body,html").scrollTop() > 40) {
        headerContent.classList.add("active-mobile");
    } else {
        headerContent.classList.remove("active-mobile");
    }
})
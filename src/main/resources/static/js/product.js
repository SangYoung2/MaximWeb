
// 제품 슬라이드 효과
let slides = document.querySelector('.slides'); //전체 슬라이드 컨테이너
let slideImg = document.querySelectorAll('.slides li'); //모든 슬라이드들
let currentIdx = 0; //현재 슬라이드 index
let slideCount = slideImg.length; // 슬라이드 개수
const prev = document.querySelector('.prev'); //이전 버튼
const next = document.querySelector('.next'); //다음 버튼
const slideWidth = 200; //한개의 슬라이드 넓이
const slideMargin = 100; //슬라이드간의 margin 값
const slideSize = (slideWidth + slideMargin)

//전체 슬라이드 컨테이너 넓이 설정
slides.style.width = ((slideSize * slideCount) - slideSize * 3) + 'px';
let maxCurrentIndex = (slideCount % 3) === 0 ? ((slideCount / 3) - 1) : Math.trunc(slideCount / 3);
let slideRun = true;

function prevSlide(num) {
    if (slideRun){
        slideRun = false;
        slides.style.left = -num * (slideSize * 3) + 'px';
        currentIdx = num;
        setTimeout(function (){slideRun = true}, 500);
    }
}

function nextSlide(num) {
    if (slideRun){
        slideRun = false;
        if((slideCount % 3) !== 0 && currentIdx === maxCurrentIndex - 1){
            slides.style.left = -(((num-1) * (slideSize * 3)) + ((slideSize) * (slideCount % 3))) + 'px';
        }
        else {
            slides.style.left = -num * (slideSize * 3) + 'px';
        }
        currentIdx = num;
        setTimeout(function (){slideRun = true}, 500);
    }
}

prev.addEventListener('click', function () {
    /*첫 번째 슬라이드로 표시 됐을때는
    이전 버튼 눌러도 아무런 반응 없게 하기 위해
    currentIdx !==0일때만 moveSlide 함수 불러옴 */
    if (currentIdx !== 0) prevSlide(currentIdx - 1);
});

next.addEventListener('click', function () {
    /* 마지막 슬라이드로 표시 됐을때는
    다음 버튼 눌러도 아무런 반응 없게 하기 위해
    currentIdx !==slideCount - 1 일때만
    moveSlide 함수 불러옴 */
    if (currentIdx !== maxCurrentIndex) {
        nextSlide(currentIdx + 1);
    }
});

// product 클릭시 아래 제품 설명이 바뀌는 효과
const brandMenu = document.querySelectorAll('.submenu li')
const product = document.querySelector('.product');
let productImg = product.querySelector('img');
let productName = product.querySelector("h2");
let productInfo = product.querySelector('p');

const urlParams = new URL(location.href).searchParams;
const getCategory = urlParams.get('category');

if(getCategory === 'maxim'){
    brandMenu[0].classList.add('select')
    product_list_get()
}else if(getCategory === 'kanu'){
    brandMenu[1].classList.add('select')
    product_list_get()
}else {
    brandMenu[2].classList.add('select')
    product_list_get()
}

function reset_slide(){
    slides = document.querySelector('.slides'); //전체 슬라이드 컨테이너
    slideImg = document.querySelectorAll('.slides li'); //모든 슬라이드들
    slideCount = slideImg.length; // 슬라이드 개수
    slides.style.width = ((slideSize * slideCount) - slideSize * 3) + 'px';
    maxCurrentIndex = (slideCount % 3) === 0 ? ((slideCount / 3) - 1) : Math.trunc(slideCount / 3);
    slides.style.left = '0';
    currentIdx = 0;
    productImg = product.querySelector('img')
    productName = product.querySelector("h2")
    productInfo = product.querySelector('p')
}

function product_list_get(){
    fetch('/js/product.json')
        .then(response => response.json())
        .then(value => {
            create_product_list(value)
            reset_slide();
            create_product_info(value);
        })
        .catch(reason => console.log(reason))
}

function create_product_info(e){
    brandName = document.querySelector('.submenu li.select').getAttribute('name');
    switch (brandName){
        case 'maxim':
            e = e.maxim
            break;

        case 'kanu':
            e = e.kanu
            break;

        case 'top':
            e = e.top
            break;
    }
    [...slideImg].forEach((x,index) => {
        productImg = product.querySelector('img')
        productName = product.querySelector("h2")
        productInfo = product.querySelector('p')

        x.onclick = () => {
            productImg.setAttribute('src', `/img/product/${brandName}/${e[index].no}.png` )
            productImg.setAttribute('alt', `"${brandName}_product_img${e[index].no}"` )
            productName.innerText = e[index].name;
            productInfo.innerText = e[index].value;
        }
    });
}

function create_product_list(e){
    brandName = document.querySelector('.submenu li.select').getAttribute('name');
    slides.innerHTML = '';
    switch (brandName){
        case 'maxim':
            e = e.maxim
            break;

        case 'kanu':
            e = e.kanu
            break;

        case 'top':
            e = e.top
            break;
    }
    for (const data of e) {
        slides.insertAdjacentHTML('beforeend', '' +
            `<li><img src="/img/product/${brandName}/${data.no}.png" alt="${brandName}_product_img${data.no}"></li>`)
    }
    productImg.setAttribute('src', `/img/product/${brandName}/${e[0].no}.png` )
    productImg.setAttribute('alt', `"${brandName}_product_img${e[0].no}"` )
    productName.innerText = e[0].name;
    productInfo.innerText = e[0].value;
}






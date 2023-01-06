// hambuger 클릭 시 효과
const input = document.querySelector('#hambuger input')
const main_menu = document.querySelector('.menu_on');
const header = document.querySelector('header')
input.addEventListener('click', () => {
    main_menu.classList.toggle('active');
    if (main_menu.classList.contains('active') === true) {
        header.style.background = 'none';

    }
    else {
        header.style.background = '';
    }
})

maxim_product_get(0);

// 제품 슬라이드 효과
let slides = document.querySelector('.slides'); //전체 슬라이드 컨테이너
let slideImg = document.querySelectorAll('.slides li'); //모든 슬라이드들
let currentIdx = 0; //현재 슬라이드 index
let slideCount = slideImg.length; // 슬라이드 개수
const prev = document.querySelector('.prev'); //이전 버튼
const next = document.querySelector('.next'); //다음 버튼
const slideWidth = 200; //한개의 슬라이드 넓이
const slideMargin = 100; //슬라이드간의 margin 값

//전체 슬라이드 컨테이너 넓이 설정
slides.style.width = (slideWidth + slideMargin) * (slideCount) + 'px';
let maxCurrentIndex = (slideCount % 3) === 0 ? ((slideCount / 3) - 1) : Math.trunc(slideCount / 3);

function moveSlide(num) {
    slides.style.left = -num * 900 + 'px';
    currentIdx = num;
}

prev.addEventListener('click', function () {
    /*첫 번째 슬라이드로 표시 됐을때는
    이전 버튼 눌러도 아무런 반응 없게 하기 위해
    currentIdx !==0일때만 moveSlide 함수 불러옴 */

    if (currentIdx !== 0) moveSlide(currentIdx - 1);
});

next.addEventListener('click', function () {
    /* 마지막 슬라이드로 표시 됐을때는
    다음 버튼 눌러도 아무런 반응 없게 하기 위해
    currentIdx !==slideCount - 1 일때만
    moveSlide 함수 불러옴 */
    if (currentIdx !== maxCurrentIndex) {
        moveSlide(currentIdx + 1);
    }
});

// product 클릭시 아래 제품 설명이 바뀌는 효과
const brandMenu = document.querySelectorAll('.submenu li')
let brandName = document.querySelector('.submenu li.select')
const products = document.querySelector('.product');
const productImg = products.querySelector('img');
const productName = products.querySelector('h2');
const productText = products.querySelector('p');

console.log(products);

[...brandMenu].forEach((x, index) => {
    x.onclick = () => {
        [...brandMenu].forEach(x=>{x.classList.remove('select')});
        x.classList.add('select')
        maxim_product_get(index);
    }
})


function maxim_product_get(e){
    const request = new XMLHttpRequest();
    request.open('GET', '/js/product.json')
    request.responseType = "json";
    request.send();
    request.onload = () => {
        const data = request.response
        switch (e){
            case 0:
                create_maxim_product_list(data.maxim);
                break;

            case 1:
                create_kanu_product_list(data.kanu)
                break;

            case 2:
                create_top_product_list(data.top)
                break;
        }
        reset_slide();
    };
}

function create_maxim_product_list(e){
    slides.innerHTML = '';
    products.innerHTML = '';
    for (const data of e) {
        slides.insertAdjacentHTML('beforeend', '' +
            `<li><img src="/img/product/maxim/${data.no}.png" alt="maxim_product_img${data.no}"></li>`)
    }
    products.insertAdjacentHTML('beforeend', '' +
        `                <img src="/img/product/Maxim/${e[0].no}.png" alt="maxim_product_img${e[0].no}">\n` +
        '                <div class="product_text">\n' +
        `                    <h2>${e[0].name}</h2>\n` +
        '                    <p>\n' +
        `                      ${e[0].value}\n` +
        '                    </p>\n' +
        '                </div>')

}

function create_kanu_product_list(e){
    slides.innerHTML = '';
    products.innerHTML = '';
    for (const data of e) {
        slides.insertAdjacentHTML('beforeend', '' +
            `<li><img src="/img/product/kanu/${data.no}.png" alt="maxim_product_img${data.no}"></li>`)
    }
    products.insertAdjacentHTML('beforeend', '' +
        `                <img src="/img/product/kanu/${e[0].no}.png" alt="maxim_product_img${e[0].no}">\n` +
        '                <div class="product_text">\n' +
        `                    <h2>${e[0].name}</h2>\n` +
        '                    <p>\n' +
        `                      ${e[0].value}\n` +
        '                    </p>\n' +
        '                </div>')
}

function create_top_product_list(e){
    slides.innerHTML = '';
    products.innerHTML = '';
    for (const data of e) {
        slides.insertAdjacentHTML('beforeend', '' +
            `<li><img src="/img/product/top/${data.no}.png" alt="maxim_product_img${data.no}"></li>`)
    }
    products.insertAdjacentHTML('beforeend', '' +
        `                <img src="/img/product/top/${e[0].no}.png" alt="maxim_product_img${e[0].no}">\n` +
        '                <div class="product_text">\n' +
        `                    <h2>${e[0].name}</h2>\n` +
        '                    <p>\n' +
        `                      ${e[0].value}\n` +
        '                    </p>\n' +
        '                </div>')
}

function reset_slide(){
    slides = document.querySelector('.slides'); //전체 슬라이드 컨테이너
    slideImg = document.querySelectorAll('.slides li'); //모든 슬라이드들
    slideCount = slideImg.length; // 슬라이드 개수
    slides.style.width = (slideWidth + slideMargin) * (slideCount) + 'px';
    maxCurrentIndex = (slideCount % 3) === 0 ? ((slideCount / 3) - 1) : Math.trunc(slideCount / 3);
    slides.style.left = '0';
    currentIdx = 0;
    brandName = document.querySelector('.submenu li.select')
    console.log(brandName.getAttribute('name'));
}

// console.log(products);
[...slideImg].forEach((x, index) => {
    const request = new XMLHttpRequest();
    request.open('GET', '/js/product.json')
    request.responseType = "json";
    request.send();
    request.onload = () => {
        const data = request.response
        x.onclick = () => {
            productImg.setAttribute('src', `/static/img/product/${brandName}/${data.no}.png`)
            productName.innerHTML = data.maxim[index].name;
            productText.innerHTML = data.maxim[index].value;
        }
    };
})

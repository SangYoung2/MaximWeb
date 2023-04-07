// ===== productSection JS =====
const productInfo = document.getElementsByClassName('product_info');
const productMenu = document.querySelectorAll('.product_menu > li');
const productImg = document.querySelectorAll('.product_img > img');

// 브랜드명을 클릭하면 해당 브랜드의 대표 제품 사진과 설명이 바뀜
[...productMenu].forEach((x, index) => {
    x.onclick = () => {
        [...productMenu].forEach(x => {x.classList.remove('on')});
        [...productInfo].forEach(x => {x.classList.remove('on')});
        [...productImg].forEach(x => {x.classList.remove('on')});
        productMenu[index].classList.add('on')
        productInfo[index].classList.add('on')
        productImg[index].classList.add('on')
    }
})

// ===== historySection JS =====
const historyBox = document.getElementsByClassName('history_box');
const historyTextBox = document.getElementsByClassName('history_text_box');
const since = document.getElementsByClassName('since')

// history section 가로 아코디언을 클릭했을 때 페이지 전환 (클릭 후 1초동안 다른페이지를 눌러도 전환x)
let historyPageOn = true; // history section 의 기능이 제대로 동작 되었는지의 유무
[...historyBox].forEach((x, index) => {
    x.onclick = () => {
        if(historyPageOn){
            historyPageOn = false;
            [...historyBox].forEach(x => {x.classList.remove('on')});
            [...historyTextBox].forEach(x => {x.classList.remove('on')});
            [...since].forEach(x => {x.classList.remove('on')});
            historyBox[index].classList.add('on');
            historyTextBox[index].classList.add('on');
            since[index].classList.add('on');
            setTimeout(function () {historyPageOn = true;}, 1000)
        }
    }
})

/*===== newsSection JS =====*/
const newsBox = document.querySelector('.news_box')

get_news()

function get_news(){
    fetch("js/news&media.json")
        .then(response => response.json())
        .then(value => create_news(value.news.reverse()))
        .catch(reason => console.log(reason))
}


function create_news(e){
    newsBox.innerHTML = '';
    for (let i = 0; i < 8; i++) {
        newsBox.insertAdjacentHTML('beforeend',
            `
            <a href="/detail?category=news&num=${e[i].no - 1}" class="news_card">
                <img src="/img/news/thumbnail/${e[i].no}.jpg" alt="news_img">
                <h3>${e[i].title}</h3>
            </a> 
        `)
    }
}

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

const newsNo = document.querySelector('.news_no').innerHTML;
const news = document.querySelector('.news')

news_content_get(newsNo);

function news_content_get(no){
    const request = new XMLHttpRequest();
    request.open('GET', '/js/news.json')
    request.responseType = "json";
    request.send();
    request.onload = () => {
        const data = request.response;
        console.log(data.news[no]);
        create_news_content(data.news[no]);
    };
}

function create_news_content(e){
    news.innerHTML = '';
    news.insertAdjacentHTML('beforeend', '' +
        `<h1 class="title">${e.title}</h1>\n` +
        `<p class="since">${e.date}</p>\n` +
        `<div class="img_box"><img src="/img/news/content/${e.no}.jpg" alt="news_img" class="news_img"></div>\n` +
        `<h2 class="sub_title">${e.sub_title}</h2>\n` +
        '<div class="lead_box">\n'+
        '</div>\n' +
        `<p class="content">${e.content}</p>`)

    const leadBox = document.querySelector('.lead_box')
    for (let i = 0; i < e.lead.length; i++) {
        leadBox.insertAdjacentHTML('beforeend','' +
            `<h4 class="lead">${e.lead[i]}</h4>\n`)
    }

}
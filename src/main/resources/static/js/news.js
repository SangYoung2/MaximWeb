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


new_list_get();

// content 생성 기능
const contentsBox = document.querySelector('.contents_box')
const index = document.querySelector('.index')
let indexNum = document.querySelectorAll('.num')
let contentsCard = document.querySelectorAll('.card')
let contentsLength = 0;

function new_list_get(){
    const request = new XMLHttpRequest();
    request.open('GET', '/js/news.json')
    request.responseType = "json";
    request.send();
    request.onload = () => {
        const data = request.response
        setting(data.news)
        create_news_list(data.news)
        create_index_num();
        page_change();
    };
}

function setting(e){
    contentsLength = Math.trunc(e.length / 12);
    contentsCard = document.querySelectorAll('.card')
}

function create_news_list(e){
    // let x = index === 1 ?  0 : ((index-1)*12)-1;
    // let y = index * 12;
    contentsBox.innerHTML = '';
    for (let i = 0; i < 12; i++) {
        contentsBox.insertAdjacentHTML('beforeend', '' +
            `<a href="/newsPage/${e[i].no}" class="card">\n` +
            `    <img src="/static/img/news/content/${e[i].no}.jpg" alt="">\n` +
            '        <div class="info">\n' +
            `            <h3>${e[i].title}</h3>\n` +
            `            <span>${e[i].date}</span>\n` +
            '        </div>\n' +
            '</a>')
    }
}

function create_index_num(){
    index.innerHTML = '';
    for (let i = 1; i <= contentsLength ; i++) {
        if(i === 1){
            index.insertAdjacentHTML('beforeend', '' +
                `<button class="num on" name="${i}">${i}</button>`)
        }
        else {
            index.insertAdjacentHTML('beforeend', '' +
                `<button class="num" name="${i}">${i}</button>`)
        }
    }
}

function page_change(){
    indexNum = document.querySelectorAll('.num');
    [...indexNum].forEach(x => {
        x.onclick = () => {
            [...indexNum].forEach(x=>{x.classList.remove('on')});
            x.classList.add('on');
        }
    })
}

function a(){

}
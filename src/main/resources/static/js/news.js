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


news_list_get(1);

// content 생성 기능
const contentsBox = document.querySelector('.contents_box')
const index = document.querySelector('.index')
let indexNum = document.querySelectorAll('.num')
let contentsCard = document.querySelectorAll('.card')
let contentsLength = 0;

function news_list_get(index){
    const request = new XMLHttpRequest();
    request.open('GET', '/js/news.json')
    request.responseType = "json";
    request.send();
    request.onload = () => {
        const data = request.response
        setting(data.news)
        create_news_list(data.news.reverse(), index)
        create_index_num();
        page_change(data.news);
    };
}

function setting(e){
    contentsLength = Math.trunc(((e.length)+1) % 12) === 0 ? Math.trunc(e.length / 12) : Math.trunc(e.length / 12) + 1;
    // console.log(Math.trunc(((e.length)+1) % 12));
}
function create_news_list(e, index){
    let x = index === 1 ?  0 : ((index-1)*12)-1;
    let y = index !== contentsLength ? (x + 12) : (x + Math.trunc(((e.length)+1) % 12));
    contentsBox.innerHTML = '';
    for (let i = x; i < y; i++) {
        contentsBox.insertAdjacentHTML('beforeend', '' +
            `<a href="/newsPage/${e[i].no}" class="card">\n` +
            `    <img src="/img/news/thumbnail/${e[i].no}.jpg" alt="">\n` +
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

function page_change(e){
    indexNum = document.querySelectorAll('.num');
    [...indexNum].forEach(x => {
        x.onclick = () => {
            [...indexNum].forEach(x=>{x.classList.remove('on')});
            x.classList.add('on');
            create_news_list(e, parseInt(x.name))
        }
    })
}
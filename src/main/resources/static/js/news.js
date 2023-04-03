// hambuger 클릭 시 효과
const input = document.querySelector('#hambuger input');
const main_menu = document.querySelector('.menu_on');
const header = document.querySelector('header')
const SubMenu = document.querySelector('.submenu').querySelectorAll('li')
let ContentName = document.querySelector('.submenu li.select').getAttribute('name')

input.addEventListener('click', () => {
    main_menu.classList.toggle('active');
    if (main_menu.classList.contains('active') === true) {
        header.style.background = 'none';

    }
    else {
        header.style.background = '';
    }
})

contents_list_get();

// content 생성 기능
const contentsBox = document.querySelector('.contents_box')
const index = document.querySelector('.index')
let indexNum = document.querySelectorAll('.num')
let contentsCard = document.querySelectorAll('.card')
let contentsLength = 0;

function contents_list_get(index=1){
    const request = new XMLHttpRequest();
    request.open('GET', 'js/news&media.json')
    request.responseType = "json";
    request.send();
    request.onload = () => {
        let response = request.response
            switch (ContentName) {
            case 'news':
                response = response.news.reverse()
                break;
            case 'media':
                response = response.media.reverse()
                break;
            }
        console.log(response)
        setting(response)
        create_content_list(response, index)
        create_index_num();
        page_change(response);
    };
}

SubMenu.forEach(x => {
    x.onclick = () => {
        SubMenu.forEach(x => {
            x.classList.remove('select')
        })
        x.classList.add('select');
        ContentName = document.querySelector('.submenu li.select').getAttribute('name');
        contents_list_get()
    }
})


function setting(e){
    contentsLength = Math.trunc(((e.length)+1) % 12) === 0 ? Math.trunc(e.length / 12) : Math.trunc(e.length / 12) + 1;
}

function create_content_list(e, index){
    let x = index === 1 ?  0 : ((index-1)*12)-1;
    let y = index !== contentsLength ? (x + 12) : (x + Math.trunc(((e.length)+1) % 12));
    contentsBox.innerHTML = '';
    if(ContentName === 'news'){
        for (let i = x; i < y; i++) {
            contentsBox.insertAdjacentHTML('beforeend',
            `<a href="/newsPage/${e[i].no}" class="card">
                    <div class="thumbnail">
                        <img src="/img/news/thumbnail/${e[i].no}.jpg" alt="news_thumbnail">
                    </div>
                    <div class="info">
                        <h3>${e[i].title}</h3>
                        <span>${e[i].date}</span>
                    </div>
                </a>`)
        }
    }else {
        for (let i = x; i < y; i++) {
            contentsBox.insertAdjacentHTML('beforeend',
            `<a href="/media/${e[i].no}" class="card">
                    <div class="thumbnail">
                        <img src="/img/media/thumbnail/${e[i].no}.jpg" alt="media_thumbnail">
                        <span class="material-symbols-outlined">play_circle</span>
                    </div>
                    <div class="info">
                        <h3>${e[i].title}</h3>
                    </div>
                </a>`)
        }
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
            create_content_list(e, parseInt(x.name))
        }
    })
}



// hambuger 클릭 시 효과
const input = document.querySelector('#hambuger input');
const main_menu = document.querySelector('.menu_on');

const header = document.querySelector('header')

const SubMenu = document.querySelector('.submenu').querySelectorAll('li')
let ContentName = document.querySelector('.submenu li.select').getAttribute('name')

const ContentsContainer = document.getElementById('contents_container');

input.addEventListener('click', () => {
    main_menu.classList.toggle('active');
    if (main_menu.classList.contains('active') === true) {
        header.style.background = 'none';

    }
    else {
        header.style.background = '';
    }
})

const urlParams = new URL(location.href).searchParams;
const getNo = parseInt(urlParams.get('num'))
const getCategory = urlParams.get('category')

if(getCategory === 'media') {
    SubMenu.forEach(x => {
        x.classList.remove('select');
    })
    SubMenu.item(1).classList.add('select')
}

if(getNo >= 0) {
    get_detail_content(getNo)
} else {
    contents_list_get();
}


// content 생성 기능
let contentsBox = document.querySelector('.contents_box')
let indexNum = document.querySelectorAll('.num')
let contentsLength = 0;
let maxCurrentIndex = 0;

function contents_list_get(index=1){
    fetch("js/news&media.json")
        .then(response => response.json())
        .then(value => {
            switch (ContentName) {
                case 'news':
                    value = value.news.reverse()
                    break;
                case 'media':
                    value = value.media.reverse()
                    break;
            }
            setting(value)
            create_content_list(value, index)
            create_index_num();
            page_change(value);
        })
        .catch(reason => console.log(reason))
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
    ContentsContainer.innerHTML = '';
    ContentsContainer.insertAdjacentHTML('beforeend',
        `
            <div class="contents_box"></div>
            <div class="index_wrap">
                <div class="index_slides"><ul class="index"></ul></div>
                <div class="index_controller">
                    <span class="prev" onclick="prevBtnClick()">&lang;</span>
                    <span class="next" onclick="nextBtnClick()">&rang;</span>
                </div>
            </div>
        `)

    contentsBox = document.querySelector('.contents_box')
    contentsLength = Math.trunc(((e.length)+1) % 12) === 0 ? Math.trunc(e.length / 12) : Math.trunc(e.length / 12) + 1;
    maxCurrentIndex = (contentsLength % 5) === 0 ? contentsLength / 5 : Math.trunc(contentsLength / 5)
    currentIdx = 0;
}

function create_content_list(e, index){
    window.scrollTo({top:0});
    let x = index === 1 ?  0 : ((index-1)*12)-1;
    let y = index !== contentsLength ? (x + 12) : (x + Math.trunc(((e.length)+1) % 12));
    contentsBox.innerHTML = '';
    if(ContentName === 'news'){
        for (let i = x; i < y; i++) {
            contentsBox.insertAdjacentHTML('beforeend',
            `<a href="/news?category=news&num=${e[i].no - 1}" class="card">
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
            `<a href="/media?category=media&num=${e[i].no - 1}" class="card")">
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
    const index = document.querySelector('.index')
    index.style.width = (contentsLength * 60) + 'px';
    index.style.left = '0px';
    index.innerHTML = '';

    for (let i = 1; i <= contentsLength ; i++) {
        if(i === 1){
            index.insertAdjacentHTML('beforeend', '' +
                `<li class="num on">${i}</li>`)
        }
        else {
            index.insertAdjacentHTML('beforeend', '' +
                `<li class="num">${i}</li>`)
        }
    }
}

let prev = document.querySelector('.prev')
let next = document.querySelector('.next')
let slideSize = 60;
let currentIdx = 0;
let slideRun = true;

function prevSlide(num) {
    const index = document.querySelector('.index')
    if (slideRun){
        slideRun = false;
        index.style.left = -num * (slideSize * 5) + 'px';
        currentIdx = num;
        setTimeout(function (){slideRun = true}, 500);
    }
}

function nextSlide(num) {
    const index = document.querySelector('.index')
    if (slideRun){
        slideRun = false;
        index.style.left = -num * (slideSize * 5) + 'px';
        currentIdx = num;
        setTimeout(function (){slideRun = true}, 500);
    }
}

function prevBtnClick(){
    console.log("prev")
    /*첫 번째 슬라이드로 표시 됐을때는
    이전 버튼 눌러도 아무런 반응 없게 하기 위해
    currentIdx !==0일때만 moveSlide 함수 불러옴 */
    if (currentIdx !== 0) prevSlide(currentIdx - 1);
}

function nextBtnClick(){
    console.log("next")
    /* 마지막 슬라이드로 표시 됐을때는
    다음 버튼 눌러도 아무런 반응 없게 하기 위해
    currentIdx !==slideCount - 1 일때만
    moveSlide 함수 불러옴 */
    if (currentIdx !== maxCurrentIndex) {
        nextSlide(currentIdx + 1);
    }
}

function page_change(e){
    indexNum = document.querySelectorAll('.num');
    [...indexNum].forEach(x => {
        x.onclick = () => {
            if(x.classList.contains('on')){
                return null;
            }else{
                [...indexNum].forEach(x=>{x.classList.remove('on')});
                x.classList.add('on');
                create_content_list(e, parseInt(x.innerText))
            }
        }
    })
}

function get_detail_content(no){
    window.scrollTo({top:0})
    ContentName = document.querySelector('.submenu li.select').getAttribute('name');

    fetch("/js/news&media.json")
        .then(value => value.json())
        .then(value => {
            switch (ContentName) {
                case 'news':
                    create_detail_content(value.news, no)
                    break;
                case 'media':
                    create_detail_content(value.media, no)
                    break;
            }
        })
        .catch(reason => console.log(reason))
}

function create_detail_content(e, no){
    ContentsContainer.innerHTML = '';
    let content = "";

    switch (ContentName) {
        case 'news':
            ContentsContainer.insertAdjacentHTML('beforeend',
            `
                <div class="news"></div>
            `)

            content = document.querySelector(".news");
            content.insertAdjacentHTML('beforeend',
            `
                <div class="content_wrap">
                    <h1 class="title">${e[no].title}</h1>
                    <p class="since">${e[no].date}</p>
                    <div class="img_box">
                        <img src="/img/news/content/${e[no].no}.jpg" alt="news_img" class="news_img">
                    </div>
                    <h2 class="sub_title">${e[no].sub_title}</h2>
                    <div class="lead_box">
                    </div>
                    <p class="content">${e[no].content}</p>
                </div>
                
                <div class="page_control_wrap">
                </div>
            `)

            const leadBox = document.querySelector('.lead_box')

            for (let i = 0; i < e[no].lead.length; i++) {
                leadBox.insertAdjacentHTML('beforeend',
            `
                <h4 class="lead">${e[no].lead[i]}</h4>\n
            `)
            }
        break;

        case 'media':
            ContentsContainer.insertAdjacentHTML('beforeend',
                `
                <div class="media"></div>
            `)
            content = document.querySelector(".media");
            content.insertAdjacentHTML('beforeend',
                `
                <div class="content_wrap">
                    <h1 class="title">${e[no].title}</h1>
                    <div class="cf_box">
                        ${e[no].url}
                    </div>
                    <div class="page_control_wrap">
                    </div>
                </div>
            `)
        break;
    }

    let PageControlWrap = document.querySelector('.page_control_wrap')
    console.log(no)


    if(e.length-1 === no){
        PageControlWrap.insertAdjacentHTML('beforeend',
            `
                        <div class="next_page">
                            <span>다음 페이지</span>
                            <h4>다음 페이지가 존재하지 않습니다.</h4>
                        </div>
                        <hr>
                        <div class="prev_page">
                            <span>이전 페이지</span>
                            <a href="/news?category=${ContentName}&num=${no - 1}")"><h4>${e[no-1].title}</h4></a>
                        </div>
                    `)
    }else if(no === 0){
        PageControlWrap.insertAdjacentHTML('beforeend',
            `
                        <div class="next_page">
                            <span>다음 페이지</span>
                            <a href="/news?category=${ContentName}&num=${no + 1}"><h4>${e[no+1].title}</h4></a>
                        </div>
                        <hr>
                        <div class="prev_page">
                            <span>이전 페이지</span>
                            <h4>이전 페이지가 존재하지 않습니다.</h4>
                        </div>
                    `)
    }
    else{
        PageControlWrap.insertAdjacentHTML('beforeend',
            `
                        <div class="next_page">
                            <span>다음 페이지</span>
                            <a href="/news?category=${ContentName}&num=${no + 1}"><h4>${e[no+1].title}</h4></a>
                        </div>
                        <hr>
                        <div class="prev_page">
                            <span>이전 페이지</span>
                            <a href="/news?category=${ContentName}&num=${no - 1}"><h4>${e[no-1].title}</h4></a>
                        </div>
                    `)
    }

}


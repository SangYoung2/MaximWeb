// 메뉴 클릭시 세부 메뉴 변경
const subMenu = document.querySelectorAll('.submenu > li');
const article = document.getElementsByTagName('article');

const urlParams = new URL(location.href).searchParams;
const getCategory = urlParams.get('category');

if(getCategory === 'story'){
    subMenu[0].classList.add('select')
    article[0].classList.add('on');
}else if(getCategory === 'history'){
    subMenu[1].classList.add('select')
    article[1].classList.add('on');
}else {
    subMenu[2].classList.add('select')
    article[2].classList.add('on');
}

// story안의 내용이 나타남
const storyBox = document.getElementsByClassName('story_box');

for (let i = 0; i < storyBox.length; i++) {
    setTimeout(
        function (){storyBox.item(i).classList.add('on')},
        i*1500)
}


// 버튼 클릭시 해당 버튼 년도로 바뀜
const sinceBtn = document.getElementsByClassName('btn');
const historyPage = document.getElementsByClassName('history_page');

[...sinceBtn].forEach((x, index) => {
    x.onclick = () => {
        [...sinceBtn].forEach(x => {x.classList.remove('check')});
        [...historyPage].forEach(x => {x.classList.remove('on')});
        sinceBtn[index].classList.add('check');
        historyPage[index].classList.add('on');
    }
})

//SLOGAN fade 효과
const sloganFade = document.querySelectorAll('.fade li');
let fadeCount = 0;
const fadeMaxCount = sloganFade.length - 1;
console.log(sloganFade);

function sloganFadeEvent() {
    if (fadeCount > fadeMaxCount) {
        fadeCount = 0;
    }
    [...sloganFade].forEach(x => {x.classList.remove('on')});
    sloganFade[fadeCount].classList.add('on');
    fadeCount++;
};

setInterval(sloganFadeEvent,3000);

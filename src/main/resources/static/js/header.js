const input = document.querySelector('#hambuger input');
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

// location.href=document.referrer;
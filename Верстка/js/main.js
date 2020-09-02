let moreInfo = document.getElementsByClassName('more-info_wrap');

for(let i = 0; i < moreInfo.length; i++) {
    moreInfo[i].addEventListener('click', function() {
        this.classList.toggle("active");
        let panel = moreInfo[i].nextElementSibling;
        console.log(panel)
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
        let up = document.getElementsByClassName('icon-arrow-down')[i];
        up.classList.toggle('up');
    });
}

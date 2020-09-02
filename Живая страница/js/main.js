let moreInfo = document.getElementsByClassName('more-info_wrap');

for(let i = 0; i < moreInfo.length; i++) {
    moreInfo[i].addEventListener('click', function() {
        this.classList.toggle("active");
        let panel = moreInfo[i].nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
        let up = document.getElementsByClassName('icon-arrow-down')[i];
        up.classList.toggle('up');
    });
}

let reqest = new XMLHttpRequest();
reqest.open('GET', 'data.json');
reqest.setRequestHeader('Content-type', 'application/json; charset=utf-8');
reqest.send();

reqest.addEventListener('readystatechange', function() {
    if(reqest.readyState === 4 && reqest.status == 200) {
      let data = JSON.parse(reqest.response),
          blockNames = document.getElementsByClassName('tab_name'),
          workTitle = document.getElementsByClassName('workTitle'), 
          workSubtitle = document.getElementsByClassName('workSubTitle'),
          dateFrom = document.getElementsByClassName('workFrom'),
          dateTo = document.getElementsByClassName('workTo'),
          workItems = document.getElementsByClassName('workItems');
      
      for(let i = 0; i < blockNames.length; i++){
        blockNames[i].textContent = data.sections[i].title;
      }
      for(let i = 0; i < workTitle.length; i++) {
        workTitle[i].textContent = JSON.parse(reqest.response).sections[0].items[i].title
      }
      for(let i = 0; i < workSubtitle.length; i++) {
        workSubtitle[i].textContent = JSON.parse(reqest.response).sections[0].items[i].subTitle;
      }
      for(let i = 0; i < dateFrom.length; i++) {
        dateFrom[i].textContent = JSON.parse(reqest.response).sections[0].items[i].from;
        dateTo[i].textContent = JSON.parse(reqest.response).sections[0].items[i].to;
      }     
      for(let i = 0; i < workItems.length; i++){
        for(let j = 0; j < data.sections[0].items[i].items.length; j ++) {
          let li = document.createElement('li');
          let p = document.createElement('p');
          p.innerText = data.sections[0].items[i].items[j];
          workItems[i].append(li);
          li.append(p);
        }
      }


      let eduTitle = document.getElementsByClassName('eduTitle'),
          eduSubTitle = document.getElementsByClassName('eduSubTitle'),
          eduFrom = document.getElementsByClassName('eduFrom'),
          eduTo = document.getElementsByClassName('eduTo');

      for(let i = 0; i < eduTitle.length; i++) {
        eduTitle[i].innerText = data.sections[1].items[i].title;
        eduSubTitle[i].innerText = data.sections[1].items[i].subTitle;
      }
      for(let i = 0; i < eduFrom.length; i++) {
        eduFrom[i].innerText = data.sections[1].items[i].from;
        eduTo[i].innerText = data.sections[1].items[i].to;
      }


      let skillsTitle = document.getElementsByClassName('skill-title'),
          skillsItem = document.getElementsByClassName('skill-item');
      for(let i = 0; i < skillsTitle.length; i++) {
        skillsTitle[i].textContent = data.sections[2].items[0].title[i];
        skillsItem[i].textContent = data.sections[2].items[0].items[i];
      }


      for(let i = 0; i < data.sections.length; i++) {
        if(data.sections[i].isOpen == true) {
          moreInfo[i].nextElementSibling.style.maxHeight = moreInfo[i].nextElementSibling.scrollHeight + 'px';
          moreInfo[i].classList.add('active')
          moreInfo[i].querySelector('.icon-arrow-down').classList.add('up')
        }
      }
      let btn = document.querySelector('.send-btn');
      let btnEmail = data.email;
      let emailTitle = 'Приглашение на собеседование';
      let sex;
      if(data.sex == 'male') {
        sex = 'Уважаемый';
      } else sex = 'Уважаемая';
      let emailName = data.fullName;
      let d = new Date();
      let day = d.getDate();
      let month = d.getMonth()+1;
      let year = d.getFullYear();
      let fullDate = year +'/'+month+'/'+day;

      let emailText = `${sex} ${emailName}, приглашаем Вас на собеседование в компанию Artezio.
      ${fullDate}`;
      btn.href = 'mailto:'+btnEmail+'?subject='+emailTitle+'&body='+emailText;

    }
});



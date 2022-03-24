const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$(".tab-item");
const contents = $$(".content-item");

// set line
const tabActive = $(".tab-item.active");
console.log([tabActive]); // view properties

const pointStart =  tabActive.offsetLeft;
const widthTab = tabActive.offsetWidth;

const line = $(".line");
line.style.width = widthTab + "px";
line.style.left = pointStart + "px" ;

tabs.forEach(function(tab, index) {
    const content = contents[index];
    tab.onclick = function() {     
        // set head 
        $('.tab-item.active').classList.remove("active");
        this.classList.toggle("active");

       // set content
        $(".content-item.active").classList.remove("active");
        content.classList.add("active");

        // set line
        
        line.style.width = this.offsetWidth + "px";
        line.style.left =  this.offsetLeft + "px";
    }
})




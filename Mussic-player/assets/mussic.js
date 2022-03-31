const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const songTitlePlaying = $('.heading');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const btnPlay = $('.play-action');
const header = $('.header');
const progress = $('.progress');
const btnNext = $('.btn-forward');
const btnPrev = $('.btn-backward');
const btnRamdom = $('.btn-random');
const btnRepeat = $('.btn-rotate');
const btnSongs = $('.songs');
const timeCurent = $('.timeCurent');
const timeDuration = $('.timeDuration');
const progressVolume = $('#progressVolume');

//localStorage.setItem('thien','test');
const PLAYER_STORAGE_KEY = 'F8_PLAYER';
const app = {
    isPlaying: false,
    isRamdom : false,
    isRepeat : false,
    currentIndex: 0,
    config:JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    setConfig: function (key,value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY,JSON.stringify(this.config));
    },
    songs: [
        {
            name: 'Hoa Hải Đường',
            singer: 'Jack',
            path: 'music/audio_hoa-hai-duong.mp3',
            img: 'imgs/hoa-hai-duong.jpeg'
        },
        {
            name: 'Khuê Mộc Lang',
            singer: 'Văn Thiên',
            path: 'music/audio_khue-moc-lang.mp3',
            img: 'imgs/khue-moc-lang.jpeg'
        },
        {
            name: 'Thiên Đàng',
            singer: 'Vicetone',
            path: 'music/audio_thien-dang.mp3',
            img: 'imgs/thien-dang.jpeg'
        },
        {
            name: 'Ái Nộ',
            singer: 'Masew, Khôi Vũ',
            path: 'music/ai-no.mp3',
            img: 'imgs/ai-no.jpg'
        },
        {
            name: 'Y chang mùa xuân',
            singer: 'Vicetone',
            path: 'music/audio_y-chang-xuan-sang.mp3',
            img: 'imgs/y-chang-xuan-sang.jpeg'
        },
        {
            name: 'Nợ Ai Đó Lời Xin Lỗi',
            singer: 'Bozitt',
            path: 'music/no-ai-do-loi-xin-loi.mp3',
            img: 'imgs/no-ai-do-loi-xin-loi.jpg'
        },
        {
            name: 'Mình Anh Nơi Này',
            singer: 'Lofi Version',
            path: 'music/minh-anh-noi-nay.mp3',
            img: 'imgs/minh-anh-noi-nay.jpg'
        },
        {
            name: 'Đường Tôi Chở Em Về',
            singer: 'Bùi Trường Linh',
            path: 'music/duong-toi-cho-em-ve.mp3',
            img: 'imgs/duong-toi-cho-em-ve.jpg'
        },
        {
            name: 'Người Em Cố Đô',
            singer: 'Đaa',
            path: 'music/nguoi-em-co-do.mp3',
            img: 'imgs/nguoi-em-co-do.jpg'
        },
        {
            name : 'Mập Mờ',
            singer : 'Rin9',
            path: 'music/map-mo.mp3',
            img: 'imgs/map-mo.jpg'
        }

    ],
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `<div  class= "song-item" data-index = ${index}>
            <img src="assets/${song.img}" alt="" class="song-item__img" >
            <div class="song-infor">
                <h4 class="song-title">${song.name}</h4>
                <p class="song-author">${song.singer}</p>
            </div>
            <div class="song-spectrum">
                <div class="song-spectrum__1">
                
                </div>
                 <div class="song-spectrum__2">
                
                 </div>
                    <div class="song-spectrum__3">
                
                    </div>
            </div>
            <i class=" song-option fa-solid fa-ellipsis"></i>
        </div>`;
        });
        //  console.log(htmls);
        $('.songs').innerHTML = htmls.join("");
    },
    // Định nghĩa đối tượng currentSong;
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {

            get: function () {
                
                return this.songs[this.currentIndex];
                
            }
        })
    },
    handleEvents: function () {
        
       

        //common 
        let duration = 0;
        ////
        /// xử lý cd quay
        const cdthumbAnimate = cdThumb.animate([
            {
                transform: 'rotate(360deg)'
            }
        ], {
            duration: 10000,// 10 seconds
            iterations: Infinity
            // lặp lại : vô hạn
        })
        cdthumbAnimate.pause();
        
        // Xử lý phóng to thu nhỏ cd
        const cd = $('.cd');
        const cdWidth = cd.offsetWidth;
        document.onscroll = function () {
            //console.log(window.scrollY);
            const newWidthCd = cdWidth - window.scrollY;
            cd.style.width = newWidthCd > 0 ? newWidthCd + 'px' : 0;
            cd.style.opacity = newWidthCd / cdWidth;
        }

        // Xử lý click play
        btnPlay.onclick = function () {
            
            if (app.isPlaying) {
                audio.pause();
            }
            else {
                audio.play();
            }
           
        }
        audio.onplay = function () {
            app.setConfig('currentIndex', app.currentIndex);
            showItemSongPlaying();
            header.classList.add("playing");
            app.isPlaying = true;
            cdthumbAnimate.play();
            
           
           
            
           
        }
        audio.onpause = function () {
            cdthumbAnimate.pause();
            app.isPlaying = false;
            header.classList.remove("playing");
            // console.log([cdthumbAnimate]);
        }

        /// Khi tiến độ bài hát thay đôi 
        audio.ontimeupdate = function () {
            console.log(audio.duration)
            if(audio.duration) {
                //set progress
                progress.value = (audio.currentTime * 100) / audio.duration;

                // set show time
                let totalSeconds = audio.duration ;
                let totalMinutes = Math.floor(totalSeconds/60);
                    totalSeconds = Math.floor(totalSeconds%60);
                let currentSeconds = audio.currentTime;
                let currentMinutes = Math.floor(currentSeconds/60);
                currentSeconds = Math.floor(currentSeconds%60);
                timeCurent.innerText = currentMinutes + ":" +currentSeconds ;
                timeDuration.innerText = totalMinutes + ":" +totalSeconds ;
            }
            
           
        }

        ///seek song 
        progress.oninput = function (e) {
            duration = audio.duration;
            const progressCurrent = e.target.value;
            const timeSeek = (progressCurrent * duration) / 100;
            audio.currentTime = timeSeek;
        }
        /// handle next audio
        btnNext.onclick = function () {
            if(app.isRamdom)
                app.ramdomSong();
            else
                app.nextSong();
            audio.play();
        }
        // handle prev audio
        btnPrev.onclick = function () {
            
            if(app.isRamdom)
                app.ramdomSong();
            else
                app.prevSong();
            audio.play();
        }

        //ramdom playlist
        btnRamdom.onclick = function () {
                if(app.isRepeat){
                    btnRepeat.click();
                }
                app.isRamdom = !app.isRamdom;
                app.setConfig('isRamdom', app.isRamdom); //lưu trạng thai ramdom
                
                btnRamdom.classList.toggle('active',app.isRamdom);   
                
        }

        //handle audio end
        audio.onended = function () {
            if(app.isRepeat){
                audio.play()
            }
            else
            btnNext.click();
                
        }

        //handle audio repeat
        btnRepeat.onclick = function () {
            if(app.isRamdom){
                btnRamdom.click();
            }
            app.isRepeat =  !app.isRepeat;
            app.setConfig('isRepeat', app.isRepeat); //lưu trạng thai ramdom
            btnRepeat.classList.toggle('active');
            
        }

         // handle playlist show currentSong 
        let prevPlayed = -1;
        function showItemSongPlaying() {
            const playlist = $$('.song-item');
            if(!app.isRepeat && prevPlayed != -1){
                playlist[prevPlayed].classList.remove('active');
            }
            if(!app.isRepeat){
                const index = app.currentIndex ;
                prevPlayed = index;
                playlist[index].classList.add('active');
            }
                // kéo song đang phát lên view
                scrollToActiveSong(playlist[app.currentIndex]);
        }
        function scrollToActiveSong (songClass){
            setTimeout(()=>{
                songClass.scrollIntoView({
                    behavior: 'smooth',
                    block:'center',
                    inline: "nearest"
                })
            },300)
        }
        showItemSongPlaying();
        // volum 
        setVolume();
        function setVolume(){
           // app.setConfig('Volume',audio.volume);
            console.log ("amluong : "+audio.volume);
            progressVolume.value = audio.volume*100;
           
        }
        progressVolume.oninput  = function(){
            audio.volume = progressVolume.value /100;
            app.setConfig('Volume',audio.volume);
            
        }

        //click song item 
        btnSongs.onclick = function(e){
            const songNode = e.target.closest('.song-item:not(.active)');
          //  console.log(songNode);
           if( songNode ||e.target.closest('.option') ){ 
               // khi click vào song 
               if(songNode){
                    console.log(songNode.getAttribute('data-index'));
                    // app.currentIndex =  Number(songNode.dataset.index)
                    app.currentIndex = songNode.getAttribute('data-index');
                    app.loadCurrentSong();
                    audio.play();
               }
               // khi click vào option
               if(e.target.closest('.option')){
                    
               }
               
            }
        }
    },
        // handle spectrum audio tabActive
       
  
       
   
    loadCurrentSong: function () {

        songTitlePlaying.textContent = this.currentSong.name;
        cdThumb.style = `background-image : url('assets/${this.currentSong.img}')`;
        audio.src = 'assets/' + this.currentSong.path;

    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex <= 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    ramdomSong:function(){
        let tmpSong = this.currentIndex;
        do{
            this.currentIndex = Math.floor(Math.random()* (this.songs.length-1));
        }
        
        while (this.currentIndex ==  tmpSong);
        this.loadCurrentSong();
    },
    loadConfig:function(){
        this.isRamdom = this.config.isRamdom;
        this.isRepeat = this.config.isRepeat;
        this.currentIndex = !Object.is(NaN, Number(this.config.currentIndex) ) ?  Number(this.config.currentIndex) : 0;
        console.log(this.currentIndex);
        btnRepeat.classList.toggle('active',app.isRepeat);
        btnRamdom.classList.toggle('active',app.isRamdom);
        audio.volume = !isNaN(this.config.Volume) ? this.config.Volume  :1;
       
    },
    start: function () {
        //gán cấu hình từ config vào ứng dụng;
        this.loadConfig();
        // định nghĩa các thuộc tính
        this.defineProperties();
        this.loadCurrentSong();
        //reder playlist
        this.render();
                
        // lắng nghe// sử lý các sự kiện event
        this.handleEvents();

        //tải bài hát đầu tiên vào ui khi chạy ứng dụng
       

        

    }
}
app.start();
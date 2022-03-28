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
const app = {
    isPlaying: false,
    isRamdom : false,
    isRepeat : false,
    currentIndex: 0,
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
            name: 'Nevada',
            singer: 'Vicetone',
            path: 'music/audio_y-chang-xuan-sang.mp3',
            img: 'imgs/y-chang-xuan-sang.jpeg'
        },
        {
            name: 'Nevada',
            singer: 'Vicetone',
            path: 'music/audio_y-chang-xuan-sang.mp3',
            img: 'imgs/y-chang-xuan-sang.jpeg'
        },
        {
            name: 'Nevada',
            singer: 'Vicetone',
            path: 'music/audio_y-chang-xuan-sang.mp3',
            img: 'imgs/y-chang-xuan-sang.jpeg'
        },
        {
            name: 'Nevada',
            singer: 'Vicetone',
            path: 'music/audio_y-chang-xuan-sang.mp3',
            img: 'imgs/y-chang-xuan-sang.jpeg'
        },
        {
            name: 'Nevada',
            singer: 'Vicetone',
            path: 'music/audio_y-chang-xuan-sang.mp3',
            img: 'imgs/y-chang-xuan-sang.jpeg'
        },
        {
            name: 'Nevada',
            singer: 'Vicetone',
            path: 'music/audio_y-chang-xuan-sang.mp3',
            img: 'imgs/y-chang-xuan-sang.jpeg'
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
            
            <i class="option fa-solid fa-ellipsis"></i>
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

            if (audio.duration) {
                progress.value = (audio.currentTime * 100) / audio.duration;
            }

        }
        ///seek song 
        progress.oninput = function (e) {
            
            if (audio.pause) {
                audio.play();
                header.classList.add("playing");
            }
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


        //click song item 
        btnSongs.onclick = function(e){
            const songNode = e.target.closest('.song-item:not(.active)');
            console.log(songNode);
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
 
    start: function () {
        // định nghĩa các thuộc tính
        this.defineProperties();

        //reder playlist
                this.render();
                
        // lắng nghe// sử lý các sự kiện event
        this.handleEvents();

        //tải bài hát đầu tiên vào ui khi chạy ứng dụng
        this.loadCurrentSong();

        

    }
}
app.start();
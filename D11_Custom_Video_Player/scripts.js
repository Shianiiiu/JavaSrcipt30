/* 获取元素  */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* 函数功能实现 */

// 播放暂停
function tooglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}
// function togglePlay() {
//     if (video.paused) {
//         video.play();
//     } else {
//         video.pause();
//     }
// }

// 图标切换，用视频本身的播放状态来判断
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

// 快进后退
function skip() {
    // console.log(this.dataset)
    video.currentTime += parseFloat( this.dataset.skip)
}

// 音量、播放速度
function handleRangeUpdate() {
    video[this.name] = this.value;
}

// 进度条
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    // console.log(e)
    // console.log(this)
    // console.log(this.clientWidth)
    // console.log(this.offsetWidth)
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime
}


/* 事件监听 */
video.addEventListener('click',tooglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)

toggle.addEventListener('click',tooglePlay)

skipButtons.forEach(button => {
    button.addEventListener('click',skip)
})

ranges.forEach(range => {
    range.addEventListener('change', handleRangeUpdate)
})
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
// 鼠标按下改变标志
progress.addEventListener('mousedown', () => mousedown = true);
// 鼠标抬起恢复标志
progress.addEventListener('mouseup', () => mousedown = false);


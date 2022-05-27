<template>
<div>

  <el-table :data="songList" stripe style="width: 100%">
    <!--  -->
    <el-table-column label="" width="80" align="center">
      <template #default="{ row }">
        <span>{{ row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column label="歌曲标题">
      <template #default="{ row }">
        <span>{{ row.albumTitle }}</span>
      </template>
    </el-table-column>
    <el-table-column label="时间" align="center">
      <template #default="{ row }">
        <span>{{ row.finalTime }}</span>
      </template>
    </el-table-column>
    <el-table-column label="歌手">
      <template #default="{ row }">
        <span>{{ row. artistsName }}</span>
      </template>
    </el-table-column>
    <el-table-column label="" align="center">
      <template #default="{ row }">
        <span class="music-btn"><i :class="player[row.id] && row.flag ? 'el-icon-video-pause' : 'el-icon-video-play'" @click="handlerPlay(row)"></i></span>
      </template>
    </el-table-column>
  </el-table>
  <audio  hidden id="audio" ref="singeBox"></audio>

  <span>当前歌曲：{{ songList[index].name }}</span>

  <div class="buju">
    <div class="kongzhi">
    <i class="el-icon-d-arrow-left" @click="musicPlay('pre')"></i>
    <i :class="play?'el-icon-video-pause' : 'el-icon-video-play'" @click="musicPlay('play')"></i>
    <i class="el-icon-d-arrow-right" @click="musicPlay('next')"></i>
      </div>
    <div  class="kuandu">
     <el-image class="musicImg" :src="musicImg"></el-image>
  <el-slider
      v-model="sliderVal"
      :format-tooltip="formatTooltip"
      @change="spliderSelect"
       :max="sliderMax"
  />
    </div>

    <div class="time">
     {{ currentTime }}/{{ duration }}
    </div>
  </div>




</div>
</template>

<script>
export default {
  name: "music",
  data() {
    return {
      songList: [{
        albumId: 35172219,
        albumTitle: "君の名は - 黄昏之时",
        artistsName: "Frank_Jiang",
        cover:
            "https://p1.music.126.net/YppJiMHyrLc7tDkj6jUttg==/109951162858188597.jpg",
        finalTime: "03:08",
        id: 1,
        flag:false,
        name: "黄昏之时（FRANKOWO Bootleg）",
        sort: "06",
        url: "https://music.163.com/song/media/outer/url?id=459116892.mp3",
      },
        {
          albumId: 75612550,
          albumTitle: "辞.九门回忆",
          artistsName: "解忧草",
          cover: "",
          finalTime: "04:09",
          id: 2,
          flag:false,
          name: "辞.九门回忆",
          sort: "07",
          url: "https://music.163.com/song/media/outer/url?id=1347524822.mp3",
        },
      ],

      duration: '', //音乐总时长
      currentTime: '', //当前播放时长
      box: '',
      musicPath: '******',  // mp3链接
      coverPath: '******',  // 封面
      musicTitle: '',  // 当前播放标题
      musicImg: '',  //  当前播放封面
      sliderVal: 0, // 这个对接当前时长。
      sliderMin: 0,
      sliderMax: 0, // 这个对接总时长。
      index: 0, //当前播放的音乐素质索引
      play: false, // 播放状态，true为正在播放
      player: [],
      sing:"",// 对象控制list谁在播放

    }

  },
  mounted() {
    this.init()
    this.getSong()
  },
  created() {

  },
  methods: {
    async getSong(){
      const {data:res}=await this.$http.get("https://api.imjad.cn/cloudmusic/?type=song&id=1851752489&br=128000");
      console.log(res);

    },
    handlerPlay(row) {
      if (!this.player[row.id]) {// 没值触发新的播放
        const i = this.songList.findIndex(x => x.id === row.id)
        this.index = i
          this.play = false
      }
      this.musicPlay('play')

    },
    musicPlay(flag) {
      switch (flag) {
        case 'pre':
          if (this.songList[this.index - 1]) {
            this.box.src =  this.songList[this.index - 1].url
            this.index -= 1
          } else {
            this.box.src = this.songList[this.songList.length - 1].url
            this.index = this.songList.length - 1
          }
          break
        case 'play':
          this.play = !this.play

          if (this.play && !this.player[this.songList[this.index].id]) {
            this.box.src = this.songList[this.index].url

         }
          break
        case 'next':
         if (this.songList[this.index + 1]) {
            this.box.src =  this.songList[this.index + 1].url
            this.index += 1
          } else {
            this.box.src =  this.songList[0].url
            this.index = 0
          }
          break
      }
      if (this.play && !this.player[this.songList[this.index].id]) {
        this.player = []
        this.player[this.songList[this.index].id] = this.songList[this.index].id
        this.songList[this.index].flag=true;
      } else {
        this.songList[this.index].flag=!this.songList[this.index].flag
        this.play ? this.box.play() : this.box.pause()

      }

    },
    init() {
      this.box = this.$refs.singeBox;
      this.box.src = this.songList[0].url

      this.box.ondurationchange = () => {
        console.log('时长发生了变化')
        this.play ? this.box.play() : this.box.pause()
        this.updateTime()

      }
      this.box.onended = ()=> {
        this.musicPlay('next')
       // console.log('播放完毕，谢谢收听')
      }

      this.box.ontimeupdate = ()=> {
      // console.log('播放位置发送了变动')
        this.updateTime()
      }

    },
    formatTooltip(val) {
      // 格式化毫秒数，由于组件提示为纯数字，所以这里需要将数字转化为我们所需要的的格式，string类型的。'03:45',
      const time = this.formatTime(val)
      return `${time.min}:${time.sec}`
    },
    spliderSelect() {
      // 滑块松动后触发。更新当前时长，
      // 时长发生变动会init里的方法进行更新数据
      this.box.currentTime=this.sliderVal


    },
    updateTime() {
      const total = this.formatTime(this.box.duration);
      const current = this.formatTime(this.box.currentTime);
      this.duration = `${total.min}:${total.sec}`
      this.currentTime = `${current.min}:${current.sec}`
      this.sliderVal = Math.floor(this.box.currentTime)
      this.sliderMax=this.box.duration
      this.musicImg=this.songList[this.index].cover

    },

    formatTime(time) { // 格式化毫秒，返回String型分秒对象
      // 有可能没获取到，为NaN
      if (!time) return {min: '00', sec: '00'}
      return {
        min: Math.floor(time / 60).toString().padStart(2, '0'),
        sec: Math.floor(time % 60).toString().padStart(2, '0')
      }
    }
  }
}
</script>

<style scoped>

.kuandu{
  width: 50%;
  margin: auto;

}
.buju{
  display:flex;


}
.kongzhi{
  position: relative;
  left: 18%;
  margin-top:10px;

}
.musicImg{
  width: 30px;
  float: left;
  margin-left: -50px;
  margin-top: 5px;

}
.time{
  position: relative;
  right:20%;
  margin-top: 10px;

}

</style>

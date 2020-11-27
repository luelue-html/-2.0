// console.log('构建开发环境的包')
let {task,src,dest,watch,series,parallel} = require('gulp')
let load = require('gulp-load-plugins')()
let del = require('del')

// 删除dist目录
task('delDist', async ()=>{
  await del('./dist')
})

// 处理图片
task('img', async ()=>{
  src('./img/*.*')
  .pipe(dest('./dist/img'))
  .pipe(load.connect.reload())
})
task('imgs', async ()=>{
  src('./img/images/*.*')
  .pipe(dest('./dist/img'))
  .pipe(load.connect.reload())
})
task('date', async ()=>{
  src('./date/*.*')
  .pipe(dest('./dist/date'))
  .pipe(load.connect.reload())
})
// 处理JS
task('script', async ()=>{
  src('./js/*.js')
  .pipe(load.babel({ presets: ['@babel/env']}))
  .pipe(dest('./dist/js'))
  .pipe(load.connect.reload())
})

// 处理HTML
task('html', async ()=>{
  src('./pages/*.html')
  .pipe(dest('./dist'))
  .pipe(load.connect.reload())
})

// 编译sass
task('sass', async ()=>{
  src('./sass/*.*')
  .pipe(load.sassChina()) // 把sass转成css
  .pipe(dest('./dist/css'))
  .pipe(load.connect.reload())
})

// 监听文件变化
task('watch', async ()=>{
  watch('./pages/*.html',series('html'))
  watch('./sass/*.scss',series('sass'))
  watch('./img/*.*',series('img'))
  watch('./js/*.js',series('script'))
})

// 自动刷新服务
task('connect', async ()=>{
  load.connect.server({
    root: './dist',
    livereload: true,
    port: 3000
  })
})

task('dev', series('delDist','date','img','imgs','html','script','sass','connect','watch'))

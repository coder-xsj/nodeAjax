### bootstrap学习笔记
#### 1. 固定容器

内容添加
~~~less
// (720px + @grid-gutter-width);
~~~
| 阈值   | width  |  适用设备 |
| ----   |------| ----------|
| \>=1200(lg)| 1170=(1140+30)|大屏幕/宽桌面|
| \>=992(md) | 970=(940+30) |中屏幕/桌面|
| \>=768(sm) | 750=(720+30) |小屏幕/平板电脑|
| \>=480(xs) | auto|超大屏幕/手机|
#### 2.栅格系统

  注意: 1. cols指的是列,rows指的是行
       2. layUI 的栅格就是模仿的bootstrap      
  1. #####栅格源码分析
   ~~~less
   //栅格系统 less/grid.less
   // 1. 固定容器
   .container {
     .container-fixed();
    // 顺序不可变
     @media (min-width: @screen-sm-min) {
       width: @container-sm;
     }
     @media (min-width: @screen-md-min) {
       width: @container-md;
     }
     @media (min-width: @screen-lg-min) {
       width: @container-lg;
     }
   }
   // less/mixins/grid.less
   // 固定容器和流动容器的公共布局样式
   // @grid-gutter-width 槽宽
   // 在variables.less中定义 @grid-gutter-width:         30px;    // 槽宽
   .container-fixed(@gutter: @grid-gutter-width) {
     padding-right: ceil((@gutter / 2));  // 各分一半
     padding-left: floor((@gutter / 2));
     margin-right: auto;
     margin-left: auto;
     &:extend(.clearfix all);
   }
   
   // 在less/variables.less定义的
   // Small screen / tablet
   //** Deprecated `@screen-sm` as of v3.0.1
   @screen-sm:                  768px;
   @screen-sm-min:              @screen-sm;
   //** Deprecated `@screen-tablet` as of v3.0.1
   @screen-tablet:              @screen-sm-min;
   
   // Medium screen / desktop
   //** Deprecated `@screen-md` as of v3.0.1
   @screen-md:                  992px;
   @screen-md-min:              @screen-md;
   //** Deprecated `@screen-desktop` as of v3.0.1
   @screen-desktop:             @screen-md-min;
   
   // Large screen / wide desktop
   //** Deprecated `@screen-lg` as of v3.0.1
   @screen-lg:                  1200px;
   @screen-lg-min:              @screen-lg;
   //** Deprecated `@screen-lg-desktop` as of v3.0.1
   @screen-lg-desktop:          @screen-lg-min;
   
   
   // less/grid.less调用 width: @container-sm;
   @container-sm:                 @container-tablet;
   //小屏+槽宽
   @container-tablet:             (720px + @grid-gutter-width);

  // 2. 行    
   .make-row(@gutter: @grid-gutter-width) {
     margin-right: floor((@gutter / -2));  // -15
     margin-left: ceil((@gutter / -2));  // -15
     &:extend(.clearfix all);
   }

    // 3. 列
      
 //.make-grid-columns();
 //生成了
.col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {
        position: relative;
        min-height: 1px;
        padding-right: 15px;
        padding-left: 15px;
}

.make-grid(xs);   // 移动优先
.make-grid(@class) {
  // @class : xs
  // 2.1  float
  .float-grid-columns(@class);
  /*
  .col-@{class}-@{index}
    结果为:
    .col-xs-1 ... .col-xs-12{
        float: left;
    }
   */
  // 12 xs 
  // 2.2 width
  .loop-grid-columns(@grid-columns, @class, width);
  /*
    .calc-grid-column(12, xs, width);
    生成结果为: 不规范，自己看懂就可以了，一一对应关系
    .col-xs-12, .col-xs-11, ... , .col-xs-1{
        width: percentage((12 / 12));
        width: percentage((11 / 12));
                ...
        width: percentage((1 / 12));
    }
   */

  // 2.3 列排序 left|right
  .loop-grid-columns(@grid-columns, @class, pull);
/*
生成结果为
  .col-@{class}-push-@{index} {
    left: percentage((@index / @grid-columns));
  }

  .col-xs-push-12 {
    left: 12 / 12  也就是  100%
  }
  .col-xs-push-1 {
    left: 1 / 12
  }
  .col-xs-push-0 {
   left: auto
}
 */
  // 2.4 列偏移 margin left
  .loop-grid-columns(@grid-columns, @class, push);
/*
生成结果为
  .col-@{class}-pull-@{index} {
    right: percentage((@index / @grid-columns));
  }

  .col-xs-pull-12 {
    right: 12 / 12  也就是  100%
  }
  .col-xs-pull-1 {
    right: 1 / 12
  }
  .col-xs-pull-0 {
   right: auto
}
 */
  .loop-grid-columns(@grid-columns, @class, offset);
/*
生成结果为
  .col-@{class}-offset-@{index} {
    margin-left: percentage((@index / @grid-columns));
  }

  .col-xs-offset-12 {
    margin-left: 12 / 12  也就是  100%
  }
  .col-xs-offset-1 {
    margin-left: 1 / 12
  }
  .col-xs-offset-0 {
   margin-left: 0
}
 */
}
// 以下为版本，同上
@media (min-width: @screen-sm-min) {
  .make-grid(sm);
}
@media (min-width: @screen-md-min) {
  .make-grid(md);
}
@media (min-width: @screen-lg-min) {
  .make-grid(lg);
}
   ~~~
    
        
#### 响应式工具
##### 源码
1. responsive-utilities.less
2. mixin/responsive-visibility.less
    1. visible-xs
        只在xs下可见
    2. hide-xs
        只在xs下隐藏     
#### 栅格盒子模型设计的精妙之处
1. 容器两边各有15px的padding
~~~css
.container {
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}
~~~
2. 行两边各有-15px的margin
~~~css
.row {
    margin-right: -15px;
    margin-left: -15px;
}
~~~
3. 列两边各有15px的padding
~~~css
.col-lg-6{
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
}
~~~
这样设计的目的是什么呢？
三点：1. 为了维护槽宽的规则
            列两边必须得要15px的padding
     2. 为了能使列嵌套
            行必须得要-15px的margin
     3. 为了让容器可以包裹住行
            容器两边必须要有15px的padding 
        
        
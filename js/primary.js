AOS.init();
$(function () {
    // $(".cloud").each(function() {
    //     var time;
    //     setInterval(() =>{
    //         var cloud = $(this);
    //         var time = ($(window).width() - cloud.offset().left) * 13;
    //         cloud.animate({
    //             left: '100%'
    //         },time);
    //         cloud.animate({
    //             left: '-100px'
    //         },0);
    //     },time);
    // })

    $(".cloud").each(function () {
        setInterval(() => {
            if ($(this).offset().left >= $(window).width()) {
                $(this).css("left", "-150px");
            } else {
                $(this).css("left", $(this).offset().left + 2)
            }
        }, 30)
    })

    $(".info").fadeIn(2000);

    // 轮播图
    for (var i = 0; i < $(".slider ul>li").length; i++) {
        $(".circle").append("<li></li>");
    }
    $(".circle li").eq(0).addClass("current");

    var timer = setInterval(() => {
        $.next();
    }, 2500)


    $(".slider").hover(function () {
        clearInterval(timer);
    }, function () {
        timer = setInterval(() => {
            $.next();
        }, 2500)
    })
})

var flag = true;

$.change = function () {
    if (flag) {
        flag == false;
        $(".slider ul li").eq(num).siblings("li").css("display","none");
        $(".circle li").eq(num).siblings("li").removeClass("current");
        $(".slider ul li").eq(num).fadeIn();
        $(".circle li").eq(num).addClass("current");
        flag = true;
    }
}

$.next = function () {
    num++;
    if (num === $(".slider ul li").length) {
        num = 0;
    }
    $.change();
}

$(".circle li").click(function () {
    num = $(this).index();
    $.change();
});

var num = 0;
$(".right").click(function () {
    $.next();
});

$(".left").click(function () {
    num--;
    if (num === 0) {
        num = $(".slider ul li").length;
    }
    $.change();
})



// 雷达图自适应
$(window).resize(function () {
    $(".scoreChart").css({
        width: $(".container").width() * 0.95
    })
    myScore.resize();

})

$(window).scroll(function () {
    var h = $(window).scrollTop()
    // 导航栏颜色
    if (h >= $(".page-header").height() - 56) {
        $(".page-header .navbar").css("backgroundColor", "#1479d8");
    }
    else {
        $(".page-header .navbar").css("backgroundColor", "transparent");
    }

    //指示
    var about = $("#about").offset().top;
    var skill = $("#skill").offset().top;
    var school = $("#school").offset().top - (60 + 56);
    var score = $("#score").offset().top - (60 + 56);
    var contact = $("#contact").offset().top - (60 + 56);
    var now = $(window).height();

    $(".nav-item").removeClass("active");

    if ((about - h) < now * 0.5) {
        $(".nav-item").removeClass("active");
        $(".navbar-nav .nav-item:eq(0)").addClass("active")
    }
    if ((skill - h) < now * 0.5) {
        $(".nav-item").removeClass("active");
        $(".navbar-nav .nav-item:eq(1)").addClass("active")
    }
    if ((school - h) < now * 0.5) {
        $(".nav-item").removeClass("active");
        $(".navbar-nav .nav-item:eq(2)").addClass("active")
    }
    if ((score - h) < now * 0.5) {
        $(".nav-item").removeClass("active");
        $(".navbar-nav .nav-item:eq(3)").addClass("active")
    }
    if ((contact - h) < now * 0.5) {
        $(".nav-item").removeClass("active");
        $(".navbar-nav .nav-item:eq(4)").addClass("active")
    }
})

// 发送邮件
$(".send-btn").on("click", mailsend);

function mailsend() {
    var subject = $(".subject").val();
    var content = $(".message").val();
    content = content.replace(new RegExp(' ', 'g'), '%20');

    content = content.replace(new RegExp('\n', 'g'), '%0d%0a');

    if (confirm("你确定要向冷俊侠发送邮件吗?")) {
        location.href = "mailto:2855756390@qq.com?subject=" + subject + "&body=" + content;
    }
}


// 雷达图
var myChart = echarts.init(document.getElementsByClassName("radarMap")[0]);
option1 = {
    color: ['rgb(0,123,255)'],
    radar: {
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 0]
            }
        },
        indicator: [
            { name: '计算机基础', max: 10 },
            { name: '前端语言', max: 10 },
            { name: '常见框架', max: 10 },
            { name: '后端语言', max: 10 },
            { name: '浏览器原理', max: 10 },
            { name: '性能优化', max: 10 }
        ]
    },
    series: [{
        name: '专业技能',
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [
            {
                value: [7, 8, 7, 7, 6, 5],
            }
        ]
    }]
};

myChart.setOption(option1);

//成绩柱状图
var myScore = echarts.init(document.getElementsByClassName("scoreChart")[0]);
option = {
    color: ['rgb(0,123,255)'],
    xAxis: {
        type: 'category',
        data: ['设计模式', '人机交互设计', '算法分析与设计', '操作系统基础', '计算机组成原理', '计算机网络', '数据库设计']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [4.8, 4.4, 4.3, 4.3, 4.2, 3.8, 3.4],
            type: 'bar'
        }
    ]
};

myScore.setOption(option);
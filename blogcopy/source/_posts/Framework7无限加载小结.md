---
title: Framework7无限加载小结
date: 2017-01-17 10:53:29
tags: F7 无限滚动加载 菜单
---
### 无限加载

#### 原理
滑动页面到底部，请求后台数据，每次加载的数据量是多少（pageSize），加载的次数（可看做分的页数pageNum），加载到页面上，重复上述过程，页数不断加1，直到后台无数据传递过来。

F7框架中可滚动的区域是<span style="background: #CCC;">page-content</span>，但page-content要在page下，所以要在page-content同级加上<span style="background: #CCC;">infinite-scroll</span>，eg：
	
	<div class="page">
    	<div class="page-content infinite-scroll" data-distance="100">
        ... 
    	</div>
	</div>

data-distance属性用来配置页面滚动到离底部多远时触发无限滚动事件，默认是50 (px)

### 菜单1，2，3
###### 菜单2或者3无限滚动，直到数据加载完成，菜单之间互不影响
点击相应菜单按钮，绑定滚动事件，其他菜单解除这个事件，
	
	var itemIndexs = 0;
	$('.tab .item').on('click',function(){
        var $this = $(this);
        itemIndexs = $this.index();
		console.log(itemIndexs)  //0，1，2
        //三个菜单按钮
        switch (itemIndexs){
            case 0:
                $$('.infinite-scroll').off('infinite',infinitescroll);
                break;
            case 1:
                $$('.infinite-scroll').on('infinite',infinitescroll);
                break;
            case 2:
                $$('.infinite-scroll').off('infinite',infinitescroll);
                break;
            default:
                break;
        }
    });

事件封装在函数里，上述的infinitescroll可看做以下的clickHandler：

	function clickHandler(){
	    console.log('clicked');
	}
	// Add event listener
	$$(document).on('click', 'a', clickHandler);
	// Remove event listener
	$$(document).off('click', 'a', clickHandler);

HTML：

	<div class="tab">
   		<a href="javascript:;" class="item active">菜单一</a>
    	<a href="javascript:;" class="item">菜单二</a>
		<a href="javascript:;" class="item">菜单三</a>
	</div>
	<div class="content">
	    <div class="lists"></div>
	    <div class="lists" id="TargetArea">
			<div class="infinite-scroll-preloader">
				<div class="preloader"></div>
			</div>
		</div>
		<div class="lists"></div>
	</div>

JS:
	
	 function infinitescroll(){
        if (loading) return;
        loading = true;
        pageNum++;
        UpdateAllGoodsList(TargetArea,inum);
    };

	function Update(TargetArea,pageNum,pageSize) {
        var param = {
            "pageNo": pageNum,
            "pageSize": pageSize
        };
        var url = "***";
        $.ajax({
            type: "***",
            url: url,
            data: param,
            dataType: "json",
            success: function (dataObj) {
                loading = false;
                console.log(dataObj);   
             },
			error: function (xhr, ajaxOptions, thrownError) {  //在offline或者数据传输失败时的错误提示
                if(pageNum!=1) pageNum--;	//页数要减1，在有网络的情况下再重新加载这个页面一次，以防这个页面的数据不显示
                setTimeout(function(){
                    TargetArea.remove(".errormessage");
                    TargetArea.append("<div class='col-100 errormessage' style='text-align:center;'><h3>加载失败</h3></div>");
                    $(".infinite-scroll-preloader").hide();
                    loading = false;
                },1000);
            }
		});

<span style="color: red;">PS:先了解原理，再去尝试写demo，上面代码仅提供思路。</span>
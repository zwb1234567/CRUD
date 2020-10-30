
$(".dropdown-toggle1").click(function(){
    //console.log("$(this .glyphicon)", $(this .glyphicon))
    $(".dropdown-toggle1").removeClass("thisopen");
    $(this).addClass("thisopen"); 
    $(".dropdown-toggle1  .glyphicon-menu-right").css({"color":"","font-weight":""});
	$(this).children(".glyphicon-menu-right").css({"color":"#4CAF50","font-weight":"900"});
});	

$("#btn-CarManager").click(function(){
	load();
})

$("#btn-Usermanager").click(function(){
	$.ajax({
        type: "GET",
        url: "/week2/UserManager.do",
        //contentType: "application/json; charset=utf-8",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",		
        dataType: "html",
        success: function (data) { 
        	$(".content_right").html(data);          
        },
        error: function (error) {
            alert("error=" + error);
        }
    });
})

$("#addModelButton").click(function(){
    $.ajax({
        type: "GET",
        url: "/week2/MainAddController.do", 
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
		//data:{ AlbumName: "shanghai", Entered: "5/9/2013" },
		data:{ CNO: $("#AddModelCNO").val(), CarNum: $("#AddModelCarNum").val(),
			CarPerson:$("#AddModelCarPerson").val(),CarType:$("#AddModelCarType").val(),
			CarDicretion:$("#AddModelCarDicretion").val()},
        dataType: "text",
        success: function (data) { 
        	if(data == "success")
        		{
	            	$("#myModal_add").modal('hide');
	            	$('#tb_departments').bootstrapTable('refresh'); 
	            	toastr.success('提交数据成功');
        		}
        	else if(data == "warning")
        		{
        			toastr.warning('请输入正确格式的数据！');
        		}
        	else if(data == "error0")
	    		{
	    			toastr.error('车牌号重复,请确认是否输出有误！');
	    		}
        	else if(data == "error1")
	    		{
	    			toastr.error('该车位已被其他车位使用！');
	    		}
        	else
	        	{
        			toastr.error('数据提交失败！');
	        	}
        },
        error: function (error) {
            alert("请求后台失败！");
        }
    });
}
);
$("#btn_delete").click(function(){
	var row=$("#tb_departments").bootstrapTable('getSelections');
	if(row.length == 0)
		{
			toastr.warning('请先选中要删除的行！');
		}
	else
		{
			$("#myModal_delete").modal("show"); 
		}
});
$("#delete_ok").click(function(){	
	var row=$("#tb_departments").bootstrapTable('getSelections');
	var json = JSON.stringify(row);//对象数组转成json格式传给后台		
		    $.ajax({
		        type: "GET",
		        url: "/week2/MainDeleteController.do", 
		        contentType: "application/x-www-form-urlencoded;charset=utf-8",
				data:{rows:json},
		        dataType: "text",
		        success: function (data) { 
		        	if(data == "success")
		        		{
		        			$('#tb_departments').bootstrapTable('refresh'); 
			            	toastr.success('数据删除成功！');
		        		}
		        	else
			        	{
		        			toastr.error('数据删除失败！');
			        	}
		        },
		        error: function (error) {
		            alert("请求后台失败！");
		        }
		    });		
});
$("#btn_edit").click(function(){
	var row=$("#tb_departments").bootstrapTable('getSelections');
	if(row.length == 0)
		{
			toastr.warning('请先选中要修改的行！');
		}
	else if(row.length > 1)
		{
			toastr.warning('请只选中一行进行修改！');			
		}
	else
		{
			$("#myModal_update").modal("show");
			//填数据
			$("#UpdateModelCNO").attr("value",row[0].CNO);
			$("#UpdateModelCarNum").attr("value",row[0].CarPlaceNum);
			$("#UpdateModelCarPerson").attr("value",row[0].CarPerson);			
			$("#UpdateModelCarType option").each(function(){
				if($(this).text() == row[0].Type)
					{$(this).prop("selected",true);return false;}
			})
			$("#UpdateModelCarDicretion option").each(function(){
				if($(this).text() == row[0].Dicretion)
					{$(this).prop("selected",true);return false;}
			})
		}
});
$("#UpdateModelButton").click(function(){
	var row=$("#tb_departments").bootstrapTable('getSelections');
	if($("#UpdateModelCNO").val() == "" || $("#UpdateModelCarNum").val() == "" || $("#UpdateModelCarPerson").val() == "")
		{
		toastr.warning('请输入正确格式的数据！');	
		}
	else
		{
	    $.ajax({
	        type: "GET",
	        url: "/week2/MainUpdateController.do", 
	        contentType: "application/x-www-form-urlencoded;charset=utf-8",
			//data:{ AlbumName: "shanghai", Entered: "5/9/2013" },
			data:{ CNO: $("#UpdateModelCNO").val(), CarNum: $("#UpdateModelCarNum").val(),
				CarPerson:$("#UpdateModelCarPerson").val(),CarType:$("#UpdateModelCarType").val(),
				CarDicretion:$("#UpdateModelCarDicretion").val(),intime:row[0].InTime},
	        dataType: "text",
	        success: function (data) { 
	        	if(data == "success")
	        		{
		            	$("#myModal_update").modal('hide');
		            	$('#tb_departments').bootstrapTable('refresh'); 
		            	toastr.success('修改数据成功');
	        		}

	        	else if(data == "error1")
		    		{
		    			toastr.error('该车位已被其他车位使用！');
		    		}
	        	else
		        	{
	        			toastr.error('数据提交失败！');
		        	}
	        },
	        error: function (error) {
	            alert("请求后台失败！");
	        }
	    });
		}
});


$(document).ready(function () {
	//初始化toastr
	toastr.options = {
			"positionClass":"toast-top-center",  //窗口显示位置
			"timeOut": "3000",
	};
	
  //调用函数，初始化表格
    initTable();
  
   //当点击查询按钮的时候执行,bootstrap-table前端分页是不能使用搜索功能，所以可以提取出来自定义搜索。后台代码，在后面给出
   // $("#queryBtn").bind("click", initTable);
   
    $(".dropdown-toggle1  .selected").css({"color":"#4CAF50","font-weight":"900"});//初始化导航
});
$("#btn_query").click(function(){
	initTable();
	//console.log());
});
function initTable(){
	$('#tb_departments').bootstrapTable('destroy');
    $("#tb_departments").bootstrapTable({
        url: '/week2/MainViewController.do',    //请求后台的URL（*）
        method: 'GET',                      //请求方式（*）
		locale: 'zh-CN',
        toolbar: '#toolbar',                //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色  
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式  asc升序 desc降序
        sortName :"CarPlaceNum",            //排序字段名
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber:1,                       //初始化加载第一页，默认第一页
        pageSize:7,                       //每页的记录行数（*） 
        pageList: [7,10,25,50,100],          //可供选择的每页的行数（*）
        //search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        showColumns: true,                  //是否显示所有的列
        showRefresh: true,                  //是否显示刷新按钮
        queryParamsType : "limit",
        queryParams: function(params) {//上传服务器的参数
            var temp = {
            		offset: params.offset,//从数据库第几条记录开始  
                    limit: params.limit,//找多少条  
                    //搜索按钮的参数
                    CNO:$("#txt_search_CNO").val(),
                    CarPerson:$("#txt_search_CarPerson").val(),
                    //排序参数
                    sortName:this.sortName,
                    sortOrder:this.sortOrder
                };
                return temp;
            },  
        //showExport: true,                   //是否显示输出
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
       // height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
        showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                   //是否显示父子表       
        responseHandler: responseHandler, // 请求成功后,渲染表格
        columns : [{
            checkbox: true                //全选按钮
        }, {
            field: 'CNO',               
            title: '车牌号',
            align: 'center'
        }, {
            field: 'CarPlaceNum',
            title: '车位号',
            align: 'center'
        }, {
            field: 'CarPerson',
            title: '车主姓名',
            align: 'center'
        }, {
            field: 'Type',
            title: '车位类型',
            align: 'center'
        },{
            field: 'Dicretion',
            title: '车位方向',
            align: 'center'
        },{
            field: 'InTime',
            title: '入场时间',
            align: 'center'
        },]
    })
}


function responseHandler(result) {  
    var temp = {
        // 下面这两个参数是必须有的, 名称不能变
        // 总的数量
        total : result.total,
        // 数据
        rows : result.rows
    };
    return temp;
}

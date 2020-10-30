

$("#query_User").click(function (){ 
	InitUserTable();
})


	var mydata = {   
			provinceList: [],
		    cityList:[]
	}
	var vp = new Vue({
		el: '#div_NewModelCity',
		data: mydata
	})
	var vc = new Vue({
	  el: '#div_NewModelProvince',
	  data: mydata,
	  created:function() {
		  this.queryProvince();
	  },
	  methods: {
	    queryProvince: function () {
	    	var temp = this;
			/*初始化省份下拉框*/
			 $.ajax({
		         type: "GET",
		         url: "/week2/QueryProvince.do",
		         contentType: "application/x-www-form-urlencoded;charset=utf-8",
		         data:{provinceid:""},
		         dataType: "json",	             
		         success: function (data) {  
		        	 temp.provinceList =  data;
		         },
		         error: function (error) {
		             alert("请求后台失败！");
		         }
		});
	    },
	    queryCity: function () {
	    	var temp = this;
	    	$("#NewModelCity").empty();//清空所有的城市opotion
	    	this.cityList = [];
	     	if($("#NewModelProvince").val() == "" || $("#NewModelProvince").val() == null) 
			{
				$("#div_NewModelProvince .ok").removeClass("img_ok");
				$("#div_NewModelCity .ok").removeClass("img_ok");
	 			$("#model_errorInfo2").html("必选省份!");
	 			$("#model_errorInfo3").html("必选城市!");
	 			
			}
	     	else
			{
				$("#model_errorInfo2").html(""); 
				$("#model_errorInfo3").html("");
				$("#div_NewModelProvince .ok").addClass("img_ok");
				
			}
			/*发ajax请求,初始化城市列表*/
			 $.ajax({
		         type: "GET",
		         url: "/week2/QueryProvince.do",
		         contentType: "application/x-www-form-urlencoded;charset=utf-8",
		         data:{provinceid:$("#NewModelProvince").val()},
		         dataType: "json",	             
		         success: function (data) {  
		        	 temp.cityList = data;
		        	 $("#div_NewModelCity .ok").addClass("img_ok");
		         },
		         error: function (error) {
		        	 
		             alert("请求后台失败！");
		         }
		}); 
	    }
	  }
	});

$("#btn_UpdateUser").click(function (){
	var row=$("#tb_UserTable").bootstrapTable('getSelections');
	
	if(row.length == 0)
		{
			toastr.warning('请先选中要修改的行！');
			return;
		}
	else if(row.length > 1)
		{
			toastr.warning('请只选中一行进行修改！');	
			return;
		}
	else
		{	
			$("#myModal_updateUser").modal("show");
			//填数据
			$("#UpdateModelUserName").attr("value",row[0].userName);
			$("#UpdateModelPsd").attr("value",row[0].password);
			$("#UpdateModelChrName").attr("value",row[0].chrName);
			$("#UpdateModelEmail").attr("value",row[0].email);
			$("#UpdateModelProvince option").each(function(){
				$(this).attr("selected",false);
			})
			$("#UpdateModelProvince option").each(function(){
        		if($(this).text() == row[0].province)
        			{
        			$(this).prop("selected",true);
        			queryCity();
        			return false;
        			}
        	});			 	
			$("#UpdateModelRole").attr("value",row[0].role);
		}
});
$("#UpdateModelProvince").change(function(){
	queryCity();
})
function queryCity(){
	var row=$("#tb_UserTable").bootstrapTable('getSelections');
	$("#UpdateModelCity").empty();//清空所有的城市opotion
	$.ajax({
        type: "GET",
        url: "/week2/QueryProvince.do",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        data:{provinceid:$("#UpdateModelProvince").val()},
        dataType: "json",	             
        success: function (data) {  
       	 //console.log(data);
       	 for(var i = 0;i < data.length; i++)
       		 {
       		    $("#UpdateModelCity").append("<option value='"+data[i].cityId+"'>"+data[i].cityName+"</option>");    			
       		 }
	       	$("#UpdateModelCity option").each(function(){
	    		if($(this).text() == row[0].city)
	    			{
	    			$(this).prop("selected",true);
	    			return false;
	    			}
	    	})
        },
        error: function (error) {
       	 
            alert("请求后台失败！");
        }
}); 	
}
$("#btn_updateUser").click(function(){
	var list = $("#form_updateUser").serializeArray();
	 //console.log(list);
	 var f = {};//声明一个对象
	 $.each(list,function(index,field){
	     f[field.name] = field.value;//通过变量，将属性值，属性一起放到对象中
	 });
	 //console.log(JSON.stringify(f));
	 var users = JSON.stringify(f);
	 $.ajax({
         type: "GET",
         url: "/week2/UserUpdateController.do",
         contentType: "application/x-www-form-urlencoded;charset=utf-8",
         data:{"user":users},
         dataType: "text",	             
         success: function (data) {  
        	 if(data == "success")
        		 {
        		 	toastr.success('数据修改成功！');
        		 	$('#tb_UserTable').bootstrapTable('refresh'); 
        		 	$("#myModal_updateUser").modal("hide");
        		 }
        	 else
        		 {
        		 toastr.success('数据修改失败！');
        		 }
         },
         error: function (error) {
        	 
             alert("请求后台失败！");
         }
}); 
	 
})
$("#btn_DeleteUser").click(function(){   
	var row=$("#tb_UserTable").bootstrapTable('getSelections');
	if(row.length == 0)
		{
			toastr.warning('请先选中要删除的行！');
			return;
		}
	else
		{
			$("#myModal_deleteUser").modal("show");			
		}
});
$("#btn_deleteUser").click(function(){ 
	var row=$("#tb_UserTable").bootstrapTable('getSelections');
	var json = JSON.stringify(row);//对象数组转成json格式传给后台
	//console.log(json);
	$.ajax({
        type: "GET",
        url: "/week2/DeleteUserController.do", 
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
		data:{rows:json},
        dataType: "text",
        success: function (data) { 
        	if(data == "success")
        		{
        			$('#tb_UserTable').bootstrapTable('refresh'); 
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
})
function InitUserTable(){
	var list = $("#formSearchUser").serializeArray();
	 //console.log(list);
	 var f = {};//声明一个对象
	 $.each(list,function(index,field){
	     f[field.name] = field.value;//通过变量，将属性值，属性一起放到对象中
	 })
	 var datas = JSON.stringify(f);
	 //console.log(JSON.stringify(f));
	 
	$('#tb_UserTable').bootstrapTable('destroy');
    $("#tb_UserTable").bootstrapTable({
        url: '/week2/UserManagerController.do',    //请求后台的URL（*）
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
                    data:datas,
                    //排序参数
                    //sortName:this.sortName,
                    //sortOrder:this.sortOrder
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
        responseHandler: function (result) {  
            var temp = {
                // 下面这两个参数是必须有的, 名称不能变
                // 总的数量
                total : result.total,        
                // 数据
                rows : result.rows
            };
            return temp;
        }, // 请求成功后,渲染表格
        columns : [{
            checkbox: true                //全选按钮
        }, {
            field: 'userName',               
            title: '用户名',
            align: 'center'
        }, {
            field: 'chrName',
            title: '中文名',
            align: 'center'
        }, {
            field: 'email',
            title: '邮箱',
            align: 'center'
        }, {
            field: 'province',
            title: '省份',
            align: 'center'
        },{
            field: 'city',
            title: '城市',
            align: 'center'
        },{
            field: 'role',
            title: '角色',
            align: 'center'
        },]
    })
}

$("#NewModelUserName").blur(function(){
	if($("#NewModelUserName").val() == "" || $("#NewModelUserName").val() == null) 
		{			
			$("#div_NewModelUserName .error").removeClass("img_ok");
			$("#div_NewModelUserName .ok").removeClass("img_ok");
			$("#model_errorInfo0").html("用户名不能空!");
			
		}
	else
		{
			$("#model_errorInfo0").html("");
			var patt = /^[a-zA-Z]{1}[a-zA-Z\d]{3,14}$/;//以字母开头，由字母和数字组成，长度4-15;
			if(patt.test($("#NewModelUserName").val()))
				{
					$("#div_NewModelUserName .error").removeClass("img_ok");
					$("#div_NewModelUserName .ok").addClass("img_ok");
									
				}	
			else{
				$("#div_NewModelUserName .ok").removeClass("img_ok");
				$("#div_NewModelUserName .error").addClass("img_ok");
				toastr.warning("用户名必须是字母开头，由字母和数字组成，\n并且长度4-15个字符");
			
			}
		} 
});
$("#NewModelName").blur(function(){
	if($("#NewModelName").val() == "" || $("#NewModelName").val() == null) 
		{			
			$("#div_NewModelName .error").removeClass("img_ok");
			$("#div_NewModelName .ok").removeClass("img_ok");	
			$("#model_errorInfo1").html("真实名不能空!");
					
		}
	else
		{
			$("#model_errorInfo1").html("");
			var patt = /^[\u4e00-\u9fa5]{2,4}$/;//真实姓名只能是2-4长度的中文
			if(patt.test($("#NewModelName").val()))
				{
					$("#div_NewModelName .error").removeClass("img_ok");
					$("#div_NewModelName .ok").addClass("img_ok");
										
				}	
			else
				{
					$("#div_NewModelName .ok").removeClass("img_ok");
					$("#div_NewModelName .error").addClass("img_ok");
					toastr.warning("真实姓名只能是2-4长度的中文");
					
				}				
		}
		 
});
$("#NewModelProvince").blur(function(){
 	if($("#NewModelProvince").val() == "" || $("#NewModelProvince").val() == null) 
		{
 			$("#model_errorInfo2").html("必选省份!");
 			
		}
	else
		{
			$("#model_errorInfo2").html("");
			
		}
		  
});
$("#NewModelCity").blur(function(){
 	if($("#NewModelCity").val() == "" || $("#NewModelCity").val() == null) 
		{
 			//$("#div_NewModelCity .ok").removeClass("img_ok");
 			$("#model_errorInfo3").html("必选城市!");
 			
		}
	else
		{
			$("#model_errorInfo3").html("");
			
		}
		  
});
$("#NewModelEmail").blur(function(){
 	if($("#NewModelEmail").val() == "" || $("#NewModelEmail").val() == null) 
		{
	 		$("#div_NewModelEmail .error").removeClass("img_ok");
			$("#div_NewModelEmail .ok").removeClass("img_ok");
 			$("#model_errorInfo4").html("邮箱不能空!");
 			
		}
	else
		{
			$("#model_errorInfo4").html(""); 
			var patt = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
			if(patt.test($("#NewModelEmail").val()))
				{
					$("#div_NewModelEmail .error").removeClass("img_ok");
					$("#div_NewModelEmail .ok").addClass("img_ok");
										
				}	
			else
				{
					$("#div_NewModelEmail .ok").removeClass("img_ok");
					$("#div_NewModelEmail .error").addClass("img_ok");
					toastr.warning("邮箱格式不正确！");
					
				}						
		}
		 
});
$("#NewModelPsd").blur(function(){
 	if($("#NewModelPsd").val() == "" || $("#NewModelPsd").val() == null) 
		{
	 		$("#div_NewModelPsd .error").removeClass("img_ok");
			$("#div_NewModelPsd .ok").removeClass("img_ok");
 			$("#model_errorInfo5").html("密码不能空!");
 			
		}	
	else
		{
			$("#model_errorInfo5").html("");
			var patt = /^.{4,15}$/;
			if(patt.test($("#NewModelPsd").val()))
				{
					$("#div_NewModelPsd .error").removeClass("img_ok");
					$("#div_NewModelPsd .ok").addClass("img_ok");
					if($("#NewModelpsd2").val() == $("#NewModelPsd").val())
						{
						 	$("#model_errorInfo6").html("");
							$("#div_NewModelpsd2 .error").removeClass("img_ok");
							$("#div_NewModelpsd2 .ok").addClass("img_ok");
							
						}
					else
						{
							if($("#NewModelpsd2").val() != "")
							{
								$("#model_errorInfo6").css("padding","0 0 0 18px");
								$("#div_NewModelpsd2 .ok").removeClass("img_ok");
								$("#div_NewModelpsd2 .error").addClass("img_ok");			 	
								$("#model_errorInfo6").html("密码不一致!");
								
							}
						}
										
				}	
			else
				{
					$("#div_NewModelPsd .ok").removeClass("img_ok");
					$("#div_NewModelPsd .error").addClass("img_ok");
					toastr.warning("密码长度为4-15位字符！");
					
				}			
		}
		  
});
$("#NewModelpsd2").bind('input propertychange',function(){
	var patt = /^.{4,15}$/;
	if($("#NewModelpsd2").val() == $("#NewModelPsd").val() && patt.test($("#NewModelPsd").val()))
		{
			$("#div_NewModelpsd2 .error").removeClass("img_ok");
			$("#div_NewModelpsd2 .ok").addClass("img_ok");	
			$("#model_errorInfo6").html("");
		}
	else{
		$("#div_NewModelpsd2 .ok").removeClass("img_ok");
		$("#div_NewModelpsd2 .error").addClass("img_ok");
		if($("#NewModelpsd2").val() != $("#NewModelPsd").val()){
			$("#model_errorInfo6").css("padding","0 0 0 18px");
			$("#model_errorInfo6").html("密码不一致!");
		}
	}
});
$("#NewModelpsd2").blur(function(){
 	if($("#NewModelpsd2").val() == "" || $("#NewModelpsd2").val() == null) 
 		{
	 		$("#div_NewModelpsd2 .error").removeClass("img_ok");
			$("#div_NewModelpsd2 .ok").removeClass("img_ok");
			$("#model_errorInfo6").css("padding","0 5px 0 0");
 			$("#model_errorInfo6").html("密码不能空!");
 			
 		}		
	else
		{
			$("#model_errorInfo6").html("");
		 	if($("#NewModelpsd2").val() != $("#NewModelPsd").val())
				 {
				 	$("#model_errorInfo6").css("padding","0 0 0 18px");
				 	$("#div_NewModelpsd2 .ok").removeClass("img_ok");
				 	$("#div_NewModelpsd2 .error").addClass("img_ok");			 	
				 	$("#model_errorInfo6").html("密码不一致!");
				 	
				 }				
			else
			 	{			 	
				 	var patt = /^.{4,15}$/;
				 	if(patt.test($("#NewModelPsd").val()))
				 	{					 	
						$("#div_NewModelpsd2 .error").removeClass("img_ok");
						$("#div_NewModelpsd2 .ok").addClass("img_ok");	
						
				 	}	
				 	else
				 	{
						$("#div_NewModelpsd2 .ok").removeClass("img_ok");
						$("#div_NewModelpsd2 .error").addClass("img_ok");
						toastr.warning("密码长度为4-15位字符！");
						
				 	}
			 	}			
		}		   
});
$("#lookPsd").click(function(){
	if($("#NewModelpsd2").attr("type") == "password")
		$("#NewModelpsd2").attr("type","text");
	else
		$("#NewModelpsd2").attr("type","password");
});
$("#lookpsd").click(function(){
	if($("#NewModelPsd").attr("type") == "password")
		$("#NewModelPsd").attr("type","text");
	else
		$("#NewModelPsd").attr("type","password");
});

/*
 * 点击注册按钮注册一个用户
 */
 $("#addModelButton").click(function(){
	 var flag = true;
	 if($("#myModal_new .img_ok").length != 7)
		 {
		 	//console.log("ss");
			toastr.warning("请输入正确格式的数据！"); 
 			return ;
		 }
	 //console.log("xx");
	 $("#myModal_new .img_ok").each(function(){
		 	if($(this).attr("src") != "img/ok.png")
	 		{
	 			toastr.warning("请输入正确格式的数据！"); 
	 			flag = false;
	 			return false;//提前结束循环
	 		}
	 })
	 if(flag)
		 {
		 	 $.ajax({
		         type: "GET",
		         url: "/week2/UserCRUDController.do",
		         contentType: "application/x-www-form-urlencoded;charset=utf-8",
		         data:{userName:$("#NewModelUserName").val(),chrName:$("#NewModelName").val(),
		        	 province:$("#NewModelProvince").find("option:selected").val(),
		        	 city:$("#NewModelCity").find("option:selected").val(),
		        	 email:$("#NewModelEmail").val(),password:$("#NewModelpsd2").val()},
		         dataType: "text",	           
		         success: function (data) {  
		        	 if(data == "0")
		        		 {
		        			 toastr.error("该用户名已被其他用户使用！"); 
		        		 }
		        	 else if(data == "1")
		        		 {
		        		 	$("#myModal_new").modal('hide');
		        		 	$('#tb_UserTable').bootstrapTable('refresh'); 
		        		 	toastr.success("数据提交成功！");
		        		 }
		        	 else
		        		 {
		        		 	toastr.error("数据提交失败！");
		        		 }
		         },
		         error: function (error) {
		             alert("请求后台失败！");
		         }
			})
		}
 });
 $(document).ready(function () {
		InitUserTable();
		$.ajax({
	        type: "GET",
	        url: "/week2/QueryProvince.do",
	        contentType: "application/x-www-form-urlencoded;charset=utf-8",
	        data:{provinceid:""},
	        dataType: "json",	             
	        success: function (data) {  
	       	for(var i = 0;i<data.length;i++)
	       		{
	       		 $("#UpdateModelProvince").append("<option value="+data[i].provinceId+">"+data[i].provinceName+"</option>");
	       		}
	       
	        },
	        error: function (error) {
	            alert("请求后台失败！");
	        }
	});	
	});

$(document).ready(function () {
	//初始化toastr
	toastr.options = {
			"positionClass":"toast-top-center",  //窗口显示位置
			"timeOut": "3500",
	}
	getCookie(); //检查本地是否有cookie如果有cookie就自动登陆 
}
);

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
  /*computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  },*/
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
})

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
	if($("#NewModelpsd2").val() == $("#NewModelPsd").val() &&　patt.test($("#NewModelPsd").val()))
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
/*登陆数据校验*/
$("#userName").blur(function(){
	if($("#userName").val() == "" || $("#userName").val() == null) 			
		$("#error_Username").html("用户名不能为空！");	
	else
		$("#error_Username").html(""); 
});
$("#password").blur(function(){
	if($("#password").val() == "" || $("#password").val() == null) 
		$("#error_Userpsd").html("密码不能为空！");
	else
		$("#error_Userpsd").html(""); 
});
$("#VerificationCode").blur(function(){
	if($("#VerificationCode").val() == "" || $("#VerificationCode").val() == null) 
		$("#error_yzm").html("验证码不能为空！");
	else
		$("#error_yzm").html(""); 
});
/*
 * 密码的显示与隐藏
 */
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
	 
	/* var list = $("#form_new").serializeArray();
	 console.log(list);
	 var f = {};//声明一个对象
	 $.each(list,function(index,field){
	     f[field.name] = field.value;//通过变量，将属性值，属性一起放到对象中
	 })
	 console.log(JSON.stringify(f));  */
	 
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
	 });
	 //console.log(flag);
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
		        		 	toastr.success("注册成功！");
		        		 }
		        	 else
		        		 {
		        		 	toastr.error("注册失败！");
		        		 }
		         },
		         error: function (error) {
		             alert("请求后台失败！");
		         }
			})
		}
 });

function setCookie() {
    var userName = $("#userName").val(); // 用户名
    var passWord = $("#password").val(); //密码
    var cookieName = 'userInfo' ;// cookie名称
    var data = {
        username: userName,
        password: passWord
    };
    var d = new Date();
    var saveTime = 7;// cookie保存时间（单位：天）
    d.setDate(d.getDate() + saveTime);
    document.cookie = cookieName + '=' + JSON.stringify(data) + ';expires=' + d.toGMTString();
}  


function getCookie() {
    var cookie = document.cookie;
    var cookieName = 'userInfo' ;// cookie名称
    var arr = cookie.split('; '); // 将cookie信息和时间戳拆分为数组
    var userInfo = null;
    for (var i = 0; i < arr.length; i++) {
        var tempArr = arr[i].split('='); // 将cookie名称和data拆分开，分别是数组的第一个元素和第二个元素
        if (tempArr[0] === cookieName) {
            userInfo = JSON.parse(tempArr[1]);
        }
    }
    var obj = eval(userInfo);
     
    //console.log(obj);  
    
    if (userInfo) {
		 $.ajax({
	            type: "POST",
	            url: "/week2/LoginController.do",
	            contentType: "application/x-www-form-urlencoded;charset=utf-8",
	            data:{userName:obj.username,password:obj.password,VerificationCode:'0'},
	            dataType: "text",	           
	            success: function (data) {  
	            	if(data == "success")
	            		{
	            			window.location.href = "main.jsp";  
	            		}	            		          			            	
	            },
	            error: function (error) {
	                alert("请求后台失败！");
	            }
	})
        //console.log(); 
    }
}
 

	$("#btn_login").click(function(){
		 $.ajax({
	            type: "POST",
	            url: "/week2/LoginController.do",
	            contentType: "application/x-www-form-urlencoded;charset=utf-8",
	            data:{userName:$("#userName").val(),password:$("#password").val(),VerificationCode:$("#VerificationCode").val()},
	            dataType: "text",	           
	            success: function (data) { 
	            	if(data != "success")
	            		{
	            			toastr.error(data);  
	            		}
	            	else{
	            		if( $('#checkbox').is(':checked'))
	            			{
	            				setCookie(); //如果勾选就设置cookie
	            			}         			
	            		window.location.href = "main.jsp";            		
	            	}
	            },
	            error: function (error) {
	                alert("error=" + error);
	            }
	})
	});


      var img = $("#yzmimg");
      //console.log("img", img)
      img.click(function(){
        img.attr('src', '/week2/CreateVCodeImageController.do?t=' + Math.random());
      });


var index = 1;
var timer;
timer = setInterval(function () {
index%=5;
$("body").css("transition","none");
$("body").css("background-image","url(img/login" + index+ ".jpg)"); 
$("body").css("transition","all 3s ease");
index++;
},4500);


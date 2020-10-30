<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
 <link rel="stylesheet" type ="text/css" href="CSS/newModel.css" >
</head>
<body>
    	<div class="panel panel-default panel_User">
            <div class="panel-heading">查询条件</div>
            <div class="panel-body">
                <form id="formSearchUser" class="form-horizontal">
                    <div class="form-group" style="margin-top:5px">
	                    <div class = "row">
	                        <label class="control-label col-sm-2" for="UserName">用户名：</label>
	                        <div class="col-sm-3">
	                            <input type="text" class="form-control" id="UserName" placeholder="模糊搜索..." name = "suserName">
	                        </div>
	                        <label class="control-label col-sm-2" for="email">邮箱：</label>
	                        <div class="col-sm-3">
	                            <input type="text" class="form-control" id="email" placeholder="模糊搜索..." name = "semail">
	                        </div>   
	                    </div>                     
	                    <div class = "row">
	                        <label class="control-label col-sm-2" for="ChrName">中文名：</label>
	                        <div class="col-sm-3">
	                            <input type="text" class="form-control" id="ChrName" placeholder="模糊搜索..." name = "schrName">
	                        </div>
	                        <label class="control-label col-sm-2" for="Province">省份：</label>
	                        <div class="col-sm-3">
	                            <input type="text" class="form-control" id="Province" placeholder="模糊搜索..." name = "sprovince">
	                        </div>  
	                        <div class="col-sm-2" style="text-align:left;">
                            	<button type="button" style="margin-left:40px" id="query_User" class="btn btn-success">查询</button>
                        	</div> 
	                    </div> 
                    </div>
                </form>
            </div>
        </div>
        <div id="toolbar" class="btn-group">
            <button id="btn_AddUser" type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal_new">
                <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
            </button>
            <button id="btn_UpdateUser" type="button" class="btn btn-primary">
                <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>修改
            </button>
            <button id="btn_DeleteUser" type="button" class="btn btn-danger">
                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除
            </button>
        </div>
       <table id="tb_UserTable"></table> 
       
    <!--注册模态框-->
	<div class="modal fade add_modle" tabindex="-1" role="dialog" id = "myModal_new" data-backdrop="static" data-keyboard="false">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" style = "color:white">新增</h4>   	             
	      </div>
	      <div class="modal-body">
	      <form id = "form_new">
 	         <div class="row">
              	<label for="NewModelUserName" class="col-sm-3 col-sm-offset-2 control-label">用户名：</label>
              	<div class="col-sm-6" style="margin-left:-50px;" id = "div_NewModelUserName">
              	<input type="text" class="form-control" id="NewModelUserName" placeholder="用户名" name="NewModelUserName">
              	<img src="img/username1.png" alt="" class="img_newuser">
              	<img src="img/ok.png" alt="" class="ok">
              	<img src="img/error.png" alt="" class="error">
              	</div>
              	<div class = "col-sm-2 model_errorInfo" id = "model_errorInfo0"></div>	            
            </div>
            <div class="row">
              	<label for="NewModelName" class="col-sm-3 col-sm-offset-2 control-label">真实姓名：</label>
              	<div class="col-sm-6" style="margin-left:-50px;" id = "div_NewModelName">
              	<input type="text" class="form-control" id="NewModelName" placeholder="真实姓名" name="NewModelName">
              	<img src="img/username1.png" alt="" class="img_newuser">
              	<img src="img/ok.png" alt="" class="ok">
              	<img src="img/error.png" alt="" class="error">
              	</div>
              	<div class = "col-sm-2 model_errorInfo" id = "model_errorInfo1"></div>	         
            </div>
            <div class="row">
              	<label for="NewModelProvince" class="col-sm-3 col-sm-offset-2 control-label">选择省份：</label>
              	<div class="col-sm-6" style = "margin-left:-50px;" id = "div_NewModelProvince">             	
				    <select class="form-control" id = "NewModelProvince" name = "selectProvince" @change = "queryCity()">
 				         <option value = "">请选择省份</option> 
 				         <option v-for = 'province in provinceList' :value = 'province.provinceId'>
 				         {{province.provinceName}}
 				         </option>
				    </select>
				    <img src="img/city.png" alt="" class="img_newuser"> 	
				    <img src="img/ok.png" alt="" class="ok">		     
				</div> 
				  <div class = "col-sm-2 model_errorInfo" id = "model_errorInfo2"></div>         				     		       
            </div>
            <div class="row">
              	<label for="NewModelCity" class="col-sm-3 col-sm-offset-2 control-label">选择城市：</label>
              	<div class="col-sm-6" style = "margin-left:-50px;" id = "div_NewModelCity">              
				    <select class="form-control" id = "NewModelCity" name = "selectCity">
				        <option value = "">请选择城市</option>
				        <option v-for = 'city in cityList' :value = 'city.cityId'>
				        {{city.cityName}}
				        </option>
				    </select>  
				    <img src="img/city.png" alt="" class="img_newuser">
				    <img src="img/ok.png" alt="" class="ok">
              	</div>
              	<div class = "col-sm-2 model_errorInfo" id = "model_errorInfo3"></div>            				     		       
            </div> 
            <div class="row">
              	<label for="NewModelEmail" class="col-sm-3 col-sm-offset-2 control-label">邮箱：</label>
              	<div class="col-sm-6" style="margin-left:-50px;" id = "div_NewModelEmail">
              	<input type="text" class="form-control" id="NewModelEmail" placeholder="邮箱" name="NewModelEmail">
              	<img src="img/email.png" alt="" class="img_newuser">
              	<img src="img/ok.png" alt="" class="ok">
              	<img src="img/error.png" alt="" class="error">
              	</div>
              	<div class = "col-sm-2 model_errorInfo" id = "model_errorInfo4"></div>	         
            </div>            
            <div class="row">
              	<label for="NewModelPsd" class="col-sm-3 col-sm-offset-2 control-label">密码：</label>
              	<div class="col-sm-6" style="margin-left:-50px;" id = "div_NewModelPsd">
              	<input type="password" class="form-control" id="NewModelPsd" placeholder="密码" name="NewModelPsd">
              	<img src="img/psd1.png" alt="" class="img_newuser"> 
              	<img src="img/lookPsd.png" alt="" class="lookPsd" id = "lookpsd">
              	<img src="img/ok.png" alt="" class="ok">
              	<img src="img/error.png" alt="" class="error">
              	</div>
              	<div class = "col-sm-2 model_errorInfo" id = "model_errorInfo5"></div>	         
            </div>
            <div class="row">
              	<label for="NewModelpsd2" class="col-sm-3 col-sm-offset-2 control-label">确认密码：</label>
              	<div class="col-sm-6" style="margin-left:-50px;" id = "div_NewModelpsd2">
              	<input type="password" class="form-control" id="NewModelpsd2" placeholder="确认密码" name="NewModelpsd2">
              	<img src="img/psd1.png" alt="" class="img_newuser">
              	<img src="img/lookPsd.png" alt="" class="lookPsd" id = "lookPsd"> 
              	<img src="img/ok.png" alt="" class="ok">
              	<img src="img/error.png" alt="" class="error">
              	</div>
              	<div class = "col-sm-2 model_errorInfo" id = "model_errorInfo6"></div>	         
            </div>  
            </form>                                               
	      </div>
	      <div class="modal-footer">	      		     
	        <button type="button" class="btn btn-info" id = "addModelButton">确定</button> 
	      </div>
	    </div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->   
		<!--修改模态框-->
	<div class="modal fade add_modle" tabindex="-1" role="dialog" id = "myModal_updateUser">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" style = "color:white">修改</h4>
	      </div>
	      <form id = "form_updateUser">
	      <div class="modal-body">
	        <div class="row">
              	<label for="UpdateModelUserName" class="col-sm-3 col-sm-offset-2 control-label">用户名：</label>
              	<div class="col-sm-6" style="margin-left:-50px;">
              	<input type="text" class="form-control" id="UpdateModelUserName" placeholder="用户名" name="userName"  readonly>
              	</div>	         
            </div>
            <div class="row">
              	<label for="UpdateModelPsd" class="col-sm-3 col-sm-offset-2 control-label">密码：</label>
              	<div class="col-sm-6" style="margin-left:-50px;">
              	<input type="text" class="form-control" id="UpdateModelPsd" placeholder="密码" name="password" >
              	</div>	         
            </div>
            <div class="row">
              	<label for="UpdateModelChrName" class="col-sm-3 col-sm-offset-2 control-label">中文名：</label>
              	<div class="col-sm-6" style="margin-left:-50px;">
              	<input type="text" class="form-control" id="UpdateModelChrName" placeholder="中文名" name="chrName">
              	</div>	         
            </div>
            <div class="row">
              	<label for="UpdateModelEmail" class="col-sm-3 col-sm-offset-2 control-label">邮箱：</label>
              	<div class="col-sm-6" style="margin-left:-50px;">
              	<input type="text" class="form-control" id="UpdateModelEmail" placeholder="邮箱" name="email">
              	</div>	         
            </div>
            <div class="row">
              	<label for="UpdateModelProvince" class="col-sm-3 col-sm-offset-2 control-label">省份：</label>
              	<div class="col-sm-6" style = "margin-left:-50px;" id = "div_UpdateModelProvince">
				    <select class="form-control" id = "UpdateModelProvince" name = "province"> 
				    </select>      
				</div>          				     		       
            </div>
            <div class="row">
              	<label for="UpdateModelCity" class="col-sm-3 col-sm-offset-2 control-label">城市：</label>
              	<div class="col-sm-6" style = "margin-left:-50px;" id = "div_UpdateModelCity">              
				    <select class="form-control" id = "UpdateModelCity" name = "city">
				    </select>  
              	</div>            				     		       
            </div> 
            <div class="row">
              	<label for="UpdateModelRole" class="col-sm-3 col-sm-offset-2 control-label">角色：</label>
              	<div class="col-sm-6" style="margin-left:-50px;">
              	<select class="form-control" id="UpdateModelRole" name="role">
              	<option value = "1">管理员</option>
              	<option value = "2">值班员</option>
              	<option value = "3">用户</option>
              	</select>             	
              	</div>	         
            </div>
	      </div>
	      </form>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	        <button type="button" class="btn btn-primary" id = "btn_updateUser">确认</button>
	      </div>
	    </div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
		<!-- 删除模态框 -->
	<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" id = "myModal_deleteUser">
	  <div class="modal-dialog modal-sm" role="document">
	    <div class="modal-content" style = "border:none">
	     <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" style = "color:white">删除确认</h4>
	      </div>
	      <div class="modal-body">
	        <p style = "margin:0 0 0 83px">是否确认删除?</p>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	        <button type="button" class="btn btn-success" data-dismiss="modal" id = "btn_deleteUser">确认</button>
	      </div> 
	    </div>
	  </div>
	</div>
</body>
<script> 
    $.getScript("JS/UserManger.js", function () { });   
</script>
</html>
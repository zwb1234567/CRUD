package controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
//import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import dao.CRUDUserDao;
import net.sf.json.JSONArray;
import vo.User;

//import vo.User;




/**
 * Servlet implementation class UserManagerController
 */
@WebServlet("/UserManagerController.do")
public class UserManagerController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UserManagerController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		
		String data = request.getParameter("data");
		//User res = new Gson().fromJson(data, User.class);//转成实体对象
		JsonObject Data = new JsonParser().parse(data).getAsJsonObject();//转化成JsonObject类型的对象
		
		String offset = request.getParameter("offset");
		String limit = request.getParameter("limit");
		String username = Data.get("suserName").getAsString();
		String chrname = Data.get("schrName").getAsString();
		String email = Data.get("semail").getAsString();
		String province = Data.get("sprovince").getAsString();
		
		CRUDUserDao dao = new CRUDUserDao();
		ArrayList<User> list = dao.finAllUser(username, chrname, email, province,
				Integer.parseInt(offset), Integer.parseInt(limit));
		if(list != null)
		{
			int total = dao.finAllUserCount(username, chrname, email, province);
			String rowList = new Gson().toJson(list);
			String x = "{rows:" + rowList + ",total:" + total + "}";
			JsonObject userList = new JsonParser().parse(x).getAsJsonObject();
			//System.out.println(xx);
			out.print(new Gson().toJson(userList)); 
		}
		dao.close();
		out.close();
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}

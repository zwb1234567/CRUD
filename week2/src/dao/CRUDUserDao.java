package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import vo.User;
import dbc.DataBaseConnection;

public class CRUDUserDao {
	private Connection con =null;
	private PreparedStatement pst = null;
	
	public CRUDUserDao(){
		super();	
		this.con =  new DataBaseConnection().getConnection();
	}
	
	public ArrayList<User> finAllUser(String username,String chrname,String email,String province,int num1,int num2){
		ArrayList<User> list = new ArrayList<User>();
		ResultSet rs = null; 
		String sql = "select a.userName,a.password,a.chrName,c.RoleName,b.parentname,b.name,a.email from users a,area b,user_role c "
				+ " where a.province = b.parentid  and a.city = b.id and a.role = c.RoleId ";
		if(username != "" && username != null)
		{sql+= " and userName like '%"+username+"%'";}
		if(chrname !="" && chrname != null)
		{sql+= " and chrName like '%"+chrname+"%'";}
		if(email !="" && email != null)
		{sql+= " and email like '%"+email+"%'";}
		if(province !="" && province != null)
		{sql+= " and b.parentname like '%"+province+"%'";}
		sql += " limit ?,?";
		try {
			pst = con.prepareStatement(sql);
			pst.setInt(1, num1);
			pst.setInt(2, num2);
			rs = pst.executeQuery();
			while(rs.next())
			{
				User user = new User();
				user.setUserName(rs.getString(1));
				user.setPassword(rs.getString(2));
				user.setChrName(rs.getString(3));
				user.setRole(rs.getString(4));
				user.setProvince(rs.getString(5));
				user.setCity(rs.getString(6));
				user.setEmail(rs.getString(7));
				list.add(user);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		try {
			rs.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return list;				
	}
	public int finAllUserCount(String username,String chrname,String email,String province){
		int count = 0;
		ResultSet rs = null; 
		String sql = "select a.userName,a.chrName,a.email,b.name from users a,area b "
				+ " where a.province = b.id ";
		if(username != "" && username != null)
		{sql+= " and userName like '%"+username+"%'";}
		if(chrname !="" && chrname != null)
		{sql+= " and chrName like '%"+chrname+"%'";}
		if(email !="" && email != null)
		{sql+= " and email like '%"+email+"%'";}
		if(province !="" && province != null)
		{sql+= " and name like '%"+province+"%'";}
		try {
			pst = con.prepareStatement(sql);
			rs = pst.executeQuery();
			while(rs.next())
			{
				count++;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		try {
			rs.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return count;				
	}
	public boolean deleteByUserName(String str){
		boolean result =  false;
		String sql = "delete from users where userName = ? ";
		try {		
			pst = con.prepareStatement(sql);
			pst.setString(1, str);
			if(pst.executeUpdate()>0)
			{
				result = true;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	public boolean updateByUserName(User user){
		boolean result =  false;
		String sql = "update users SET password = ?, chrName = ?, role = ? ,province = ?,city = ?,"
				+ " email = ? where userName = ? ";
		try {
			pst = con.prepareStatement(sql);			
			pst.setString(1,user.getPassword());
			pst.setString(2, user.getChrName());
			pst.setString(3, user.getRole());
			pst.setString(4, user.getProvince());
			pst.setString(5, user.getCity());
			pst.setString(6, user.getEmail());
			pst.setString(7, user.getUserName());
			if(pst.executeUpdate()>0)
			{
				result = true;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}
	public void close(){
		try {
			this.pst.close();
			this.con.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}		
	}
}

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package DAO;

import BDconec.dbKB;
import Model.LoginModel;
import java.sql.ResultSet;

/**
 *
 * @author Kewin
 */
public class LoginDAO {
    int rspta=0;
    String sql="";
    ResultSet rs=null;
    dbKB cn=new dbKB();
    public int validarLogin(LoginModel lm) throws Exception{
        sql="SELECT COUNT(id) as cantidad FROM `login` WHERE usuario='"+lm.getUsuario()+"' AND clave='"+lm.getClave()+"'";
        rs=cn.ejecutarConsulta(sql);
        while(rs.next()){
            rspta=rs.getInt("cantidad");
        }
        
        return rspta;
        
    }
    
}

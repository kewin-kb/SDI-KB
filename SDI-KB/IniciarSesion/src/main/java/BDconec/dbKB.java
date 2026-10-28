/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package BDconec;

import java.sql.*;

/**
 *
 * @author Kewin
 */
public class dbKB {

    static String url = "jdbc:mysql://localhost:3306/sdi-kb";
    static String user = "root";
    static String pass = "";
    static String clase = "com.mysql.cj.jdbc.Driver";

    public static Connection conectar() throws ClassNotFoundException {
        Connection conn = null;
        try {
            Class.forName(clase);
            conn = DriverManager.getConnection(url,user,pass);
            System.out.println("Conexion exitosa");

        } catch (SQLException e) {
            System.out.println(e);
        }
        return conn;
    }
    public ResultSet ejecutarConsulta (String sql) throws Exception{
        Statement st=null;
        st=conectar().createStatement();
        ResultSet rs=st.executeQuery(sql);
        return rs;
    }
    public void desconectar() throws SQLException, ClassNotFoundException{
        conectar().close();
    }
}

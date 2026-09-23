/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package login.iniciarsesion;

import java.sql.*;

/**
 *
 * @author Kewin
 */
public class dbKB {

    static String url = "jdbc:mysql://localhost:3306/sdi-kb";
    static String user = "root";
    static String pass = "";

    public static Connection conectar() {
        Connection conn = null;
        try {
            conn = DriverManager.getConnection(url,user,pass);
            System.out.println("Conexion exitosa");

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return conn;
    }
}

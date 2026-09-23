/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package login.crud;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;


/**
 *
 * @author Kewin
 */
public class Conector {

    String url = "jdbc:mysql://localhost:3306/sdi-kb";
    String user = "root";
    String password = "";
    Statement stmt = null;
    Connection conn = null;

    public Connection conecta() {
        try {
            conn = DriverManager.getConnection(url, user, password);
            stmt = conn.createStatement();
            return conn;

        } catch (SQLException ex) {

        }
        return null;
    }
}

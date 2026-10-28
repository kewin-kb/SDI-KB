/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package login.login;

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
    public Statement stmt = null;
    Connection conn = null;

    public Connection conecta() throws ClassNotFoundException {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(url, user, password);
            stmt = conn.createStatement();
            return conn;

        } catch (SQLException ex) {
            System.out.println("error:" + ex);

        }
        return null;
    }

    public Statement getStatement() {
        return stmt;
    }
}

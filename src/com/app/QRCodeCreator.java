package com.app;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;

import com.app.utils.QRUtils;
import com.google.zxing.WriterException;
import org.json.simple.JSONObject;

/**
 * Created by wmdcprog on 11/20/2017.
 */
public class QRCodeCreator extends HttpServlet {

    private int qrCounter = 1;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.setContentType("application/json");

        PrintWriter out = response.getWriter();

        String fullname = request.getParameter("fullname");
        String company = request.getParameter("company");
        String jobPosition = request.getParameter("jobPosition");
        String address = request.getParameter("address");
        String mobile = request.getParameter("mobile");
        String email = request.getParameter("email");
        String website = request.getParameter("website");

        String qrCodeText = fullname + '\n' + company + '\n' + jobPosition + '\n' + address + '\n' +
                mobile + '\n' + email + '\n' + website;

        String filePath = "C:\\qrcodes\\qrcode_"+qrCounter+".png";
        File qrFile = new File(filePath);

        JSONObject responseJson = new JSONObject();

        try
        {
            QRUtils.createQRImage(qrFile, qrCodeText, 300, "png");

            responseJson.put("success", true);
            responseJson.put("link", "C:\\qrcodes\\qrcode_"+qrCounter+".png");

            ++qrCounter;

            out.println(responseJson);
        }
        catch (WriterException we)
        {
            we.printStackTrace();

            responseJson.put("success", false);
            responseJson.put("reason", we.getMessage());
            out.println(responseJson);
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}

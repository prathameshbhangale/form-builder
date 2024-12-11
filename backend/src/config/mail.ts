import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
    },
});


export const sendEmail = async (to: string, subject: string, htmlContent: string) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender email
            to: to, // Recipient email
            subject: subject, // Email subject
            html: htmlContent, // Email body text
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

function generateTemporaryPasswordEmail(temp_password: string): string {
    return `
        <html>
            <head>
            <style>
                body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                padding: 20px;
                }
                .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
                h1 {
                color: #4CAF50;
                text-align: center;
                }
                .content {
                margin-top: 20px;
                font-size: 16px;
                line-height: 1.6;
                }
                .password {
                background-color: #f1f1f1;
                padding: 10px;
                border-radius: 5px;
                font-size: 18px;
                font-weight: bold;
                color: #333;
                }
                .footer {
                text-align: center;
                margin-top: 30px;
                font-size: 14px;
                color: #888;
                }
            </style>
            </head>
            <body>
            <div class="container">
                <h1>Temporary Password for Your Account</h1>
                <div class="content">
                <p>Dear User,</p>
                <p>We have generated a temporary password for your account. Please use it to log in and reset your password:</p>
                <p class="password">${temp_password}</p>
                <p>For your security, please reset your password after logging in.</p>
                <p>If you did not request a password reset, please ignore this email or contact our support team.</p>
                </div>
                <div class="footer">
                <p>&copy; 2024 Your Company. All rights reserved.</p>
                </div>
            </div>
            </body>
        </html>
    `;
}
  
import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

export const sendEmail = async({email, emailType, userId} : any) =>{
    try {
        //create a token, these values will be created in the database before it is called
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        console.log(hashedToken?  hashedToken: "No token")

       if(emailType === "VERIFY"){
        await User.findByIdAndUpdate(userId, {
            verifyToken : hashedToken, verifyTokenExpiry : Date.now() + 3600000
        }
        )
       }
       else if(emailType === "RESET" ){
        await User.findByIdAndUpdate(userId, {
            forgotPasswordToken : hashedToken, forgotPasswordTokenExpiry : Date.now() + 3600000
        }
        )
       }

       var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "0347b499ce44ef",
          pass: "12299f78a2a460",
        }
        //Todo . add these credential to env
      });

      const mailOptions = {
        from : 'kk124572@gmail.com',
        to: email,
        subject : emailType === "VERIFY" ? "Verify your Email": "Reset your password",
        html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
      }
      const mailResponse = await transport.sendMail(mailOptions);
      return mailResponse;
    } catch (error: any) {
        throw new Error(error.message)
    }
}

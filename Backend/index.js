const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();
const dotenv = require("dotenv").config();
const PORT = 7000;
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const blogRouter = require("./routes/blogRoute");
const categoryRouter = require("./routes/prodcategoryRoute");
const blogcategoryRouter = require("./routes/blogCatRoute");
const brandRouter = require("./routes/brandRoute");
const colorRouter = require("./routes/colorRoute");
const enqRouter = require("./routes/enqRoute");
const couponRouter = require("./routes/couponRoute");
const uploadRouter = require("./routes/uploadRoute");
const NimbusRoute =require('./routes/nimbusRoute')
const sizeRouter=require("./routes/sizeRoute")
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose=require('mongoose')
const Razorpay = require("razorpay");
const fs = require('fs');
const path = require('path');
mongoose.set('strictQuery', true);
dbConnect();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blogcategory", blogcategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/color", colorRouter);
app.use("/api/enquiry", enqRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/size", sizeRouter);
app.use("/api/nimbus",NimbusRoute )
app.use(notFound);
app.use(errorHandler);
const request = require('request');
const apiUrl = 'http://nimbusit.co.in/api/swsend.asp';
const apiKey = 't1dryishercs';
const apiSecret = '70560242';
const senderId = 'DPSTCH';
const mobileNumbers = '7982658211'; 
const entityID = '1001558230000012624'; 
const templateID = '1707165192584904139'; 
const message = 'Dear Customer, OD Limit upto 50695 for salaried and business persons, within 5-minute approval. Interest charged only on used Amount. Call at 9625297088. LANGRT';
const https = require('https');


const options1 = {
    url: `${`http://nimbusit.co.in/api/checkbalance.asp`}?username=${apiKey}&password=${apiSecret}`
  };
  
  request(options1, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(`Your balance is: ${body}`);
    } else {
      console.log(error);
    }
  });
  
const options2 = {
    method: 'POST',
    url: apiUrl,
    form: {
      username: apiKey,
      password: apiSecret,
      sender: senderId,
      sendto: mobileNumbers,
      entityID: entityID,
      templateID: templateID,
      message: message
    }
  };
  
 //send sms
// const options = {
//   url: `${apiUrl}?username=${apiKey}&password=${apiSecret}&sender=${senderId}&sendto=${9050383978}&entityID=${entityID}&templateID=${templateID}&message=${message}&dlrUrl=${`http://localohost:3000?api`}`
// };

// request(options, function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//       console.log(body);
//   } else {
//       console.log(error);
//   }
// });
const options3 = {
  url: `${'http://nimbusit.co.in/api'}/templateDetails.asp?username=${apiKey}&password=${apiSecret}&type=1`
};



app.listen(PORT, () => {
  console.log(`Server is running  at PORT ${PORT}`);
});


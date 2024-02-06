// const {client} = require("../Connection/dbConnection.js")
// const {ObjectId} = require("mongodb")
// const nodemailer = require("nodemailer")
// const cron = require("node-cron")


// const Mail = async() =>{

   
//     const data = await client.db("task_completion").collection("tasks").find({status : "Pending"}).project({email : 1 , deadline : 1 , taskName : 1}).toArray()
//     // console.log(data)

//    data.map((ele,index)=>{
//         const utcDateTime = new Date(ele.deadline);

//             // Convert to Indian Standard Time (IST)
//             const istDateTime = utcDateTime.toLocaleString('en-IN', {
//             timeZone: 'Asia/Kolkata', // 'Asia/Kolkata' is the IANA time zone identifier for IST
//             hour12: false,
//             });
            
//             ele["deadline"] = istDateTime

//      })

//      console.log(data)
 
//     let arr= data.map((ele,index)=>{
    
//             let res = ele.deadline.split(",")
         
//          let part1= res[0]
//          let part2 = res[1]
         
//           let res1=part1.split("/")
        
//           let res2=part2.split(":")
          
          
//            let final = [...res1,...res2]
//            let ree = final.map((ele)=>{
              
//                return parseInt(ele.trim())
//               })
              
         
//              ele["deadline"] = ree
             
             
//             return ele
            
//           })

//       console.log("time",arr)    
          
     
//      arr.map((ele)=>{

//         let mailOptions = {
//             from: process.env.EMAIL,
//             to: ele.email,
//             subject: 'Email from Node-App: A Test Message!',
//             text: 'Remainder Mail',
//             html: '<b>The html content</b>'
//           };
          
//           // Mail transport configuration
//           let transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//               user: process.env.EMAIL,
//               pass: process.env.PASSWORD,
//             },
//             tls: {
//               rejectUnauthorized: false,
//             },
//           });

//           console.log(ele.deadline[0])
          
//           cron.schedule(`${ele.deadline[4]} ${ele.deadline[3]} ${ele.deadline[0]} ${ele.deadline[1]} * `, function () {
//             console.log('---------------------');
//             console.log('Running Cron Process');
//             // Delivering mail with sendMail method
//             transporter.sendMail(mailOptions, (error, info) => {
//               if (error) console.log(error);
//               else console.log('Email sent: ' + info.response);
//             });
//           });        


//      })
    

    
    
// }

// module.exports = Mail;
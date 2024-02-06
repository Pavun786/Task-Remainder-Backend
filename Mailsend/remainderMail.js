const {client} = require("../Connection/dbConnection.js")
const {ObjectId} = require("mongodb")
const nodemailer = require("nodemailer")



const remainderMailSend = async() =>{

    try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
          },
        });
    
        const sendReminderEmail = (recipient, subject, message) => {
          return new Promise((resolve, reject) => {
            const mailOptions = {
              from: process.env.EMAIL,
              to: recipient,
              subject: subject,
              text: message,
            };
    
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error(error);
                reject(error);
              } else {
                console.log('Email sent: ' + info.response);
                resolve();
              }
            });
          });
        };
    
        const checkAndSendReminders = async () => {
          const currentDate = new Date();
    
          const data = await client
            .db("task_completion")
            .collection("tasks")
            .find({ status: "Pending", emailSent: { $ne: true } }) // Check for tasks where email has not been sent
            .project({ email: 1, deadline: 1, taskName: 1 })
            .toArray();
    
          console.log(data);
    
          for (const event of data) {
            console.log(event)
            const eventDateTime = new Date(event.deadline);
    
            // Calculate time difference in milliseconds
            const timeDifference = eventDateTime.getTime() - currentDate.getTime();
    
            // Schedule the email only if the task is due within the next minute
            if (timeDifference > 0 && timeDifference <= 60000*4) {
              await sendReminderEmail(
                event.email,
                `Reminder: ${event.taskName}`,
                `Deadline for ${event.taskName} @${event.deadline}⏰⏰📩.`
              );
              
              // Update the task in the database to indicate that the email has been sent
              await client
                .db("task_completion")
                .collection("tasks")
                .updateOne({ _id: event._id }, { $set: { emailSent: true} });
    
              console.log(`Reminder email sent for ${event.taskName} at ${eventDateTime}`);
            }


        }

      //
       //its for change the status after the time completed
       const datas = await client
       .db("task_completion")
       .collection("tasks")
       .find({ status: "Pending", emailSent: { $eq: true } }) // Check for tasks where email has not been sent
       .project({ email: 1, deadline: 1, taskName: 1 })
       .toArray();

       for(const event of datas){
          
          console.log(event._id)
          
         const eventDateTimeCheck = new Date(event.deadline);

         const currentDateCheck = new Date();

         if(currentDateCheck.getTime() >= eventDateTimeCheck.getTime()){
           let update =  await client
             .db("task_completion")
             .collection("tasks")
             .updateOne({ _id: event._id }, { $set: { status : "Task Expired"} });

           console.log("update",update)  
         }

       } 

    
    
    
    };

       // Run the checkAndSendReminders function every 10 seconds (adjust as needed)
        setInterval(checkAndSendReminders, 10000);
      
      
      
      } catch (error) {
        console.error('Error:', error);
      }

}

module.exports = remainderMailSend;


































// let mailOptions = {
    //     from: process.env.EMAIL,
    //     to: "pavun923@gmail.com",
    //     subject: 'Email from Node-App: A Test Message!',
    //     text: 'Remainder Mail',
    //     html: '<b>The html content</b>'
    //   };
      
    //   // Mail transport configuration
    //   let transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       user: process.env.EMAIL,
    //       pass: process.env.PASSWORD,
    //     },
    //     tls: {
    //       rejectUnauthorized: false,
    //     },
    //   });
      
    //   cron.schedule('14 13 3 feb sat', function () {
    //     console.log('---------------------');
    //     console.log('Running Cron Process');
    //     // Delivering mail with sendMail method
    //     transporter.sendMail(mailOptions, (error, info) => {
    //       if (error) console.log(error);
    //       else console.log('Email sent: ' + info.response);
    //     });
    //   });
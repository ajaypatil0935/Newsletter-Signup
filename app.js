//jshint esversion :6

const express = require("express")
const bodyparser = require("body-parser")
const request = require("request")
const htttps = require("https");
const { url } = require("inspector");
const { options } = require("request");

const app = express();

app.use(express.static("public"))
app.use(bodyparser.urlencoded({extended:true}))

app.get("/" ,function(req , res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/" , function(req , res){
   const firstName = req.body.fname;
   const lastName = req.body.lname;
   const email = req.body.email

    var data ={
        members: [
            {
                email_address: email ,
                status: "subscribed",
                merge_fields : {
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/d6fe8d56e8"

    const options = {
        method: "POST" ,
        auth:"ajay1:de655dd3f6a74d65961ca443455bd221-us14"
    }

    const request = htttps.request(url , options , function(response){

        if (response.statusCode ===200) {
            res.sendFile(__dirname + "/success.html")

        } else {
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data" , function(data){
            console.log(JSON.parse(data));
        })

    })
    request.write(jsonData);
    request.end();

    app.post("/failure" , function(req , res){
        res.redirect("/")
    })




    // console.log(firstName , lastName ,e mail);

})








app.listen(process.env.PORT || 3000 , function(){
    console.log("Server is running on port 3000");
})



// API key
// de655dd3f6a74d65961ca443455bd221-us14

// List id 
// d6fe8d56e8


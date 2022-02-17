const express = require('express');
const app = express();
const userRouter = require('./api/UserRouter');



//convert all the javascript object to the all the json
app.use(express.json());


app.use('/api',userRouter);
app.listen(3000,()=>{
    console.log("server is running on 3000...");
})


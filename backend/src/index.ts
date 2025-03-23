import express from "express"
import zod from "zod"
import cors from "cors"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config"
import { contentModel, userModel } from "./db"
import { userMiddleware } from "./middleware"

const app = express()




app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
}));

const signupSchema = zod.object({
    username:zod.string(),
    email : zod.string(),
    password : zod.string().min(6),
    college:zod.string(),
    location:zod.string(),
    skillSet:zod.string()
})

app.post("/api/v1/signup", async (req:any , res:any) =>{

    try {
        const parsed = signupSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ message: "Incorrect inputs" });
        }

        const { username , email, password , college , location , skillSet } = parsed.data;
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email/email already taken"
            });
        }

        const newUser = await userModel.create({username, email, password ,college , location , skillSet });

        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            message: "User signed up successfully",
            token  
        });
    } catch (error: any) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }

})


const detailsBody = zod.object({
    college:zod.string(),
    location:zod.string(),
    skillSet:zod.string()
})

// app.post("/api/v1/details" , async (req:any , res:any) => {
//     const parsed = detailsBody.safeParse(req.body);

//     if (!parsed.success) {
//         return res.status(400).json({ message: "Incorrect inputs" });
//     }

//     const { college , location , skillSet} = parsed.data;


//     await detailsModel.create({ college , location , skillSet});


// })



const signinBody = zod.object({
    email:zod.string().email(),
    password:zod.string().min(6)

})

app.post("/api/v1/signin", async(req :any , res:any) => {


const {success} = signinBody.safeParse(req.body)

if(!success){
    return res.status(411).json({
        message:"Email already taken / invalid inputs"
    })
}

const existingUser =await userModel.findOne({
    email:req.body.email,
    password:req.body.password
})

if(existingUser){
    const token = jwt.sign({
        id: existingUser._id
    },JWT_SECRET)

    res.json({
        token
    })

} else{
    res.status(411).json({
        message: "incorrect credentials"
    })
}   
    
    
})


app.post("/api/v1/content",userMiddleware , async (req:any, res:any) => {
    const photo = req.body.photo;
    // const type = req.body.type;
    const description = req.body.description;

    await contentModel.create({
        description,
        photo,
        // type,
        userid:req.userId,
        // tags:[]
    })

    res.json({
        message : "content added"
    })




})

app.get("/api/v1/content",userMiddleware ,async (req:any , res:any) => {

    const userId = req.userId;

    const content = await contentModel.find({
        userid:userId,

    }).populate("userid" , "username")

    res.json({
        content
    })
})



app.delete("/api/v1/content",userMiddleware,async(req:any , res:any) => {

    const contentId = req.body.contentId;

    await contentModel.deleteOne({
        userid:req.userId,
        contentId
    })
    res.json({
        message : "content deleted"
    })

    
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

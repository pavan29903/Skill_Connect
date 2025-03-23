"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = __importDefault(require("zod"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const db_1 = require("./db");
const middleware_1 = require("./middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
const signupSchema = zod_1.default.object({
    username: zod_1.default.string(),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    college: zod_1.default.string(),
    location: zod_1.default.string(),
    skillSet: zod_1.default.string()
});
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsed = signupSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ message: "Incorrect inputs" });
        }
        const { username, email, password, college, location, skillSet } = parsed.data;
        const existingUser = yield db_1.userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email/email already taken"
            });
        }
        const newUser = yield db_1.userModel.create({ username, email, password, college, location, skillSet });
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, config_1.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({
            message: "User signed up successfully",
            token
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}));
const detailsBody = zod_1.default.object({
    college: zod_1.default.string(),
    location: zod_1.default.string(),
    skillSet: zod_1.default.string()
});
// app.post("/api/v1/details" , async (req:any , res:any) => {
//     const parsed = detailsBody.safeParse(req.body);
//     if (!parsed.success) {
//         return res.status(400).json({ message: "Incorrect inputs" });
//     }
//     const { college , location , skillSet} = parsed.data;
//     await detailsModel.create({ college , location , skillSet});
// })
const signinBody = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6)
});
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / invalid inputs"
        });
    }
    const existingUser = yield db_1.userModel.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id
        }, config_1.JWT_SECRET);
        res.json({
            token
        });
    }
    else {
        res.status(411).json({
            message: "incorrect credentials"
        });
    }
}));
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const photo = req.body.photo;
    // const type = req.body.type;
    const description = req.body.description;
    yield db_1.contentModel.create({
        description,
        photo,
        // type,
        userid: req.userId,
        // tags:[]
    });
    res.json({
        message: "content added"
    });
}));
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const content = yield db_1.contentModel.find({
        userid: userId,
    }).populate("userid", "username");
    res.json({
        content
    });
}));
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    yield db_1.contentModel.deleteOne({
        userid: req.userId,
        contentId
    });
    res.json({
        message: "content deleted"
    });
}));
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

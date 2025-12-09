// Importing dependencies
import passport from "passport";
import { v2 } from "cloudinary";
const cloudinary = v2;

// Importing local modules
import { User } from "../database/schemas/user_schema.js";
import { sendVerificationEmail } from "../auth/send_email.js";
import { createEmailString } from "../auth/strings.js";
import { File, Tag } from "../database/schemas/content_schema.js";
import { findOrCreateTag } from "../functions/crud_functions.js";

// Register a new user and save it to database
export const getUserRegister = async (req, res) => {
    res.render("user_register.ejs", { registerErr: "" });
};

export const userRegister = async (req, res) => {
    let { firstName, lastName, email } = req.body;
    // Create a new user if above validations are success
    const newUser = await User.register(
        new User({
            email: email,
            full_name: { first_name: firstName, last_name: lastName },
            password: req.body.password,
        }),
        req.body.password
    ).catch((err) => console.log(err, "From register onRejectErr"));

    if (newUser) {
        console.log(newUser);
        res.redirect("/accounts/login");
    }
    // // Send an user verification email to created user email
    // const createdUserEmail = newUser.email;
    // const emailToken = createEmailString(newUser);
    // sendVerificationEmail(createdUserEmail, emailToken);
};

// Verify an existing user

// Login an existing user
export const getUserLogin = async (req, res) => {
    res.render("user_login.ejs", { errMessage: "" });
};

export const userLogin = async (req, res) => {
    let { email, password } = req.body;
    const foundUser = await User.findOne({ email: email }).exec();
    if (!foundUser) {
        res.status(404).render("user_login.ejs", { errMessage: "USER NOT FOUND" });
    }

    // Authenticate user
    const user = new User({
        email: email,
        password: password,
    });
    req.login(user, function (err) {
        if (err) console.log(err);
        passport.authenticate("local")(req, res, function () {
            res.redirect("/");
        });
    });
};

// Upload files
export const getUserUpload = async (req, res) => {
    res.render("file_upload.ejs");
};

export const userUpload = async (req, res) => {
    console.log(req.File);
    // const cloudinaryRes = await cloudinary.uploader.upload()
    // const newFile = await File.create({
    //     fileName: "AI ML",
    //     filePath: "C:/documents/dbms.pdf",
    //     tags: [],
    //     category: {
    //         streamName: "science_and_technology",
    //         grade: [
    //             {
    //                 gradeName: "polytechnic",
    //                 courses: [
    //                     {
    //                         courseName: "cst",
    //                         subject: [{ subjectName: "dbms" }, { subjectName: "networking" }],
    //                     },
    //                 ],
    //             },
    //         ],
    //     },
    // }).catch((err) => console.log(err));
    // const tagsArray = ["#aiml", "#polytechnic", "#cst"];
    // tagsArray.forEach(async (tag) => {
    //     const tagId = await findOrCreateTag(tag);
    //     console.log(tagId);
    //     await File.findByIdAndUpdate(newFile.id, { $push: { tags: [tagId] } }).catch((err) => console.log(err));
    //     await Tag.findByIdAndUpdate(tagId, { $push: { files: [newFile.id] } }).catch((err) => console.log(err));
    // });
    // res.status(200).send(await File.findById(newFile.id));
};

// Logout a user
export const userLogout = (req, res) => {
    req.logout((err) => {
        if (err) console.log(err);
        res.redirect("/");
    });
};

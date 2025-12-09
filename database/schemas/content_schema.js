import mongoose, { Schema } from "mongoose";

// Subject schema
const subjectSchema = new mongoose.Schema({
    subjectName: {
        type: String,
        required: true,
    }
});

// Course schema
const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
    },
    subjects: [subjectSchema],
});

// Grade schema
const gradeSchema = new mongoose.Schema({
    gradeName: {
        type: String,
        required: true,
    },
    courses: [courseSchema],
});

// Stream schema
const streamSchema = new mongoose.Schema({
    streamName: {
        type: String,
        required: true,
    },
    grade: [gradeSchema],
});

// Tag schema
const tagSchema = new mongoose.Schema({
    tagName: {
        type: String,
        required: true,
        unique: true,
    },
    files: [{ type: Schema.Types.ObjectId, ref: "File" }],
})

// Creating Tag model with tagSchema
export const Tag = mongoose.model("Tag", tagSchema);

// File schema
const fileSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
    },
    tags: [{type: Schema.Types.ObjectId, ref: "Tag"}],
    category: streamSchema,
});

// Creating File model with fileSchema
export const File = mongoose.model("File", fileSchema);

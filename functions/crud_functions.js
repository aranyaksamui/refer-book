import { Tag } from "../database/schemas/content_schema.js";

// Find a tag or create
export const findOrCreateTag = async (tag) => {
    const foundTag = await Tag.findOne({ tagName: tag }).catch((err) => console.log(err));
    // Create a tag and return it's id, if none found
    if (!foundTag) {
        const createdTag = await Tag.create({ tagName: tag }).catch((err) => console.log(err));
        return createdTag.id;
    }
    // Return the found tag's id
    return foundTag.id;
};

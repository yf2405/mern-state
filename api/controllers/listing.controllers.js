import Listing from "../model/listing.model.js";


export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body); // asegúrate de usar await aquí
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
};


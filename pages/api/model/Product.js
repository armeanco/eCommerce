import {initMongoose} from "../../../lib/mongoose";
import Products from "../../../model/Products";

export async function findAllProducts() {
    return Products.find().exec();
}

export default async function handle(req, res) {
    await initMongoose();
    const {ids} = req.query;
    if( ids ) {
        const idsA = ids.split(',');
        res.json( await Products.find({'_id': {$in: idsA}}).exec());
    } else {
        res.json( await findAllProducts() );
    }
}
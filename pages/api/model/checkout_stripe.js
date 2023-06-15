import { initMongoose } from "@/lib/mongoose";
import Orders from '../../../model/Orders';
import Products from "@/model/Products";
//const stripe = requre('stripe')(process.env.STRIPE_SECRET_KEY);

    export default async function handler(req, res) {
    await initMongoose();

    if( req.method !== 'POST' ) {
        res.json("should be POST but it's not!");
        return;
    }

    const {email,name,address,city,phone,contact} = req.body;
    const productsId = req.body.products.split(',');
    const uId = [...new Set(productsId.filter(item => item.length > 10))];
    const products = await Products.find({_id:{$in:uId}}).exec();

    let itemsProps = [];

    for( let i = 0; i < productsId.length; ++i ) {
        let temp = [];
        if( productsId[i].length > 10 ) {
            temp.push({state: true, id: productsId[i], dimensions: productsId[i + 1]});
        }
        if(temp.length > 0) itemsProps.push(temp);
        temp = [];
    }

    //console.log('uId?', uId, 'productsId', productsId, 'products', products, 'rawProduct', req.body.products, 'props', itemsProps);

    let line_items = [];
    let dimensions = [];
    for( let [k, v] of itemsProps ) {
        //console.log('key', k, 'value', v);
        const product = products.find(p => p._id.toString() === k.id);
        if( uId.includes(k.id) && k.state != false ) {
            dimensions.push({
                id: k.id,
                size: k.dimensions,
                name: {name:product.description_en},
                color: product.colors,
            })
            k.state = false;
        }
    };
    //console.log('DIM', dimensions);
    //console.log('FUNC', itemsProps.map((x, y) => x.map((a, b) => a.id)));
    for( let productId of uId ) {
        const quantity = productsId.filter(id => id === productId).length;
        const product = products.find(p => p._id.toString() === productId);
        line_items.push({
            quantity,
            price_data: {
                currency: 'USD',
                color: product.colors,
                product_data: {name:product.description_en},
                unit_amount: product.price * 100,
            },
        });
    }

    const order = await Orders.create({
        products: [line_items, dimensions],
        name,
        address,
        phone,
        email,
        city,
        contact,
        paid: 0,
    });

    res.json("OK!");
}
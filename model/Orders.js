import { Schema, model, models } from "mongoose"

const OrderSchema = new Schema({
    products: Object,
    name: String,
    email: String,
    address: String,
    city: String,
    phone: String,
    contact: String,
    colors: String,
    paid: {type: Number, defaultValue: 0},
}, {timestamps: true});

const Orders = models?.Orders || model('Orders', OrderSchema);

export default Orders;
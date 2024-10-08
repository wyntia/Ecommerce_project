const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
const crypto = require('crypto');
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user",
    },
    isBlocked:{
        type:Boolean,
        default:false,
    },
    cart: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    }],
    address: {
        type: [String],
    },
    wishlist: [{type: mongoose.Schema.Types.ObjectId , ref: 'Product'}],
    refreshToken:{
        type: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
},
{
    timestamps: true,
});


//encrypting password
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt =await bcrypt.genSaltSync(10);
    this.password= await bcrypt.hash(this.password, salt);
});
//matching password for login
userSchema.methods.isPasswordMatch = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.createPasswordResetToken = async function(){
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; //10mins
    return resetToken;
};

//Export the model
module.exports = mongoose.model('User', userSchema);
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email Already Exists!"],
    required: [true, "Email is Required!"],
  },
  username: {
    type: String,
    required: [true, "Username is Required!"],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username Invalid, it Should Contain 8-20 Alphanumeric Letters and be Unique!"],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
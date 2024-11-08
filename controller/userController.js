const UserModel = require("../models/userModel");
const { hashpassword, compare } = require("../middlware/helper");
const Ordermodel = require("../models/Ordermodel");

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, secreteanswer, address } = req.body;
    if (!name || !email || !phone || !password || !secreteanswer || !address) {
      return res.status(400).send("Please fill all your fields");
    }
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.status(400).send("User already exists, please login");
    }

    const hash = await hashpassword(password);

    const newuser = new UserModel({
      name,
      email,
      phone,
      password: hash, // Store the hashed password
      secreteanswer,
      address,
    });

    const userSave = await newuser.save();
    res.status(201).send({ message: "User registered", user: userSave });
  } catch (error) {
    res.status(500).send({ message: "User registration failed", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Please fill all your fields");
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send("User does not exist, please sign up first");
    }
    const match = await compare(password, user.password);
    if (!match) {
      return res.status(400).send({ message: "Invalid password" });
    } else {
      const token = await user.generatetoken();
      res.status(200).send({ token, user })
      console.log(token)
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
    console.log(error.message)
  }
};

// Rest of your code for forgot password, edit user, and order functions...



// ------------------------------------ForgotPassword--------------------------------------------------//

exports.forgotpassword = async (req, res) => {
  try {
    const { email, secreteanswer, newpassword } = req.body;
    if (!email || !secreteanswer || !newpassword) {
      return res.status(400).send({
        message: "pls filled all your field"
      })
    }
    const user = await UserModel.findOne({ email: email, secreteanswer: secreteanswer });
    if (!user) {
      res.status(400).send({ message: "User Not Exist", error })
    }
    const hash = await hashpassword(newpassword);
    const upadatepassword = await UserModel.findByIdAndUpdate(user._id, { password: hash }, { new: true })
    res.status(200).send({ message: "password reset successfully" });



  } catch (error) {
    res.status(400).send({ message: "forgot password failed", error })
  }
}

// -----------------------------edit user-------------------//
exports.edituser = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    if (!name || !email || !phone || !address) {
      return res.status(400).send({ message: "pls filled all field" });
    }
    const updateuser = await UserModel.findByIdAndUpdate(req.user._id, { name, email, phone, address }, { new: true })
    res.status(200).send({ message: "user update successfully", updateuser })
  } catch (error) {
    res.status(400).send({ message: "user update failed", error })
  }
}

//user order function

exports.getorderfunction = async (req, res) => {
  try {
    const orders = await Ordermodel.find({ buyer: req.user._id }).populate("products").populate("buyer", "name")
    res.status(200).send(orders)

  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

//admin order function

exports.getallordersfunction = async (req, res) => {
  try {
    const orders = await Ordermodel.find({}).populate("products").populate("buyer", "name").sort({ createdAt: "-1" })
    res.json(orders)


  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

//order status function
exports.orderstatusfunction = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const orders = await Ordermodel.findByIdAndUpdate(id, { status }, { new: true })
    res.status(200).send(orders)


  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}
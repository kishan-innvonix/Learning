const { prisma } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (userId) => {
  return jwt.sign({ userId }, "secret", { expiresIn: "1d" });
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, bio: true, createdAt: true },
    });
    if (!users) {
      return res.status(404).json({
        success: false,
        message: "No users found!!!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Users found!",
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPass,
        bio: req.body?.bio || "",
      },
      select: { id: true, name: true, email: true, bio: true, createdAt: true },
    });

    const token = generateToken(user?.id);

    res.status(201).json({
      success: true,
      message: "Register successful!",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { id: true, name: true, email: true, bio: true, createdAt: true },
    });

    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      return res.status({
        success: false,
        message: "Invalid Credentials",
      });
    }

    console.log(user);
    if (!user) {
      return res.json(404).json({
        success: false,
        message: "No user found!!!",
      });
    }

    const token = generateToken(user?.id);

    res.status(201).json({
      success: true,
      message: "Login successful!",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: { id: true, name: true, email: true, bio: true, createdAt: true },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found!!!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Users found!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

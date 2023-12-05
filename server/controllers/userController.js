import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

import User from "../models/userModel.js";
import Review from "../models/reviewModel.js";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).populate("friends");

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      friends: user.friends,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      reviews: user.reviews,
      friends: [],
      friend_pending: [],
      pending_requests: [],
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  if (req.user) {
    let my_friend_ids = req.user.friends;
    let friends = await User.find({
      _id: { $in: my_friend_ids },
      friends: req.user._id,
    });
    let friend_pending = await User.find({
      _id: { $in: my_friend_ids },
      friends: { $ne: req.user._id },
    });
    let pending_requests = await User.find({
      _id: { $in: my_friend_ids },
      friends: { $ne: req.user._id },
    });
    let friend_reviews = await Review.find({ user: { $in: my_friend_ids } })
      .sort({ last_updated: -1 })
      .limit(5);

    let user = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      reviews: req.user.reviews.sort((a, b) => b.last_updated - a.last_updated),
      friends_reviews: friend_reviews,
      friends: friends,
      friend_pending: friend_pending,
      pending_requests: pending_requests,
    };

    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  console.log(req);
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const createReview = asyncHandler(async (req, res) => {
  const { title, review, rating, tmdb_id } = req.body;

  const reviewExists = await Review.findOne({
    tmdb_id,
    user: req.user._id,
  });
  if (reviewExists) {
    res.status(400);
    throw new Error("Review already exists");
  }

  const newReview = new Review({
    title,
    review,
    username: req.user.name,
    rating,
    tmdb_id,
    total: 0,
    helpful: 0,
    user: req.user._id,
    last_updated: Date.now(),
  });

  await newReview.save().then((result) => {
    User.findById(req.user._id).then((user) => {
      user.reviews.push(result._id);
      user.save();
    });
  });

  res.status(200).json(newReview);
});

const deleteReview = asyncHandler(async (req, res) => {
  console.log(req.body.id);

  await Review.findByIdAndDelete(req.body.id).exec();
  req.user.reviews.pull(req.body.id);
  req.user.save();
  res.json(req.user);
});

const updateReview = asyncHandler(async (req, res) => {
  const { id, title, review, rating } = req.body;

  const _review = await Review.findById(id);

  if (_review) {
    _review.title = title || _review.title;
    _review.review = review || _review.review;
    _review.rating = rating || _review.rating;
    _review.last_updated = Date.now();

    const updatedReview = await _review.save();

    res.json(updatedReview);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getOtherUserProfile = asyncHandler(async (req, res) => {
  console.log(req.params.username);
  const user = await User.findOne({ name: req.params.username }).populate(
    "reviews"
  );

  if (user) {
    console.log(user);
    res.json({
      _id: user._id,
      name: user.name,
      reviews: user.reviews,
      friends: user.friends,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const addFriend = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const friend = await User.findById(req.body._id);
  // console.log(req.body);
  if (user.friends.includes(req.body._id)) {
    res.status(400);
    throw new Error("Friend already added");
  } else if (user && friend) {
    user.friends.push(req.body._id);
    let updatedUser = await user.save();
    updatedUser = await updatedUser.populate("friends");

    console.log("ADD");
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      friends: updatedUser.friends,
    });
  } else {
    res.status(404);
    throw new Error("User/Friend not found");
  }
});

const deleteFriend = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(req.body);
  if (user) {
    console.log(req.body._id);
    console.log("DELETE");
    user.friends.pull(req.body._id);
    let updatedUser = await user.save();
    updatedUser = await updatedUser.populate("friends");
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      friends: updatedUser.friends,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  createReview,
  deleteReview,
  updateReview,
  getOtherUserProfile,
  addFriend,
  deleteFriend,
};

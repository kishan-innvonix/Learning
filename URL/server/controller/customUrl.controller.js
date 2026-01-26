import { UAParser } from "ua-parser-js";
import CustomUrl from "../models/customUrl.model.js";
import CustomDomain from "../models/customDomain.model.js";
import {
  asyncHandler,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../utils/asyncHandler.js";
import validator from "validator";

// Get original URL by domain and custom name
export const getCustomUrl = asyncHandler(async (req, res) => {
  const { domain, customName } = req.params;

  // Find the domain
  const customDomain = await CustomDomain.findOne({ domain });

  if (!customDomain) {
    throw new NotFoundError("Domain not found");
  }

  // Find the custom URL
  const customUrl = await CustomUrl.findOne({
    domain: customDomain._id,
    customName,
  });

  if (!customUrl) {
    throw new NotFoundError("URL not found");
  }

  if (!customUrl.isActive) {
    res.redirect(`${process.env.VITE_BASE}/bad/${customUrl?._id}`)
    return 
  }

  // Track visit
  const ua = UAParser(req.headers["user-agent"] || "");

  const metaData = {
    ip:
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket?.remoteAddress ||
      null,
    device: ua?.device?.type || "Desktop",
    clickedAt: new Date().toISOString(),
    language: req.headers["accept-language"],
  };

  customUrl.visitList.push(metaData);
  await customUrl.save();

  res.redirect(customUrl.url);
});

// Create custom URL
export const createCustomUrl = asyncHandler(async (req, res) => {
  const { domain, customName, url } = req.body;
  const userId = req.user._id;

  if (!domain || !customName || !url) {
    throw new BadRequestError("All fields are required");
  }

  if (!validator.isURL(url)) {
    throw new BadRequestError("Invalid URL");
  }

  // Check if domain belongs to the user
  const customDomain = await CustomDomain.findById(domain);

  if (!customDomain) {
    throw new NotFoundError("Domain not found");
  }

  if (customDomain.user.toString() !== userId.toString()) {
    throw new ForbiddenError("You are not allowed to use this domain");
  }

  // Check if custom name already exists for this domain
  const existingUrl = await CustomUrl.findOne({
    domain:customDomain?._id,
    customName,
  });

  if (existingUrl) {
    throw new BadRequestError("This custom name is already taken for this domain");
  }

  const customUrl = await CustomUrl.create({
    customName,
    url,
    domain,
    user: userId,
  });

  res.status(201).json({
    success: true,
    message: "Custom URL created successfully",
    customUrl,
  });
});

// Get all custom URLs for user
export const getAllCustomUrls = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const customUrls = await CustomUrl.find({ user: userId }).populate("domain");

  res.status(200).json({
    success: true,
    message: "Custom URLs fetched successfully",
    customUrls,
  });
});

// Get custom URLs by domain
export const getCustomUrlsByDomain = asyncHandler(async (req, res) => {
  const { domainId } = req.params;
  const userId = req.user._id;

  const customDomain = await CustomDomain.findById(domainId);

  if (!customDomain) {
    throw new NotFoundError("Domain not found");
  }

  if (customDomain.user.toString() !== userId.toString()) {
    throw new ForbiddenError("You are not allowed to access this domain");
  }

  const customUrls = await CustomUrl.find({
    domain: domainId,
    user: userId,
  }).populate("domain");

  res.status(200).json({
    success: true,
    message: "Custom URLs fetched successfully",
    customUrls,
  });
});

// Toggle custom URL activation
export const toggleCustomUrlActive = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const customUrl = await CustomUrl.findById(id);

  if (!customUrl) {
    throw new NotFoundError("URL not found");
  }

  if (customUrl.user.toString() !== userId.toString()) {
    throw new ForbiddenError("You are not allowed to do this");
  }

  customUrl.isActive = !customUrl.isActive;
  await customUrl.save();

  res.status(200).json({
    success: true,
    message: customUrl.isActive ? "Activated successfully" : "Deactivated successfully",
    customUrl,
  });
});

// Delete custom URL
export const deleteCustomUrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const customUrl = await CustomUrl.findById(id);

  if (!customUrl) {
    throw new NotFoundError("URL not found");
  }

  if (customUrl.user.toString() !== userId.toString()) {
    throw new ForbiddenError("You are not allowed to delete this");
  }

  await CustomUrl.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Custom URL deleted successfully",
  });
});

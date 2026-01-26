import CustomDomain from "../models/customDomain.model.js";
import CustomUrl from "../models/customUrl.model.js";
import {
  asyncHandler,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../utils/asyncHandler.js";

// Create custom domain
export const createCustomDomain = asyncHandler(async (req, res) => {
  const { domain } = req.body;
  const userId = req.user._id;

  if (!domain) {
    throw new BadRequestError("Domain name is required");
  }

  // Check if domain already exists
  const existingDomain = await CustomDomain.findOne({ domain });
  if (existingDomain) {
    throw new BadRequestError("This domain is already occupied");
  }

  // Check if user already has a domain
  const userDomain = await CustomDomain.findOne({ user: userId });
  if (userDomain) {
    throw new BadRequestError("You can only create one domain");
  }

  const customDomain = await CustomDomain.create({
    domain,
    user: userId,
  });

  res.status(201).json({
    success: true,
    message: "Custom domain created successfully",
    customDomain,
  });
});

// Get user's custom domain
export const getCustomDomain = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const customDomain = await CustomDomain.findOne({ user: userId });

  res.status(200).json({
    success: true,
    message: "Domain fetched successfully",
    customDomain,
  });
});

// Delete custom domain
export const deleteCustomDomain = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  console.log(id)
  const customDomain = await CustomDomain.findById(id);

  if (!customDomain) {
    throw new NotFoundError("Domain not found");
  }

  if (customDomain.user.toString() !== userId.toString()) {
    throw new ForbiddenError("You are not allowed to delete this domain");
  }

  // Delete associated custom URLs
  await CustomUrl.deleteMany({ domain: id });

  await CustomDomain.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Domain deleted successfully",
  });
});

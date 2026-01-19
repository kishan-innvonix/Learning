import Url from "../models/url.model.js";
import {
  asyncHandler,
  BadRequestError,
  NotFoundError,
} from "../utils/asyncHandler.js";
import shortid from "shortid";
import validator from "validator"

export const getOriginalUrl = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new NotFoundError("Id not found!!!");
  }

  const data = await Url.findOneAndUpdate(
    { shortId: id },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true },
  );
  res.redirect(data?.redirectUrl)
});

export const createShortUrl = asyncHandler(async (req, res) => {
  const { url } = req.body;

  if (!url) {
    throw new BadRequestError("Url is required");
  }

  if(!validator.isURL(url)){
    throw new BadRequestError("Invalid URL")
  }

  const shortUrl = await Url.create({
    shortId: shortid(),
    redirectUrl: url,
    visitHistory: [],
  });

  res.status(201).json({
    success: true,
    message: "Short Url created!",
    shortUrl,
  });
});

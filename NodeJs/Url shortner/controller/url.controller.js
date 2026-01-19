import { UAParser } from "ua-parser-js";
import Url from "../models/url.model.js";
import {
  asyncHandler,
  BadRequestError,
  NotFoundError,
} from "../utils/asyncHandler.js";
import shortid from "shortid";
import validator from "validator"


// Get original url
export const getOriginalUrl = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new NotFoundError("Id not found!!!");
  }

  const url = await Url.findOne({shortId: id})

  if(url?.user){
    const ua = UAParser(req.headers["user-agent"] || "");
    
    const metaData = {
      ip: req?.ip || null,
      device: ua?.device?.type || "Desktop",
      clickedAt: (new Date()).toISOString(),
      // os: ua.os,
      language: req.headers["accept-language"]
    }
    
    url.visitList.push(metaData)
    await Url.save();
  }

  res.redirect(url?.redirectUrl)
});

// create Short Url
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
    visitList: [],
  });

  res.status(201).json({
    success: true,
    message: "Short Url created!",
    shortUrl,
  });
});

// url analysis
export const analysis = asyncHandler(async(req, res) => {
  const shortId = req.params.id;

  const url = await Url.findOne({shortId})

  if(!url) {
    throw new NotFoundError("Url not found!!!")
  }

  res.status(200).json({
    success: true,
    message: "Analysis fetch successfully",
    url
  })
})

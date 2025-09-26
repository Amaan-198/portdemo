import Certificate from "../models/Certificate.js";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

const getCertificates = asyncHandler(async (req, res) => {
  const certificates = await Certificate.find({}).sort({ order: 1 });
  res.json(certificates);
});

const getCertificateById = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findById(req.params.id);
  if (certificate) {
    res.json(certificate);
  } else {
    res.status(404);
    throw new Error("Certificate not found");
  }
});

const createCertificate = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, issuer, url } = req.body;
  const certificate = new Certificate({
    user: req.user._id,
    title,
    issuer,
    url,
  });
  const createdCertificate = await certificate.save();
  res.status(201).json(createdCertificate);
});

const updateCertificate = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, issuer, url } = req.body;
  const certificate = await Certificate.findById(req.params.id);
  if (certificate) {
    certificate.title = title || certificate.title;
    certificate.issuer = issuer || certificate.issuer;
    certificate.url = url || certificate.url;
    const updatedCertificate = await certificate.save();
    res.json(updatedCertificate);
  } else {
    res.status(404);
    throw new Error("Certificate not found");
  }
});

const deleteCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findById(req.params.id);
  if (certificate) {
    await certificate.deleteOne();
    res.json({ message: "Certificate removed" });
  } else {
    res.status(404);
    throw new Error("Certificate not found");
  }
});

const reorderCertificates = asyncHandler(async (req, res) => {
  const { newOrder } = req.body;
  const bulkOps = newOrder.map((id, index) => ({
    updateOne: {
      filter: { _id: id },
      update: { $set: { order: index } },
    },
  }));
  await Certificate.bulkWrite(bulkOps);
  res.json({ message: "Certificates reordered successfully" });
});

export {
  getCertificates,
  getCertificateById,
  createCertificate,
  updateCertificate,
  deleteCertificate,
  reorderCertificates,
};

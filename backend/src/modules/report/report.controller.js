const service = require("./report.service");

exports.createReport = async (req, res) => {
  try {
    const report = await service.createReport(req.user._id, req.body);
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllReports = async (req, res) => {
  const reports = await service.getAllReports();
  res.json(reports);
};

exports.resolveReport = async (req, res) => {
  try {
    const report = await service.resolveReport(req.params.id);
    res.json({ message: "Report resolved", report });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

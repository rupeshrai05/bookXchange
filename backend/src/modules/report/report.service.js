const Report = require("./report.model");

exports.createReport = async (userId, data) => {
  if (!data.targetType || !data.targetId || !data.reason) {
    throw new Error("Missing report data");
  }

  return await Report.create({
    reporter: userId,
    targetType: data.targetType,
    targetId: data.targetId,
    reason: data.reason,
  });
};

exports.getAllReports = async () => {
  return await Report.find()
    .populate("reporter", "name email")
    .sort({ createdAt: -1 });
};

exports.resolveReport = async (reportId) => {
  const report = await Report.findById(reportId);
  if (!report) throw new Error("Report not found");

  report.status = "resolved";
  await report.save();

  return report;
};

const Job = require("../model/Job");
const JobUtils = require("../utils/jobUtils");
const Profile = require("../model/Profile");

module.exports = {
  async save(req, res) {
    await Job.create({
      name: req.body.name,
      "categoria-produto": req.body["categoria-produto"],
      "img-produto": req.body["img-produto"],
      "qt-produto": req.body["qt-produto"],
      "vl-produto": req.body["vl-produto"],
      created_at: Date.now(),
    });
    return res.redirect("/");
  },
  create(req, res) {
    return res.render("produto");
  },
  async show(req, res) {
    const jobId = req.params.id;
    const jobs = await Job.get();
    const job = jobs.find((job) => Number(job.id) === Number(jobId));
    if (!job) {
      return res.send("Produto não encontrado");
    }

    return res.render("produto-edit", { job });
  },
  async update(req, res) {
    const jobId = req.params.id;

    const updatedJob = {
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
    };

    await Job.update(updatedJob, jobId);

    res.redirect("/produto/" + jobId);
  },

  async delete(req, res) {
    const jobId = req.params.id;

    await Job.delete(jobId);

    return res.redirect("/");
  },
};

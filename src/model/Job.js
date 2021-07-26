const Database = require("../db/config");

module.exports = {
  async get() {
    const db = await Database();
    const data = await db.all(`
    SELECT * FROM produto
    `);
    await db.close();

    return data.map((job) => ({
      id: job.id,
      name: job.name,
      "categoria-produto": job.categoria_produto,
      "img-produto": job.img_produto,
      "qt-produto": job.qt_produto,
      "vl-produto": job.vl_produto,
      created_at: job.created_at,
    }));
  },

  async update(updatedJob, jobId) {
    const db = await Database();
    db.run(`
      UPDATE jobs SET 
      name = '${updatedJob.name}',
      categoria_produto = ${updatedJob["categoria-produto"]},
      img_produto = ${updatedJob["img-produto"]}
      qt_produto = ${updatedJob["qt-produto"]}
      vl_produto = ${updatedJob["vl-produto"]}
      where id="${jobId}"
    `);
    await db.close();
  },

  async delete(jobId) {
    const db = await Database();

    await db.run(`
    DELETE FROM jobs WHERE id=${jobId};
    `);

    await db.close();
  },

  async create(newJob) {
    const db = await Database();

    await db.run(`
    INSERT INTO produto (name, categoria_produto, img_produto ,qt_produto, vl_produto, created_at)
    VALUES('${newJob.name}', ${newJob["categoria-produto"]}, ${newJob["img-produto"]},${newJob["qt-produto"]},${newJob["vl-produto"]}, ${newJob.created_at})
    `);

    await db.close();
  },
};

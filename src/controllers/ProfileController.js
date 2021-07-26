const Profile = require("../model/Profile");

module.exports = {
  async index(req, res) {
    return res.render("profile", { profile: await Profile.get() });
  },
  async update(req, res) {
    // req.body para pegar os dados
    const data = req.body;
    // definir quantas semanas tem um ano: 52
    const weeksPerYear = 52;
    // remover as semanas de férias do ano
    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
    // quantas horas por semanas estou trabalhando
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"];
    // total de horas trabalhadas no mês
    const monthlyTotalHours = weekTotalHours * weeksPerMonth;
    // qual será o valor da minha hora?
    data["value-hour"] = data["monthly-budget"] / monthlyTotalHours;

    await Profile.update({
      ...(await Profile.get()),
      ...req.body,
      "value-hour": data["value-hour"],
    });

    return res.redirect("/profile");
  },
};

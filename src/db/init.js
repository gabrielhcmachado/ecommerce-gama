const Database = require("./config");

const initDb = {
  async init() {
    const db = await Database();

    await db.exec(`
    CREATE TABLE profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    monthly_budget INT,
    days_per_week INT,
    hours_per_day INT,
    vacation_per_year INT,
    value_hour INT
)
`);

    await db.exec(`
CREATE TABLE jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily_hours INT,
    total_hours INT,
    created_at DATETIME
)
`);

    await db.run(`
    INSERT INTO profile (name, avatar, monthly_budget, days_per_week, hours_per_day, vacation_per_year, value_hour)
    VALUES('Gabriel Machado','https://lh3.googleusercontent.com/ogw/ADea4I4BQ7imeo3a2Irw76zAdErqXwL3N6l2HLnuazN2obc=s150-c-mo', 7000, 6, 8, 4, 350);
`);

    await db.run(`
    INSERT INTO jobs (name, daily_hours, total_hours, created_at)
    VALUES ('Popular - A Casa do chef', 2, 80, 1617514376016);
`);
    await db.run(`
    INSERT INTO jobs (name, daily_hours, total_hours, created_at)
    VALUES ('Carvalho - Joias', 2, 80, 1617514376018);
`);

    await db.close();
  },
};

initDb.init();

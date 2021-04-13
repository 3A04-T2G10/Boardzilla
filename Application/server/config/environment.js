process.env.DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/boardzilla";
process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.PORT = process.env.PORT || 3000;
process.env.SECRET = process.env.SECRET || "secret";
process.env.NEWS_KEY =
  process.env.NEWS_KEY || "d4144d51be414cfbb9335f533dfa78f3";
process.env.STOCK_KEY = process.env.STOCK_KEY || "5KO3BAP8N60LIR0T";

process.env.WEATHER_KEY =
  process.env.WEATHER_KEY || "85bad358fc86a7b83f6656d9c3153cf0";
process.env.GEO_KEY = process.env.GEO_KEY || "c454d6955eaa4ea4b07401b649c36176";

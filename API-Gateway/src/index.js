const { ServerConfig, Logger } = require("./config/index");
const express = require("express");
const apiRoutes = require("./routes/index");
const rateLimit = require("express-rate-limit");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { BOOKING_SERVICE, FLIGHT_SERVICE } = require("./config/server-config");
const app = express();
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, //  2 minutes window
  max: 3, // limit ip to 3 request per window
});
app.use(express.json());
// to help express read json body
app.use(express.urlencoded({ extended: true }));
// to read url encodeed stuff
app.use(limiter);
app.use(
  "/flightService",
  createProxyMiddleware({
    target: FLIGHT_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/flightService": "/" },
  })
);

app.use(
  "/bookingService",
  createProxyMiddleware({
    target: BOOKING_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/bookingService": "/" },
  })
);

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`Server Listening on port ${ServerConfig.PORT}`);
  Logger.info("Successfully started the server");
});

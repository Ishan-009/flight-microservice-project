const { StatusCodes } = require("http-status-codes");
const { EmailService } = require("../services/index");

async function createTicket(req, res) {
  try {
    const response = await EmailService.createTicket({
      subject: req.body.subject,
      content: req.body.content,
      recepientEmail: req.body.recepientEmail,
    });
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something Wrong Occured" });
  }
}

module.exports = { createTicket };

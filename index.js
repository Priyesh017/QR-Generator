import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
import path from "path";

// Ask for a girlfriend's name
inquirer
  .prompt([
    {
      type: "input",
      name: "gfName",
      message: "What's your message?",
    },
  ])
  .then((answers) => {
    console.log(`Message: ${answers.gfName}`);

    // Generate a QR code for the girlfriend's name
    const qrcode = qr.image(answers.gfName, { type: "png" });

    // Define the file path for saving the QR code
    const fileName = `${answers.gfName}_QRCode.png`;
    const filePath = path.join("QR Code Generated", fileName);

    // Ensure the directory exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Pipe the QR code data into the file
    qrcode.pipe(fs.createWriteStream(filePath));

    console.log(`QR code generated and saved to ${filePath} successfully!`);
  })
  .catch((error) => {
    if (error.isTtyError) {
      // This error occurred when a terminal was not set up
      console.error("Terminal error: ", error);
    } else {
      // Something else went wrong
      console.error("An error occurred: ", error);
    }
  });

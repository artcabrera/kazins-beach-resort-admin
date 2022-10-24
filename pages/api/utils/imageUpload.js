import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (req, res) => {
  let filename;
  const uploadDir = path.join(process.cwd(), "/public/assets/images/uploads");
  const options = {
    uploadDir,
    filename: (name, ext, path, form) => {
      filename =
        Date.now().toString() + "." + path.originalFilename.split(".").pop();
      return filename;
    },
  };
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, field, files) => {
      if (err) reject(err);
      resolve(field, files);
      res.json({
        url: "http://localhost:4000/assets/images/uploads/" + filename,
      });
    });
  });
};

const handler = async (req, res) => {
  try {
    await fs.readdir(path.join(process.cwd(), "/public/assets/images/uploads"));
  } catch (error) {
    await fs.mkdir(path.join(process.cwd(), "/public/assets/images/uploads"));
  }
  await readFile(req, res);
};

export default handler;

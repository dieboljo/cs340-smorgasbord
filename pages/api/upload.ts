import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = "public/logos";
    form.keepExtensions = true;

    form.on('error', (err) => {
        res.status(501).json({ error:   'Formidable error.' });
    })
    .on('fileBegin', (name, file) => {
        file.path = form.uploadDir + '/' + file.name;
    })
    .on('end', () => {
        return res.status(200).json({ data: 'success'})
    });
   form.parse(req);
};

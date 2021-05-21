import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default async (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = "public/logos";
    form.keepExtensions = true;
    let filePrefix = '';

    form.once('error', (err) => {
        res.status(501).json({ error:   'Formidable error.' });
    })
    .on('field', (fieldName, fieldValue) => {
        if (fieldName == 'stamp') {
            filePrefix = fieldValue;
        }
    })
    .on('fileBegin', (name, file) => {
        file.path = form.uploadDir + '/' + filePrefix + '-' + file.name;
    })
    .once('end', () => {
        return res.status(200).json({ data: 'success'})
    });
    form.parse(req)
};

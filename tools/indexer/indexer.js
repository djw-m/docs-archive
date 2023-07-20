import { PDFDocument } from 'pdf-lib'
import parseArgs from 'minimist';
import fs from 'fs';
import path from 'path';

// Load a PDFDocument without updating its existing metadata
var argv = parseArgs(process.argv.slice(2));


if (argv.source == undefined) {
    console.log("Need --source");
    process.exit(1);
}

import {globby} from 'globby';

const paths = await globby(argv.source, { expandDirectories: {}, onlyFiles:true });


for(const p of paths) {
    let pathNoPrefix=p.replace(argv.source,"");
    let pathParts=pathNoPrefix.split("/"); // TODO: make os independent
    let edbPackage=pathParts[1];
    let version=pathParts[2];
    const existingPdfBytes = fs.readFileSync(p);
    const pdfDoc = await PDFDocument.load(existingPdfBytes, {
     updateMetadata: false
    });

    console.log(edbPackage,version, pdfDoc.getTitle(),p)
};

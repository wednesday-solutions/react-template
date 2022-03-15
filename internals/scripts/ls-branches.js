const { S3Client, ListObjectsCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const cheerio = require('cheerio');

async function getBranchNames() {
  const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  });
  const result = await s3Client.send(new ListObjectsCommand({ Bucket: process.env.AWS_S3_BUCKET }));
  const directories = new Set();
  result.Contents.forEach(({ Key }) => {
    if (Key.includes('/')) {
      directories.add(Key.slice(0, Key.lastIndexOf('/')));
    }
  });
  return [...directories];
}

async function updateFallbackPage({ deleteOnly } = {}) {
  let $ = cheerio.load(fs.readFileSync('uat/index.html'));
  $('ul').html('');
  let logMessage = 'Branches deleted';

  if (!deleteOnly) {
    const branches = await getBranchNames();
    let branchLi = '';
    branches.forEach(
      (branch) =>
        (branchLi += `<li class="branch"><a href="${branch}" target="_blank" rel="noreferrer">${branch}</a></li>\n\t`)
    );
    $(branchLi).appendTo('ul');
    logMessage = 'Branches added';
  }
  const htmlData = $.html().toString();
  fs.writeFileSync('uat/index.html', htmlData);
  // eslint-disable-next-line no-console
  console.log(logMessage);
}

updateFallbackPage({ deleteOnly: process.argv.includes('--delete-only') });

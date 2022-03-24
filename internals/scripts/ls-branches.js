const { S3Client, ListObjectsCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const cheerio = require('cheerio');

async function getBranchNames() {
  const AWS_CREDENTIAL_KEYS = ['AWS_REGION', 'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_S3_BUCKET'];
  const credentialsFound = AWS_CREDENTIAL_KEYS.every((key) => !!process.env[key]);
  if (!credentialsFound) {
    throw new Error('AWS Credentials not found');
  }
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
  $('ul.branches').html('');
  let logMessage = 'Branches deleted';

  if (!deleteOnly) {
    const branches = await getBranchNames();
    let branchLi = '';
    branches.forEach(
      (branch) =>
        (branchLi += `<li class="branch"><a href="${branch}" target="_blank" rel="noreferrer">${branch}</a></li>\n\t`)
    );
    $(branchLi).appendTo('ul.branches');
    logMessage = 'Branches added';
  }
  const htmlData = $.html().toString();
  fs.writeFileSync('uat/index.html', htmlData);
  // eslint-disable-next-line no-console
  console.log(logMessage);
}

updateFallbackPage({ deleteOnly: process.argv.includes('--delete-only') });

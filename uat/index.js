/**
 * Constructs a pathname by concatenating elements of the `pathnames` array up to the specified `index`.
 * @param {string[]} pathnames - An array of path segments to be concatenated.
 * @param {number} index - The index up to which path segments should be concatenated.
 * @returns {string} A string representing the concatenated path segments up to the specified index.
 * @date 01/03/2024 - 14:31:18
 *
 * @param {*} pathnames
 * @param {*} index
 * @returns {undefined}
 */
const createPotentialIterativePathname = (pathnames, index) => {
  let potentialIterativePathname = '';
  for (let i = 0; i < index; i++) {
    potentialIterativePathname += `/${pathnames[i]}`;
  }
  return potentialIterativePathname;
};

/**
 * Checks if a file is available at a given path by making an API call.
 * If the file is available, redirects the browser to the file's URL with
 * a query parameter indicating the original pathname.
 *
 * @date 01/03/2024 - 14:36:23
 *
 * @async
 * @param {string} newPathname - The pathname to check for file availability.
 * @param {string} pathname - The original pathname to use as the redirect URL.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the file is available and the redirect is successful, otherwise `false`.
 */
const isRemoteFileAvailable = async (newPathname, pathname) => {
  const updatedUrl = window.location.origin + newPathname;
  // make an API call to check if the s3 buckets returns a match or a miss
  try {
    const res = await fetch(updatedUrl);
    if (res.ok) {
      // if it's a match you've now found your baseURL. You will attach the original pathname
      // for example "profile/settings" as the redirect URL and redirect to the feature-release url
      window.location.replace(`${updatedUrl}/index.html?redirect_uri=${pathname.replace(newPathname, '')}`);
      return true;
    }
  } catch (error) {
    console.error('Failed to check file availability:', error);
  }
  return false;
};

/**
 * This function is used for an release on PR workflow.
 * In this workflow we create a release environment for every PR that is pushed.
 * To prevent full pricing for a new environment on every PR we resuse the same s3 bucket.
 * We supplement this with smart routing i.e base-url/branch-name
 * so you can access any feature release environment by going ot the base-url/branch-name in the browser.
 * @date 01/03/2024 - 14:12:37
 *
 * @export
 * @async
 * @returns {*}
 */
export async function redirect() {
  let pathname = window.location.pathname;

  const indexHtml = indexHtml;
  // check if this is the baseURL, if it is then return. UAT flows aren't applicable
  if (['', '/', indexHtml].includes(pathname)) {
    return;
  }

  //  now if pathname isn't the baseUrl and still contains an index.html, remove it.
  if (pathname.includes(indexHtml)) {
    pathname = pathname.replace(indexHtml, '');
  }

  // split by `/` to figure difference between app paths and branch names with a `/`
  // for example feat/ABC-123
  const pathnames = pathname.split('/').filter((val) => val !== '');
  const loopCount = pathnames.length;

  // loop over potential permutation & combinations to find the baseURL for this feature-release.
  for (let k = loopCount - 1; k > 0; k--) {
    // construct the pathname again. Since the value of k is reducing this will keep moving backward till it finds a match
    // eg.
    // - feat/ABC-123/profile/settings
    // - feat/ABC-123/profile
    // - feat/ABC-123

    const newPathname = createPotentialIterativePathname(pathnames, k);
    const isFileAvailable = await isRemoteFileAvailable(newPathname, pathname);
    if (isFileAvailable) {
      return;
    }
  }

  // in case nothing else works, it means the URL is malformed hence send them to the baseURL.
  window.location.replace(`${window.location.origin}/index.html`);
}

redirect();

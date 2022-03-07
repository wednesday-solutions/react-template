export async function detectRedirect() {
  let pathname = window.location.pathname;

  if (!['', '/'].includes(pathname)) {
    if (pathname.includes('/index.html')) {
      pathname = pathname.replace('/index.html', '');
    }
    await getSPAHTML();
  } else {
    return;
  }

  async function getSPAHTML() {
    let newPathname = pathname;

    while (newPathname) {
      // remove empty strings in the edges after split
      let pathnames = newPathname.split('/').filter((val) => val !== '');
      let updatedPathname = '';
      for (let i = 0; i < pathnames.length - 1; i++) {
        updatedPathname += `/${pathnames[i]}`;
      }
      if (!updatedPathname) {
        window.location.assign(window.location.origin + '/index.html');
        return;
      }
      let updatedUrl = window.location.origin + updatedPathname;
      const res = await fetch(updatedUrl);
      if (res.ok) {
        window.location.assign(updatedUrl + '/index.html' + `?redirect_uri=${pathname.replace(updatedPathname, '')}`);
        return;
      } else {
        newPathname = updatedPathname;
      }
    }
  }
}

detectRedirect();

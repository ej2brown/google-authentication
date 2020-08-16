
const init = () => {
  console.log("init");
  gapi.load('auth2', function () {
    auth2 = gapi.auth2.init({
      client_id: `${GOOGLE_CLIENT_ID}`,
      fetch_basic_profile: false,
      scope: 'profile'
    });

    // Sign the user in, and then retrieve their ID.
    auth2.signIn().then(function () {
      console.log(auth2.currentUser.get().getId());
    });
  });
  console.log("end");
};

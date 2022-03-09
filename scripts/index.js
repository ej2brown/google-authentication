$(document).on(() => {
  console.log("ready!");
  
  gapi.load('auth2', initialize);

  const initialize = () => {
    console.log('Initializing...');

    gapi.auth2
      .init({ client_id: proess.env.GOOGLE_CLIENT_ID || "" })
      .then(() => {
        renderButton();
      });

    // Listen for sign-in state changes.
    auth2.isSignedIn.listen(signinChanged);

    // Listen for changes to current user.
    auth2.currentUser.listen(userChanged);

    // Sign in the user if they are currently signed in.
    if (auth2.isSignedIn.get()) {
      auth2.signIn();
    }

    // Start with the current values.
    renderUserInfo(auth2.currentUser.get().getBasicProfile());
  };

  const authInstance = gapi.auth2.getAuthInstance({
    client_id: proess.env.GOOGLE_CLIENT_ID || ""
  }).then(() => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', proess.env.SERVER_URL);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
      console.log('Signed in as: ' + xhr.responseText);
    };
    xhr.send('idtoken=' + id_token);
  });

  /**
   * Listener method for sign-out live value.
   *
   * @param {boolean} isSignedIn the updated signed out state.
   */
  const signinChanged = function (isSignedIn) {
    console.log(isSignedIn ? 'Signed-in' : 'Signed-out');
  };


  /**
   * Listener method for when the user changes.
   *
   * @param {GoogleUser} user the updated user.
   */
  const userChanged = (user) => {
    console.log('User Changed: ', user);
    console.log('User auth2.currentUser.get(): ', auth2.currentUser.get());
    console.log('User authInstance: ', authInstance);

    renderUserInfo(auth2.currentUser.get().getBasicProfile());
  };

  const renderButton = () => {
    gapi.signin2.render('signin-btn',
      {
        'scope': 'profile email',
        'width': 240,
        'height': 40,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': () => { },
        'onfailure': () => { }
      });
  }

  const renderUserInfo = (profile) => {
    const infoContainer = $('.user-info').html('');
    const profileInfo = `
      <p id="profile">
        ID: ${profile.getId()}
        Full Name: ${profile.getName()}
        Given Name: ${profile.getGivenName()}
        Family Name: ${profile.getFamilyName()}
        Image URL: ${profile.getImageUrl()}
        Email: ${profile.getEmail()}
      </p>
    `;
    return infoContainer.append(profileInfo);
  }

  $('.sign-out').on("click", () => {
    signOut();
  });

  const signOut = () => {
    console.log('Signing out...');
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('User signed out.');
    });
  }

});

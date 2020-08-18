$(document).ready(() => {
  console.log("ready!");
  // init();
  appStart();
  
})

  
  var auth2; // The Sign-In object.
  var googleUser; // The current user.
  
  /**
   * Calls startAuth after Sign in V2 finishes setting up.
   */
  var appStart = function() {
    gapi.load('auth2', initSigninV2);
  };
  
  
  /**
   * Initializes Signin v2 and sets up listeners.
   */
  var initSigninV2 = function() {
    auth2 = gapi.auth2.getAuthInstance({
        client_id: `431899335430-fllb4nqcmn78etdacdttgv4sbt8luhjt.apps.googleusercontent.com`,
        scope: 'profile'
    });
  
    // Listen for sign-in state changes.
    auth2.isSignedIn.listen(signinChanged);
  
    // Listen for changes to current user.
    auth2.currentUser.listen(userChanged);
  
    // Sign in the user if they are currently signed in.
    if (auth2.isSignedIn.get() == true) {
      auth2.signIn();
    }
  
    // Start with the current live values.
    refreshValues();
  };
  
  
  /**
   * Listener method for sign-out live value.
   *
   * @param {boolean} val the updated signed out state.
   */
  var signinChanged = function (val) {
    console.log('Signin state changed to ', val);
    document.getElementById('signed-in-cell').innerText = val;
  };
  
  
  /**
   * Listener method for when the user changes.
   *
   * @param {GoogleUser} user the updated user.
   */
  var userChanged = function (user) {
    console.log('User now: ', user);
    googleUser = user;
    updateGoogleUser();
    document.getElementById('curr-user-cell').innerText =
      JSON.stringify(user, undefined, 2);
  };
  
  
  /**
   * Updates the properties in the Google User table using the current user.
   */
  var updateGoogleUser = function () {
    if (googleUser) {
      document.getElementById('user-id').innerText = googleUser.getId();
      document.getElementById('user-scopes').innerText =
        googleUser.getGrantedScopes();
      document.getElementById('auth-response').innerText =
        JSON.stringify(googleUser.getAuthResponse(), undefined, 2);
    } else {
      document.getElementById('user-id').innerText = '--';
      document.getElementById('user-scopes').innerText = '--';
      document.getElementById('auth-response').innerText = '--';
    }
  };
  
  
  /**
   * Retrieves the current user and signed in states from the GoogleAuth
   * object.
   */
  var refreshValues = function() {
    if (auth2){
      console.log('Refreshing values...');
  
      googleUser = auth2.currentUser.get();
  
      document.getElementById('curr-user-cell').innerText =
        JSON.stringify(googleUser, undefined, 2);
      document.getElementById('signed-in-cell').innerText =
        auth2.isSignedIn.get();
  
      updateGoogleUser();
    }
  }


  // ========================== VERSION TWO ===========================================
  // Discontinued due to modularization issues of onSignIn function 
/*
  const init = () => {
    gapi.load('auth2', function () {
      auth2 = gapi.auth2.getAuthInstance({
        client_id: `431899335430-fllb4nqcmn78etdacdttgv4sbt8luhjt.apps.googleusercontent.com`,
        scope: 'profile'
      });

      // Sign the user in, and then retrieve their ID.
      auth2.signIn().then(function () {
        console.log(auth2.currentUser.get().getId());
      });
    });
  };

  document.getElementById("g-signin2").addEventListener("click", onSignIn);

  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    console.log('id_token: ' + id_token);

    const result = `
    Name: ${profile.getName()}
    Image URL: ${profile.getImageUrl()} 
    Email: ${profile.getEmail()}
  `;

    document.getElementById("signedIn").append(result)
    console.log("onSignIn ends");
  };
  */
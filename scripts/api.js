const { Octokit } = require("@octokit/core");

const start = async () => {

  const octokit = new Octokit({ auth: `` });

  try {
    const response = await octokit.request("GET /repos/{owner}/{repo}/actions/secrets/{secret_name}", {
      owner: "ej2brown",
      repo: "google-authentication",
      secret_name: "GOOGLE_CLIENT_ID"
    })

    let data = await response.data
    console.error(`data response: ${data}`);

    return data
  } catch (err) {
    let error = {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message })
    }
    console.error(`Failed due to error: ${error.body}`);
  }
}
start()

module.exports = start;
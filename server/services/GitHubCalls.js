const https = require("https");
const crypto = require("crypto");
const queryString = require("querystring");
const request = require("request");

const gitConfig = require("../config/index").github;

class GitHubCalls {
  constructor() {}

  gitAuthWithPassword(username, password) {
    let base64Auth = Buffer.from(username + ":" + password).toString("base64");
    let optionsget = {
      host: "api.github.com",
      port: 443,
      path: "/user",
      method: "GET",
      headers: { "user-agent": "node.js", Authorization: "Basic " + base64Auth }
    };

    return new Promise((resolve, reject) => {
      let reqGet = https.request(optionsget, function(res) {
        res.on("data", function(d) {
          console.info("GET result:\n");
          process.stdout.write(d);
          console.info("\n\nCall completed");
        });
        resolve(res.statusCode);
      });

      reqGet.end();
      reqGet.on("error", function(e) {
        reject(err);
      });
    });
  }

  gitAuthWithToken(OAuthToken) {
    let optionsget = {
      host: "api.github.com",
      port: 443,
      path: "/user",
      method: "GET",
      headers: { "user-agent": "node.js", Authorization: "token " + OAuthToken }
    };

    return new Promise((resolve, reject) => {
      let reqGet = https.request(optionsget, function(res) {
        res.on("data", function(d) {
          console.info("GET result:\n");
          process.stdout.write(d);
          console.info("\n\nCall completed");
        });
        resolve(res.statusCode);
      });

      reqGet.end();
      reqGet.on("error", function(e) {
        reject(err);
      });
    });
  }

  gitAuthWithCallback(callback) {
    var unGuessableState = crypto.createHash("sha256");
    unGuessableState.update(Math.random().toString());

    console.log("hash: " + unGuessableState.digest());

    let optionsget = {
      host: "github.com",
      port: 443,
      path: "/login/oauth/authorize",
      method: "GET",
      headers: {
        "user-agent": "node.js",
        Authorization: "Basic " + base64Auth
      },
      client_id: gitConfig.client_id,
      redirect_uri: callback,
      scope: "",
      state: unGuessableState,
      allow_signup: "true"
    };

    let reqGet = https.request(optionsget, function(res) {
      res.on("data", function(d) {
        console.info("GET result:\n");
        process.stdout.write(d);
        console.info("\n\nCall completed");
      });
      resolve(res.statusCode);
    });

    reqGet.end();
    reqGet.on("error", function(e) {
      reject(err);
    });

    return unGuessableState;
  }
  //method returning client id, name, email, avatar url || argument client generated token
  gitGetUserIdAndInfo(token) {
    let optionsGet = {
      host: "api.github.com",
      port: 443,
      path: "/user" + "?access_token=" + token,
      method: "GET",
      headers: {
        "user-agent": "node.js"
      }
    };

    //    console.log(token);

    return new Promise((resolve, reject) => {
      let reqGet = https.request(optionsGet, function(res) {
        let rawData = "";
        res.on("data", chunk => {
          rawData += chunk;
        });
        res.on("end", () => {
          try {
            const parsedData = JSON.parse(rawData);

            const clientInfo = {
              clientId: parsedData.id,
              clientName: parsedData.name,
              clientEmail: parsedData.email,
              clientAvatar: parsedData.avatar_url
            };
            //            console.log(clientInfo);
            resolve(clientInfo);
          } catch (e) {
            console.error(e.message);
          }
        });
      });

      reqGet.end();
      reqGet.on("error", function(e) {
        reject(err);
      });
    });
  }

  gitPostGetUserToken(code) {
    return new Promise((resolve, rejest) => {
      request.post(
        `${gitConfig.github_url_token}?client_id=${
          gitConfig.client_id
        }&client_secret=${gitConfig.client_secret}&code=${code}`,
        (error, response, body) => {
          // console.log(body + "\n\n\n");
          const jsonWithToken = queryString.decode(body);
          // console.log(json.access_token);

          if (error) {
            reject(err);
          }
          return resolve(jsonWithToken.access_token);
        }
      );
    });
  }
}

module.exports = GitHubCalls;

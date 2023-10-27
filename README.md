<h1 align="center">Getting Started with WorkInn</h1> 
<br>

<div align="center">

[![Welcome to my profile](https://img.shields.io/badge/Hello,Programmer!-Welcome-blue.svg?style=flat&logo=github)](https://github.com/ShivangM)
[![Open Source Love](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/ShivangM/workinn)
![License](https://img.shields.io/badge/License-MIT-red.svg)
![Stars](https://img.shields.io/github/stars/ShivangM/workinn?style=flat&logo=github)
![Forks](https://img.shields.io/github/forks/ShivangM/workinn?style=flat&logo=github)

</div>

<div align="center">
  <img height=240 src="./public/WorkInn Logo Dark.svg" alt="WorkInn Logo">
</div>

<br>

<div align="left">
  <h2>Description:</h2>
    <p>WorkInn is a software platform that leverages machine learning and blockchain technology to revolutionize the freelancing industry. It is designed to establish a personalized ecosystem for freelancers and clients, simplifying the process of hiring and working online.</p>
    <h2>Objectives:</h2>
    <ul>
        <li>Develop a machine learning algorithm to analyze user preferences and provide personalized job recommendations.</li>
        <li>Create an intuitive and user-friendly interface for freelancers to showcase their skills and portfolios.</li>
        <li>Implement a user-friendly search and matching system for clients to identify suitable professionals.</li>
        <li>Provide real-time skill trend insights to keep users updated on industry demands.</li>
        <li>Integrate blockchain technology for secure and transparent transactions through smart contracts.</li>
        <li>Establish WorkInn as a trusted and user-centric freelancing platform in the market.</li>
    </ul>
    <h2>Benifits:</h2>
    <ul>
        <li>Personalized Job Recommendations: WorkInn utilizes machine learning to analyze user preferences and provide custom-tailored job recommendations, saving time and effort for both freelancers and clients.</li>
        <li>Effortless Connections: WorkInn simplifies the process of finding suitable professionals for projects, fostering efficient collaborations between freelancers and clients.</li>
        <li>Skill Trend Insights: Users of WorkInn stay informed about the latest skill trends and in-demand skills, allowing them to adapt and grow their freelancing careers.</li>
        <li>Secure and Transparent Transactions: WorkInn incorporates blockchain technology and smart contracts to ensure secure, transparent, and tamper-proof transactions, minimizing disputes and enhancing trust.</li>
    </ul>
</div>

## **Alchemy API Key Setup**
1. **Create an account on Alchemy:**
    - Go to the [Alchemy website](https://alchemy.com/) and create an account if you don't have one already.

2. **Generate an API key:**
    - Once you have an account, navigate to the API section in your Alchemy account dashboard.
    - Create a new project named WorkInn or any other name if you want.
    - Generate an API key for your project.
3. Add your API key to env.local file setting up the ALCHEMY_ID environment variable.
   ```yml
   ALCHEMY_ID = your_alchemy_id
   ```

## **Setting up Firebase**

Follow these steps to set up Firebase for this project.

1. **Create a Firebase Project:**
   - Go to [Firebase Console](https://console.firebase.google.com/) and create a new project. Make sure to enable necessary services like Firestore, Authentication, and Storage, depending on your project requirements.
   - During the setup, enable Firebase Analytics to leverage powerful insights into your app's performance and user behavior.

2. **Create a Firebase Web App:**
   - In your Firebase project settings, add a web app to generate the necessary configuration details, including the API key, auth domain, and other required parameters. 

3. **Setting up environment variables:**
   - Rename `.env.template` to `.env.local`.
   - Fill in the placeholder values in the `.env.local` file with your Firebase project configuration. Use the Firebase project settings to get the required values.

4. **Service Account Key:**
   - Download the service account key JSON file from the Firebase console.
   - Convert the contents of the JSON file to a string. You can use online tools like [Remove Line Breaks Tool](https://capitalizemytitle.com/tools/remove-line-breaks/) for this.
   - Set the converted JSON as the value for the `FIREBASE_SERVICE_ACCOUNT_KEY` environment variable in your `.env.local` file.
   - Make sure you add value in the env file wrapped with a single quote ie. FIREBASE_SERVICE_ACCOUNT_KEY = 'Service Account JSON content after removing line breaks'.
   - Please make sure that you keep your JSON file in the root directory or delete it once the value is set. Do not expose it while making commits.

5. **Populating Database:**
   - Run the following script using yarn or npm to populate your Firestore database.
     
   ```yml
   yarn populate
   ```

## **Getting Started**
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/ShivangM/workinn?logo=github)](https://ShivangM/workinn/) [![GitHub commit activity](https://img.shields.io/github/commit-activity/m/ShivangM/workinn?color=bluevoilet&logo=github)](https://github.com/ShivangM/workinn/commits/) [![GitHub repo size](https://img.shields.io/github/repo-size/ShivangM/workinn?logo=github)](https://github.com/ShivangM/workinn)

For a quick start, you can follow the steps below:

1. Star <a href="https://github.com/ShivangM/workinn" title="this">this</a> repository.
2. Fork <a href="https://github.com/ShivangM/workinn" title="this">this</a> repository.
3. Clone the **forked** repository.

```yml
git clone https://github.com/<your-github-username>/workinn
```

3. Navigate to the project directory.

```py
cd workinn
```

4. Create a new branch.

```yml
git checkout -b <your_branch_name>
```

Run the following command to install the required dependencies.

1. `yarn install` - install the required dependencies
2. `yarn dev` - start the development server
3. Open http://localhost:3000 in your browser

4. <a href="/CONTRIBUTING.md">Contribute</a>

5. Stage your changes and commit

```css
git add -a

git commit -m "<your_commit_message>"
```

7. Push your local commits to the remote repo.

```yml
git push -u origin <your_branch_name>
```

8. Create a <a href="https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request" title="Pull Request">Pull-Request</a> to `main`.

9. Congratulations! 🎉 you've made your contribution to <a href="https://github.com/ShivangM/workinn" title="WorkInn">WorkInn</a>.

<h1 id="contribute">Contributing</h1>

<p>
   Thank you for your interest in contributing to our Repo! Pull requests are welcome. For fixing typos, please make a PR with your fixes. For other contributions, we suggest you read our <a href="https://github.com/ShivangM/workinn/blob/main/contributing.md">contribution guidelines</a> to see how you can contribute to this project. We are happy for every contribution. 
   <hr> 
</p>

<h1 id="prs">Issues & Pull Requests</h1>

Before making pull requests please look at our contributing guidelines. You can start working on the issues which are mentioned in the issues section. Just drop a comment before working on the issue. Thank you!

#  License & Copyright

The code in this repo is licensed under the <a href="https://github.com/ShivangM/workinn/blob/main/LICENSE">MIT License</a>. Feel free to use and share it as per the license.

# ✨ Contributors

<a href="https://github.com/ShivangM/workinn/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ShivangM/workinn" />
</a>


<div align="center">
 <img src="https://forthebadge.com/images/badges/built-with-love.svg" alt="love" />
 <img src="https://forthebadge.com/images/badges/thats-how-they-get-you.svg" alt="how">
</div>

# AI Chatbot 🤖

<div align="center">

![AI Chatbot Screenshot](https://raw.githubusercontent.com/naimkatiman/ChatGPT-Clone/v3/screenshot.png)

![AI Chatbot Screenshot](https://raw.githubusercontent.com/naimkatiman/ChatGPT-Clone/v3/screenshot1.png)


*An AI-powered chatbot created with assistance from Claude 3.5*

[![GitHub license](https://img.shields.io/github/license/naimkatiman/ChatGPT-Clone)](https://github.com/naimkatiman/ChatGPT-Clone/blob/v3/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/naimkatiman/ChatGPT-Clone)](https://github.com/naimkatiman/ChatGPT-Clone/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/naimkatiman/ChatGPT-Clone)](https://github.com/naimkatiman/ChatGPT-Clone/network)
[![GitHub issues](https://img.shields.io/github/issues/naimkatiman/ChatGPT-Clone)](https://github.com/naimkatiman/ChatGPT-Clone/issues)

</div>

## 🌟 Features

- 💬 Real-time chat interface
- 🧠 Powered by OpenAI's GPT-3.5 model
- 🎨 Clean and responsive design using Bootstrap
- 🔄 Easy to extend and customize
- 🔥 Firebase hosting and Cloud Functions

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v14 or later)
- npm (v6 or later)
- Firebase CLI
- An OpenAI API key

## 🚀 Setup

1. Clone the repository: 
   ```
   git clone https://github.com/naimkatiman/ChatGPT-Clone.git
   cd ChatGPT-Clone
   ```
2. Install dependencies: `npm install`
3. Set up environment: 
   ```
   cp .env.example .env
   ```
   Then edit `.env` and add your OpenAI API key
4. Install Firebase CLI (if not already installed):
   ```
   npm install -g firebase-tools
   ```
5. Log in to Firebase:
   ```
   firebase login
   ```
6. Initialize Firebase in your project:
   ```
   firebase init
   ```
   Select Hosting and Functions when prompted.
7. Build the project: `npm run build`
8. Start the server: `npm start`

## Development

To run the project locally:

1. Start the development server:
   ```
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3000`

## Deployment

To deploy the project to Firebase:

1. Build the project:
   ```
   npm run build
   ```
2. Deploy to Firebase:
   ```
   firebase deploy
   ```

## 🖥️ Usage

After deployment, open your browser and navigate to the Firebase-hosted URL (you can find this in the Firebase Console or in the output after deployment).

<details>
<summary>👀 Preview</summary>
<br>

![AI Chatbot Demo](https://raw.githubusercontent.com/naimkatiman/ChatGPT-Clone/v3/demo.gif)

</details>

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Naim Katiman - [@naimkatiman](https://twitter.com/naimkatiman)

Project Link: [https://github.com/naimkatiman/ChatGPT-Clone](https://github.com/naimkatiman/ChatGPT-Clone)

## Acknowledgments

- OpenAI for providing the GPT-3.5 model
- Firebase for hosting and serverless functions
- Bootstrap for responsive design

---

<div align="center">
Made with ❤️ and ☕
</div>
```

import './styles/App.css'; // Import your global styles

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to ScrapChef</h1>
        <p>Your AI-powered recipe generator</p>
      </header>
      <main>
        <section>
          <h2>Get Started</h2>
          <p>Start creating your favorite recipes using ScrapChef!</p>
          {/* You can add buttons or links here to navigate to different parts of your app */}
        </section>
        <section>
          <h2>Features</h2>
          <ul>
            <li>AI Recipe Suggestions</li>
            <li>Save Recipes to Your Profile</li>
            <li>Personalized Recommendations</li>
          </ul>
        </section>
      </main>
      <footer>
        <p>Powered by ScrapChef</p>
        <p>
          <a
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;


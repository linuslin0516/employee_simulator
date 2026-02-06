/**
 * App 根元件 + 渲染入口
 */
const { TitleScreen, GameScreen } = window.GameComponents;

function App() {
  const [selectedJob, setSelectedJob] = React.useState(null);

  if (!selectedJob) {
    return <TitleScreen onSelectJob={setSelectedJob} />;
  }

  return (
    <GameScreen
      key={selectedJob + Date.now()}
      job={selectedJob}
      onRestart={() => setSelectedJob(null)}
    />
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

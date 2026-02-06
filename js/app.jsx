/**
 * App 根元件 + 渲染入口
 * 使用 hash router 進行頁面導向
 *
 * 路由：
 *   #/           → 首頁（職業選擇）
 *   #/play/:job  → 遊戲畫面
 *   #/about      → 遊戲說明
 */
const { TitleScreen, GameScreen, EndingScreen, AboutPage } = window.GameComponents;

function App() {
  var router = window.useRouter();

  // #/about → 遊戲說明頁
  if (router.page === 'about') {
    return <AboutPage />;
  }

  // #/play/:job → 遊戲畫面
  if (router.page === 'play' && router.param) {
    var jobId = router.param;
    // 驗證 job 是否有效
    if (!window.JOBS[jobId]) {
      window.navigate('');
      return null;
    }
    return (
      <GameScreen
        key={jobId}
        job={jobId}
        onRestart={function () { window.navigate(''); }}
      />
    );
  }

  // 預設：首頁（職業選擇）
  return (
    <TitleScreen
      onSelectJob={function (jobId) {
        window.navigate('play/' + jobId);
      }}
    />
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

/**
 * 簡易 Hash Router
 * 路由格式：#/path
 *
 * 支援的路由：
 *   #/         → 首頁（職業選擇）
 *   #/play/:id → 遊戲畫面（support / trading / compliance）
 *   #/about    → 遊戲說明
 */
const { useState, useEffect, useCallback } = React;

function getHash() {
  return window.location.hash.replace(/^#\/?/, '') || '';
}

function navigate(path) {
  window.location.hash = '#/' + path;
}

// ==================== useRouter Hook ====================
function useRouter() {
  const [route, setRoute] = useState(getHash());

  useEffect(() => {
    function onHashChange() {
      setRoute(getHash());
    }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const go = useCallback(function (path) {
    navigate(path);
  }, []);

  // Parse route
  var parts = route.split('/');
  var page = parts[0] || '';
  var param = parts[1] || '';

  return { page: page, param: param, go: go, raw: route };
}

// Export
window.useRouter = useRouter;
window.navigate = navigate;

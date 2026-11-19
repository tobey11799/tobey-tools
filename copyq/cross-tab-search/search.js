// CopyQ "Search all tabs" — search every tab and collect matches into a "search results" tab.
// Readable source. Do NOT paste this into CopyQ directly (multi-line commands break global shortcuts);
// run ./build.sh to generate install.js and cross-tab-search.ini.
var Q = dialog('&Search all tabs', '');
if (Q !== undefined) {
  Q = ('' + Q).trim();
  if (Q.length > 0) {
    var needle = Q.toLowerCase();
    var RT = 'search results';
    var tabs = tab();
    try { removeTab(RT); } catch (e) {}
    var CAP = 1000;
    var hits = [];
    for (var i = 0; i < tabs.length; ++i) {
      if (tabs[i] === RT) { continue; }
      var s = ItemSelection(tabs[i]).selectAll();
      var n = s.length; if (n > CAP) { n = CAP; }
      for (var r = 0; r < n; ++r) {
        var it = s.itemAtIndex(r);
        if (!it) { continue; }
        var txt = str(it['text/plain']);
        if (!txt) { continue; }
        if (txt.toLowerCase().indexOf(needle) < 0) { continue; }
        hits.push([txt, tabs[i] + ' #' + r]);
      }
    }
    if (hits.length === 0) {
      popup('CopyQ search', 'No matches: ' + Q);
    } else {
      tab(RT);
      for (var j = hits.length - 1; j >= 0; --j) {
        write(0, 'text/plain', hits[j][0], 'application/x-copyq-item-notes', hits[j][1]);
      }
      show(RT);
    }
  }
}

(function () {
    const ARCHIVE_BASE_URL = "https://archive.org/download/9_20261019_20261019_1439/";

    function initFixes() {
        const isHomePage = window.location.pathname === "/" || 
                           window.location.pathname.endsWith("index.html") || 
                           window.location.pathname === "";

        // 1. إصلاح المشغل الصوتي ليعتمد على الأرشيف مباشرة
        const audioPlayer = document.querySelector('audio');
        if (audioPlayer) {
            let currentSrc = audioPlayer.src || (audioPlayer.querySelector('source') ? audioPlayer.querySelector('source').src : "");
            if (currentSrc) {
                const fileName = currentSrc.split('/').pop();
                if (fileName && !currentSrc.includes('archive.org')) {
                    const newArchiveUrl = ARCHIVE_BASE_URL + fileName;
                    audioPlayer.src = newArchiveUrl;
                    const sourceTag = audioPlayer.querySelector('source');
                    if (sourceTag) sourceTag.src = newArchiveUrl;
                    audioPlayer.load();
                }
            }
        }

        // 2. تعليقات الصفحة الرئيسية بالتصميم الجديد (أسود فاتح، كتابة بيضاء، ومربع أحمر)
        if (isHomePage) {
            if (!document.getElementById("main-comments-box")) {
                const mainCommentsBox = document.createElement("div");
                mainCommentsBox.id = "main-comments-box";
                mainCommentsBox.style.cssText = "background: #222222; color: #ffffff; padding: 20px; border-radius: 12px; border: 2px solid #ff5252; margin: 25px auto; max-width: 600px; text-align: center; font-family: 'Cairo', sans-serif; box-shadow: 0 4px 15px rgba(0,0,0,0.5);";
                mainCommentsBox.innerHTML = `
                    <h3 style="margin-top:0; color:#ffffff; font-size:18px; margin-bottom: 10px;">💬 تعليقات زوار الأرشيف الباسمي</h3>
                    <div style="color: #1a1a1a; font-weight: bold; font-size: 14px; margin-bottom: 15px; letter-spacing: 2px;">~~~~~ ~~~~~ ~~~~~</div>
                    <iframe src="https://widgets.webynize.com/comments/iframe/13869" frameborder="0" width="100%" height="500px" style="border-radius: 8px; background: #1a1a1a;"></iframe>
                `;
                document.body.appendChild(mainCommentsBox);
            }
            return;
        }

        // 3. زر العودة للرئيسية
        let backBtn = document.querySelector('.back-link, .btn-back, a[href*="index"], a[href="/"]');
        if (!backBtn) {
            backBtn = document.createElement("a");
            backBtn.href = "index.html";
            backBtn.className = "back-link";
            backBtn.innerHTML = "← العودة إلى الرئيسية";
            backBtn.style.cssText = "display: block; width: fit-content; margin: 10px auto 15px auto; color: #4fc3f7; text-decoration: none; font-weight: bold; font-family: 'Cairo', sans-serif;";
            document.body.insertBefore(backBtn, document.body.firstChild);
        }

        // 4. الإعلانات ومربع الترحيب
        if (!document.getElementById("top-ad-box")) {
            const topAdBox = document.createElement("div");
            topAdBox.id = "top-ad-box";
            topAdBox.style.cssText = "text-align: center; margin: 15px auto; width: 100%; overflow: hidden;";
            topAdBox.innerHTML = '<iframe width="468" height="60" frameborder="0" scrolling="no" srcdoc="<body style=\'margin:0;padding:0;text-align:center;\'><script>atOptions = {\x27key\x27:\x278de5765caba9eac6b17ebb6fd0feee77\x27,\x27format\x27:\x27iframe\x27,\x27height\x27:60,\x27width\x27:468,\x27params\x27:{}};</script><script src=\x27https://bauval.org/22/8de5765caba9eac6b17ebb6fd0feee77\x27></script></body>"></iframe>';
            backBtn.parentNode.insertBefore(topAdBox, backBtn.nextSibling);

            const welcomeBox = document.createElement("div");
            welcomeBox.style.cssText = "background-color: #222222; border: 1px solid #444; color: #ff6b6b; padding: 14px; border-radius: 8px; text-align: center; margin: 15px auto; max-width: 600px; font-weight: bold; font-size: 15px; line-height: 1.8; box-shadow: 0 4px 10px rgba(0,0,0,0.3); font-family: 'Cairo', sans-serif;";
            welcomeBox.innerHTML = "🖤 دعمكم باستمراركم وتصفحكم هو سر نجاحنا واستمرارنا <br>✨ لإبقاء هذا الأرشيف متجدداً ومستمراً، شارك الموقع مع أصدقائك <br>📌 سيتم إضافة المزيد من النوادر الباسمية ذات الجودة العالية بدعمكم ❤";
            topAdBox.parentNode.insertBefore(welcomeBox, topAdBox.nextSibling);
        }

        // 5. زر التحميل والسمارت لينك
        let downloadBtn = document.querySelector('.btn-download, .download-link, a[href*="download"], a[download]');
        if (!downloadBtn && audioPlayer) {
            const noticeBox = document.createElement("div");
            noticeBox.className = 'download-notice';
            noticeBox.style.cssText = "background-color: #222; border: 1px solid #ffd700; color: #fff; padding: 10px; border-radius: 8px; font-size: 13px; margin: 15px auto 8px auto; max-width: 500px; text-align: center; font-weight: bold; line-height: 1.6; font-family: 'Cairo', sans-serif;";
            noticeBox.innerHTML = "عندما تضغط على زر التحميل سيتم تنزيل القصيدة وسينتقل الإعلان إلى تبويب آخر ❤<br>اغلقه وارجع للاستماع ❤";
            audioPlayer.parentNode.insertBefore(noticeBox, audioPlayer.nextSibling);

            downloadBtn = document.createElement("a");
            downloadBtn.href = "#";
            downloadBtn.className = "download-link";
            downloadBtn.innerHTML = "📥 تحميل القصيدة (M4A)";
            downloadBtn.style.cssText = "display: block; width: fit-content; margin: 10px auto 15px auto; background: #ff5252; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; font-family: 'Cairo', sans-serif; text-align: center;";
            noticeBox.parentNode.insertBefore(downloadBtn, noticeBox.nextSibling);
        }

        if (downloadBtn) {
            downloadBtn.addEventListener('click', function (e) {
                e.preventDefault();
                window.open('https://asiafilm.org/4/73a687e897f5209e1862dc15da5dba30', '_blank');
                let mediaUrl = audioPlayer ? (audioPlayer.src || (audioPlayer.querySelector('source') ? audioPlayer.querySelector('source').src : "")) : "";
                if (mediaUrl) {
                    setTimeout(() => {
                        window.open(mediaUrl, '_blank');
                    }, 500);
                }
            });
        }

        // 6. تعليقات صفحات القصائد بالتصميم الجديد والمربع الأحمر
        if (!document.getElementById("poem-comments-box")) {
            const bottomContainer = document.createElement("div");
            bottomContainer.id = "poem-comments-box";
            bottomContainer.style.cssText = "margin: 30px auto 20px auto; max-width: 600px; padding: 15px; font-family: 'Cairo', sans-serif; text-align: center;";
            bottomContainer.innerHTML = `
                <div style="background: #222222; color: #ffffff; padding: 20px; border-radius: 12px; border: 2px solid #ff5252; box-shadow: 0 4px 15px rgba(0,0,0,0.5); margin-bottom: 20px;">
                    <h3 style="margin-top:0; color:#ffffff; font-size:18px; margin-bottom: 10px;">💬 شاركنا رأيك بالقصيدة</h3>
                    <div style="color: #1a1a1a; font-weight: bold; font-size: 14px; margin-bottom: 15px; letter-spacing: 2px;">~~~~~ ~~~~~ ~~~~~</div>
                    <iframe src="https://widgets.webynize.com/comments/iframe/13869" frameborder="0" width="100%" height="340px" style="border-radius: 8px; background: #1a1a1a;"></iframe>
                </div>
                <div style="text-align: center; margin: 25px auto; width: 100%; overflow: hidden;">
                    <iframe width="468" height="60" frameborder="0" scrolling="no" srcdoc="<body style=\'margin:0;padding:0;text-align:center;\'><script>atOptions = {\x27key\x27:\x278de5765caba9eac6b17ebb6fd0feee77\x27,\x27format\x27:\x27iframe\x27,\x27height\x27:60,\x27width\x27:468,\x27params\x27:{}};</script><script src=\x27https://bauval.org/22/8de5765caba9eac6b17ebb6fd0feee77\x27></script></body>"></iframe>
                </div>
            `;
            document.body.appendChild(bottomContainer);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initFixes);
    } else {
        initFixes();
    }
})();

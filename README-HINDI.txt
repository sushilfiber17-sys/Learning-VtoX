LearningVtoX Website — Setup (Hindi)
=====================================

FILES
- index.html: website ka structure/content
- style.css: design, colors, responsive mobile layout
- script.js: PDF links, YouTube channel aur video links
- assets/learningvtox-logo.jpg: aapka diya hua logo
- assets/learningvtox-banner.jpg: aapka diya hua banner

LOCAL PREVIEW
1. ZIP extract karein.
2. Folder ko VS Code mein open karein.
3. index.html par right-click karke "Open with Live Server" use karein.
   Live Server nahi hai to index.html ko browser mein bhi khol sakte hain.

YOUTUBE CHANNEL LINK UPDATE
script.js open karein. Top par:
const CHANNEL_URL = "https://www.youtube.com/";
Is URL ko apne actual LearningVtoX channel URL se replace karein.

PDF LINK ADD KARNA
script.js mein resources list ke andar har item ka link:
link: "#"
Isko actual PDF URL se replace karein. Google Drive PDF use kar rahe hain to sharing
settings mein "Anyone with the link" viewer access set karein, phir share link paste karein.

LATEST YOUTUBE VIDEOS ADD KARNA
script.js mein videos list ke title, subject, description aur link update karein.
Latest video ke liye YouTube par Share > Copy link se URL paste karein.
Aap videos array mein jitne chahein items add kar sakte hain.

PUBLISH
GitHub Pages / Netlify par static website ke roop mein deploy kar sakte hain.
index.html, style.css, script.js aur assets folder ko ek saath upload karein.
IMPORTANT: assets folder ko mat hatana; logo/banner isi se load hote hain.

NOTE
Yeh frontend static website hai. PDF/video links aap manually script.js mein update karenge.
Admin login/dashboard ya automatic YouTube feed abhi included nahi hai.

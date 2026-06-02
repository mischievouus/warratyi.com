/**
 * WARRATYI ENGINE CORE MATRIX
 * Modular Processing Module
 */

// Global System Vectors Configuration
const defaultLinksData = [
    { text: 'Bandcamp Store', url: 'https://warratyi.bandcamp.com', icon: 'external-link' },
    { text: 'SoundCloud Portal', url: 'https://soundcloud.com/warratyi', icon: 'music-2' },
    { text: 'TikTok Video Feed', url: 'https://tiktok.com/@warratyi', icon: 'video' },
    { text: 'Contact', url: 'mailto:warratyi@always.invis.me', icon: 'mail' }
];

const lucideIconsList = [
    { label: 'External Link Arrow', value: 'external-link' },
    { label: 'Music Note 1', value: 'music-2' },
    { label: 'Music Note 2 (Disc)', value: 'music' },
    { label: 'Video Camera', value: 'video' },
    { label: 'Mail Envelope', value: 'mail' },
    { label: 'Globe World', value: 'globe' },
    { label: 'Message Chat', value: 'message-square' },
    { label: 'User Persona', value: 'user' }
];

// Initialize Modules on Load
window.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initTabsSystem();
    initLinksPanel();
    initActionListeners();
});

// --- UI NAVIGATION TAB MODULE ---
function initTabsSystem() {
    const tabButtons = ['intro', 'about', 'links', 'converter'];
    
    tabButtons.forEach(tabId => {
        const button = document.getElementById(`tab-btn-${tabId}`);
        button.addEventListener('click', () => {
            // Deactivate all panels and button styles
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            tabButtons.forEach(b => {
                document.getElementById(`tab-btn-${b}`).className = 
                    "px-3 py-2 text-neutral-500 hover:text-neutral-300 font-bold uppercase tracking-wider transition-colors duration-150";
            });

            // Activate Target Panel
            document.getElementById(`panel-${tabId}`).classList.add('active');
            button.className = "px-3 py-2 text-white font-bold uppercase tracking-wider transition-colors duration-150 bg-neutral-900 border border-neutral-800";
            
            // Clean viewports
            document.getElementById('outputWrapper').classList.add('hidden');
        });
    });
}

// --- CORE COMPILER ACTION LISTENERS ---
function initActionListeners() {
    document.getElementById('btn-strip-intro').addEventListener('click', () => adjustIntroParagraphs(-1));
    document.getElementById('btn-append-intro').addEventListener('click', () => adjustIntroParagraphs(1));
    document.getElementById('btn-compile-intro').addEventListener('click', compileIntroSection);
    
    document.getElementById('btn-remove-about').addEventListener('click', () => adjustAboutParagraphs(-1));
    document.getElementById('btn-add-about').addEventListener('click', () => adjustAboutParagraphs(1));
    document.getElementById('btn-compile-about').addEventListener('click', compileAboutSection);
    
    document.getElementById('btn-add-custom-link').addEventListener('click', () => addLinkNode('', '', 'external-link'));
    document.getElementById('btn-compile-links').addEventListener('click', compileLinksHub);
    
    document.getElementById('btn-convert-embed').addEventListener('click', convertEmbedCode);
    document.getElementById('btn-copy-code').addEventListener('click', copyCodeToClipboard);
}

// --- SUBMODULE 1: INTRO COMPILER ---
function adjustIntroParagraphs(direction) {
    const container = document.getElementById('introParagraphContainer');
    const currentBoxes = container.getElementsByClassName('intro-p-box');
    if (direction === 1) {
        const newParagraph = document.createElement('div');
        newParagraph.className = 'space-y-1.5 intro-p-box';
        newParagraph.innerHTML = `<span class="text-[10px] text-neutral-600 uppercase tracking-wider block">Paragraph ${currentBoxes.length + 1}</span>
            <textarea class="intro-paragraph-input w-full h-24 bg-[#050505] border border-neutral-900 p-3 text-xs text-neutral-300 rounded-none resize-none" placeholder="Enter text copy..."></textarea>`;
        container.appendChild(newParagraph);
    } else if (direction === -1 && currentBoxes.length > 1) {
        container.removeChild(currentBoxes[currentBoxes.length - 1]);
    }
}

function compileIntroSection() {
    const title = document.getElementById('projectTitle').value.trim() || 'Warratyi Black Label';
    const alignment = document.getElementById('alignmentRule').value;
    const textareas = document.getElementsByClassName('intro-paragraph-input');
    let pMarkup = '';
    for (let t of textareas) {
        if (t.value.trim()) pMarkup += `                 <p class="text-neutral-400 text-sm max-w-xl leading-relaxed">\n                    ${t.value.trim()}\n                </p>\n`;
    }
    const finalHtml = `            <div class="${alignment} space-y-4">\n                <h1 class="text-3xl md:text-4xl font-light tracking-tight text-white uppercase">\n                    ${title}\n                </h1>\n${pMarkup}            </div>`;
    updateGlobalOutput(finalHtml);
}

// --- SUBMODULE 2: ABOUT COMPILER ---
function adjustAboutParagraphs(direction) {
    const container = document.getElementById('paragraphContainer');
    const currentBoxes = container.getElementsByClassName('p-box');
    if (direction === 1) {
        const newParagraph = document.createElement('div');
        newParagraph.className = 'space-y-1.5 p-box';
        newParagraph.innerHTML = `<span class="text-[10px] text-neutral-600 uppercase tracking-wider block">Paragraph ${currentBoxes.length + 1}</span>
            <textarea class="paragraph-input w-full h-24 bg-[#050505] border border-neutral-900 p-3 text-xs text-neutral-300 rounded-none resize-none" placeholder="Enter copy narratives..."></textarea>`;
        container.appendChild(newParagraph);
    } else if (direction === -1 && currentBoxes.length > 1) {
        container.removeChild(currentBoxes[currentBoxes.length - 1]);
    }
}

function compileAboutSection() {
    const title = document.getElementById('sectionTitle').value.trim() || 'About the Project';
    const textareas = document.getElementsByClassName('paragraph-input');
    let pMarkup = '';
    for (let t of textareas) {
        if (t.value.trim()) pMarkup += `                <p>\n                    ${t.value.trim()}\n                </p>\n`;
    }
    const finalHtml = `        <!-- About Section -->\n        <section id="about" class="space-y-6 scroll-mt-24 border-t border-neutral-900 pt-12">\n            <div class="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold">\n                <i data-lucide="user" class="w-4 h-4"></i>\n                <h2>${title}</h2>\n            </div>\n            <div class="text-neutral-400 text-sm space-y-4 leading-relaxed max-w-2xl">\n${pMarkup}            </div>\n        </section>`;
    updateGlobalOutput(finalHtml);
}

// --- SUBMODULE 3: DYNAMIC LINK MATRIX ---
function initLinksPanel() {
    defaultLinksData.forEach(link => addLinkNode(link.text, link.url, link.icon));
}

function addLinkNode(text, url, currentIcon) {
    const container = document.getElementById('linksContainer');
    const node = document.createElement('div');
    node.className = 'link-node grid grid-cols-1 md:grid-cols-12 gap-3 pt-4 first:pt-0 items-end';

    let optionsMarkup = '';
    lucideIconsList.forEach(icon => {
        const selected = icon.value === currentIcon ? 'selected' : '';
        optionsMarkup += `<option value="${icon.value}" ${selected}>${icon.label}</option>`;
    });

    node.innerHTML = `
        <div class="md:col-span-3 space-y-1">
            <span class="text-[10px] text-neutral-600 uppercase tracking-wider block">Link Header</span>
            <input type="text" value="${text}" placeholder="Profile Hub" class="link-text-input w-full bg-[#050505] border border-neutral-900 p-2 text-xs text-neutral-200 rounded-none">
        </div>
        <div class="md:col-span-5 space-y-1">
            <span class="text-[10px] text-neutral-600 uppercase tracking-wider block">Target Endpoint URL</span>
            <input type="text" value="${url}" placeholder="https://..." class="link-url-input w-full bg-[#050505] border border-neutral-900 p-2 text-xs text-neutral-200 rounded-none">
        </div>
        <div class="md:col-span-3 space-y-1">
            <span class="text-[10px] text-neutral-600 uppercase tracking-wider block">Vector Icon</span>
            <select class="link-icon-input w-full bg-[#050505] border border-neutral-900 p-2 text-xs text-neutral-200 rounded-none cursor-pointer">
                ${optionsMarkup}
            </select>
        </div>
        <div class="md:col-span-1 pb-0.5">
            <button class="btn-delete-node w-full py-2 bg-neutral-950 border border-neutral-900 text-neutral-500 hover:text-red-400 hover:border-red-950 text-xs tracking-wider transition-colors uppercase font-bold rounded-none">X</button>
        </div>
    `;

    // Dynamic clean scope removal action setup
    node.querySelector('.btn-delete-node').addEventListener('click', () => node.remove());
    container.appendChild(node);
}

function compileLinksHub() {
    const nodes = document.getElementsByClassName('link-node');
    let linksGridMarkup = '';

    for (let node of nodes) {
        const titleText = node.querySelector('.link-text-input').value.trim();
        const targetUrl = node.querySelector('.link-url-input').value.trim();
        const vectorIcon = node.querySelector('.link-icon-input').value;

        if (titleText && targetUrl) {
            linksGridMarkup += `                <!-- ${titleText} Link -->
                <a href="${targetUrl}" target="_blank" class="glow-effect flex items-center justify-between p-4 bg-neutral-950 border border-neutral-900 hover:bg-neutral-900/40 text-sm group">
                    <span class="font-medium text-neutral-200 group-hover:text-white transition-colors">${titleText}</span>
                    <i data-lucide="${vectorIcon}" class="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors"></i>
                </a>\n\n`;
            }
    }

    const finalHtml = `            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">\n${linksGridMarkup}            </div>`;
    updateGlobalOutput(finalHtml);
}

// --- SUBMODULE 4: BANDCAMP PARAMETER REWRITER ---
function convertEmbedCode() {
    const input = document.getElementById('rawInput').value;
    if (!input.trim()) return;
    const srcMatch = input.match(/src="([^"]+)"/);
    const anchorMatch = input.match(/<a href="([^"]+)">([^<]+)<\/a>/);
    if (srcMatch) {
        let urlStr = srcMatch[1];
        urlStr = urlStr.replace(/bgcol=[^/&]+/, 'bgcol=0a0a0a').replace(/linkcol=[^/&]+/, 'linkcol=ffffff').replace(/size=[^/&]+/, 'size=large');
        if (!urlStr.includes('tracklist=')) urlStr += 'tracklist=false/'; else urlStr = urlStr.replace(/tracklist=[^/&]+/, 'tracklist=false');
        if (!urlStr.includes('artwork=')) urlStr += 'artwork=small/'; else urlStr = urlStr.replace(/artwork=[^/&]+/, 'artwork=small');
        let href = anchorMatch ? anchorMatch[1] : "https://bandcamp.com";
        let text = anchorMatch ? anchorMatch[2].trim() : "Warratyi Content Portal";
        const finalHtml = `<div class="w-full bg-[#0a0a0a] border border-neutral-900 p-2 rounded-none">\n    <iframe style="border: 0; width: 100%; height: 120px;" \n        src="${urlStr}" \n        seamless>\n        <a href="${href}">${text}</a>\n    </iframe>\n</div>`;
        updateGlobalOutput(finalHtml);
    } else { alert("Invalid structural code parsed."); }
}

// --- GLOBAL ENGINE VIEWPORT PIPELINES ---
function updateGlobalOutput(htmlContent) {
    document.getElementById('htmlOutput').value = htmlContent;
    document.getElementById('livePreview').innerHTML = htmlContent;
    document.getElementById('outputWrapper').classList.remove('hidden');
    lucide.createIcons();
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function copyCodeToClipboard() {
    const copyBtnText = document.getElementById("copyText");
    const outputField = document.getElementById("htmlOutput");
    outputField.select();
    outputField.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(outputField.value);
    outputField.classList.add('success-flash');
    copyBtnText.innerText = "Copied Setup!";
    setTimeout(() => {
        outputField.classList.remove('success-flash');
        copyBtnText.innerText = "Copy Code";
    }, 1500);
          }
                                                                 

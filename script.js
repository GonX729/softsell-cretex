document.getElementById('lead-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const company = document.getElementById('company').value;
    const licenseType = document.getElementById('license-type').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !company || !licenseType || !message) {
        alert('Please fill out all fields.');
        return;
    }

    alert('Thank you for your submission!');
    document.getElementById('lead-form').reset();
});

// Dark/Light mode toggle
(function() {
    const toggleBtn = document.getElementById('dark-mode-toggle');
    const html = document.documentElement;
    const darkIcon = '🌙';
    const lightIcon = '☀️';

    function setTheme(theme) {
        if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
            toggleBtn.textContent = lightIcon;
        } else {
            html.setAttribute('data-theme', 'light');
            toggleBtn.textContent = darkIcon;
        }
    }

    // Detect system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let theme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    setTheme(theme);

    toggleBtn.addEventListener('click', function() {
        theme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(theme);
        localStorage.setItem('theme', theme);
    });
})();

// Chat Widget Logic
(function() {
    function waitForElm(selector, cb) {
        const el = document.querySelector(selector);
        if (el) return cb(el);
        const obs = new MutationObserver(() => {
            const el = document.querySelector(selector);
            if (el) {
                obs.disconnect();
                cb(el);
            }
        });
        obs.observe(document.body, { childList: true, subtree: true });
    }

    waitForElm('#chat-open', function(chatOpenBtn) {
        const chatWidget = document.getElementById('chat-widget');
        const chatClose = document.getElementById('chat-close');
        const chatBody = document.getElementById('chat-body');
        const chatForm = document.getElementById('chat-form');
        const chatInput = document.getElementById('chat-input');
        const chatPresets = chatWidget.querySelectorAll('.chat-preset');

        // Open/close logic
        chatOpenBtn.onclick = function() {
            chatWidget.classList.add('open');
            chatOpenBtn.style.display = 'none';
            setTimeout(() => chatInput.focus(), 200);
        };
        chatClose.onclick = function() {
            chatWidget.classList.remove('open');
            chatOpenBtn.style.display = 'flex';
        };

        // Preset questions
        chatPresets.forEach(btn => {
            btn.onclick = function() {
                sendMessage(btn.textContent);
            };
        });

        // Form submit
        chatForm.onsubmit = function(e) {
            e.preventDefault();
            const msg = chatInput.value.trim();
            if (!msg) return;
            sendMessage(msg);
        };

        function sendMessage(msg) {
            appendMessage('user', msg);
            chatInput.value = '';
            setTimeout(() => reply(msg), 600);
        }

        function appendMessage(sender, text) {
            const div = document.createElement('div');
            div.className = 'chat-message ' + sender;
            div.textContent = text;
            chatBody.appendChild(div);
            chatBody.scrollTop = chatBody.scrollHeight;
        }

        // Mocked responses
        function reply(msg) {
            let response = '';
            const q = msg.toLowerCase();
            if (q.includes('how') && q.includes('sell')) {
                response = 'Just click "Get a Quote" and fill out the form. We handle the rest!';
            } else if (q.includes('types') && (q.includes('license') || q.includes('licenses'))) {
                response = 'You can sell most software and cloud licenses. Contact us for specifics!';
            } else if (q.includes('payment')) {
                response = 'Payment is usually processed within 1 business day after approval.';
            } else if (q.includes('hello') || q.includes('hi')) {
                response = 'Hello! How can I assist you today?';
            } else {
                response = "Sorry, I don't have an answer for that yet. Please use the contact form for more help.";
            }
            appendMessage('bot', response);
        }
    });
})();

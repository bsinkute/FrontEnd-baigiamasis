export function loadFooter() {
    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById('footer-placeholder').innerHTML = `
            <footer class="footer">
                <p>&copy; 2024 Notee. All rights reserved.</p>
                <p>
                    <a href="./main.html">Main Page</a> |
                    <a href="./notes.html">My Notes</a> |
                    <a href="./contacts.html">Contacts</a>
                </p>
                <div class="social-media">
                    <a href="" target="_blank"> <img class="icon" src="./img/social media/icons8-facebook-16.svg" alt="facebook"></a>
                    <a href="" target="_blank"><img class="icon" src="./img/social media/icons8-instagram-16.svg" alt="instagram"></a>
                    <a href="" target="_blank"><img class="icon" src="./img/social media/icons8-pinterest-16.svg" alt="pinterest"></a>
                </div>
            </footer>
        `;
    });
}
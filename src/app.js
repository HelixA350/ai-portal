// Single Page Application with client-side routing
class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = null;
        
        // Define routes
        this.addRoute('/', this.renderHome.bind(this));
        this.addRoute('/agents/tender-analysis', this.renderTenderAnalysisAgent.bind(this));
        this.addRoute('/agents/document-extraction', this.renderDocumentExtractionAgent.bind(this));
        
        // Listen for navigation events
        window.addEventListener('popstate', this.handlePopState.bind(this));
        document.addEventListener('click', this.handleClick.bind(this));
        
        // Initialize the router
        this.navigateTo(window.location.pathname || '/');
    }
    
    addRoute(path, handler) {
        this.routes[path] = handler;
    }
    
    navigateTo(path) {
        // Update browser history
        history.pushState({}, '', path);
        
        // Render the route
        this.renderRoute(path);
    }
    
    renderRoute(path) {
        const handler = this.routes[path];
        if (handler) {
            this.currentRoute = path;
            handler();
        } else {
            // Redirect to home if route not found
            this.navigateTo('/');
        }
    }
    
    handlePopState(event) {
        this.renderRoute(window.location.pathname);
    }
    
    handleClick(event) {
        // Check if the clicked element is a link
        const target = event.target.closest('a');
        if (target && target.href) {
            const url = new URL(target.href);
            const path = url.pathname;
            
            // Only handle internal links (same origin)
            if (url.origin === window.location.origin && this.routes[path]) {
                event.preventDefault();
                this.navigateTo(path);
            }
        }
    }
    
    // Navigation helper methods
    navigateToTenderAnalysis() {
        this.navigateTo('/agents/tender-analysis');
    }
    
    navigateToDocumentExtraction() {
        this.navigateTo('/agents/document-extraction');
    }
    
    // Route handlers
    renderHome() {
        document.title = 'Умные агенты для вашей работы';
        
        const app = document.getElementById('app');
        app.innerHTML = `
            ${this.renderHeader()}
            <main class="main">
                <div class="container">
                    <section class="hero">
                        <h1>Умные агенты для вашей работы</h1>
                        <p class="hero-subtitle">Автоматизируйте рутину, принимайте решения быстрее и точнее</p>
                    </section>
                    
                    <section class="page-section">
                        <p class="intro-text">Наши ИИ-агенты созданы для того, чтобы экономить ваше время, снижать риски и повышать качество работы с тендерами. Просто загрузите документ или вставьте ссылку — всё остальное сделает интеллектуальный помощник.</p>
                    </section>
                    
                    <section class="page-section">
                        <h2>Каталог агентов</h2>
                        <div class="agents-grid">
                            <div class="agent-card">
                                <span class="agent-icon">🔍</span>
                                <h3 class="agent-title">Агент первичного анализа тендера</h3>
                                <p class="agent-description">Быстро оцените, стоит ли участвовать</p>
                                <div class="agent-actions">
                                    <a href="/agents/tender-analysis" class="agent-action-link">[Подробнее]</a>
                                    <a href="/agents/tender-analysis" class="agent-action-link">[Перейти к агенту]</a>
                                </div>
                            </div>
                            
                            <div class="agent-card">
                                <span class="agent-icon">📄</span>
                                <h3 class="agent-title">Агент извлечения данных из ТЗ</h3>
                                <p class="agent-description">Превратите PDF в структурированное задание за секунды</p>
                                <div class="agent-actions">
                                    <a href="/agents/document-extraction" class="agent-action-link">[Подробнее]</a>
                                    <a href="/agents/document-extraction" class="agent-action-link">[Перейти к агенту]</a>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <section class="quote-section">
                        <p class="quote-text">Работайте умнее, а не усерднее...</p>
                        <p class="quote-author">Наши ИИ-агенты берут на себя рутинный анализ, чтобы вы могли сосредоточиться на стратегии и принятии решений.</p>
                    </section>
                </div>
            </main>
            ${this.renderFooter()}
        `;
        
        this.updateActiveNavLinks();
    }
    
    renderTenderAnalysisAgent() {
        document.title = 'Первичный анализ тендера | Умные агенты';
        
        const app = document.getElementById('app');
        app.innerHTML = `
            ${this.renderHeader()}
            <main class="main">
                <div class="container">
                    <section class="agent-page-header">
                        <h1>Первичный анализ тендера</h1>
                        <p class="agent-page-subtitle">Быстрая оценка участия — без лишних усилий</p>
                    </section>
                    
                    <section class="page-section">
                        <p>Наш агент помогает вам принимать обоснованные решения по участию в тендерах уже на первом этапе. Он учитывает:</p>
                        
                        <ul class="features-list">
                            <li>Тип закупки и её соответствие вашему профилю</li>
                            <li>Географию и масштаб работ</li>
                            <li>Надёжность заказчика (при наличии ОГРН) — проверка по реестрам, история закупок, судебные риски</li>
                            <li>Ключевые «красные флаги»: нереалистичные сроки, нестандартные требования, подозрительные условия оплаты</li>
                        </ul>
                    </section>
                    
                    <section class="page-section">
                        <h2>Как это работает:</h2>
                        <ol class="steps-list">
                            <li>Вставьте ссылку на тендер на любой площадке РФ</li>
                            <li>Укажите ОГРН заказчика (опционально, но рекомендуется)</li>
                            <li>Получите структурированный отчёт с вердиктом: ✅ Участвовать / ⚠️ Рискованно / ❌ Не рекомендуется</li>
                        </ol>
                    </section>
                    
                    <div class="agent-footer">
                        Экономьте часы работы — получайте решение за минуты.
                    </div>
                </div>
            </main>
            ${this.renderFooter()}
        `;
        
        this.updateActiveNavLinks();
    }
    
    renderDocumentExtractionAgent() {
        document.title = 'Извлечение данных из ТЗ | Умные агенты';
        
        const app = document.getElementById('app');
        app.innerHTML = `
            ${this.renderHeader()}
            <main class="main">
                <div class="container">
                    <section class="agent-page-header">
                        <h1>Извлечение данных из ТЗ</h1>
                        <p class="agent-page-subtitle">От PDF — к готовому рабочему документу</p>
                    </section>
                    
                    <section class="page-section">
                        <p>Технические задания часто приходят в виде многостраничных PDF-файлов, где важная информация спрятана между строк. Наш агент делает из хаоса порядок:</p>
                        
                        <ul class="features-list">
                            <li>Автоматически распознаёт структуру документа</li>
                            <li>Выделяет ключевые разделы: предмет закупки, требования к участникам, сроки, критерии оценки, перечень документов</li>
                            <li>Формирует чёткий, пунктуальный отчёт в понятном формате</li>
                            <li>Позволяет скачать результат в Word для дальнейшей работы или передачи коллегам</li>
                        </ul>
                    </section>
                    
                    <section class="page-section">
                        <h2>Подходит для:</h2>
                        <ul class="categories-list">
                            <li>Быстрой подготовки коммерческого предложения</li>
                            <li>Согласования условий внутри команды</li>
                            <li>Архивирования структурированных данных по тендерам</li>
                        </ul>
                    </section>
                    
                    <div class="agent-footer">
                        Загрузите PDF — получите ясность.
                    </div>
                </div>
            </main>
            ${this.renderFooter()}
        `;
        
        this.updateActiveNavLinks();
    }
    
    renderHeader() {
        return `
            <header class="header">
                <div class="container">
                    <nav class="navbar">
                        <a href="/" class="logo">AI Agents</a>
                        <div class="nav-links">
                            <a href="/" class="nav-link">Главная</a>
                            <a href="/agents/tender-analysis" class="nav-link">Анализ тендера</a>
                            <a href="/agents/document-extraction" class="nav-link">Извлечение данных</a>
                        </div>
                    </nav>
                </div>
            </header>
        `;
    }
    
    renderFooter() {
        return `
            <footer class="footer">
                <div class="container">
                    <p>© 2026 Умные агенты для вашей работы. Все права защищены.</p>
                </div>
            </footer>
        `;
    }
    
    updateActiveNavLinks() {
        // Remove active class from all nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to current page link
        const currentPageLink = document.querySelector(`a[href="${this.currentRoute}"]`);
        if (currentPageLink) {
            currentPageLink.classList.add('active');
        }
        
        // Special case for home page
        if (this.currentRoute === '/') {
            const homeLink = document.querySelector('a[href="/"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
        }
    }
}

// Initialize the router when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.router = new Router();
});
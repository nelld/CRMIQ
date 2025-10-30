/**
 * CRM IQ Components Loader - Standalone Version
 * Components embedded directly (no fetch required)
 * Works on GitHub Pages and local file:// protocol
 */

const CRMComponents = {
    // Embedded component templates
    templates: {
        'app-header': `<!-- App Header Component -->
<header class="header">
    <div class="header-content">
        <div class="left-section">
            <img src="images/crm-iq-logo.png" alt="CRM IQ" class="logo">
            <nav class="nav-menu">
                <div class="nav-item">
                    <span>Dashboards</span>
                    <i class="fas fa-caret-down"></i>
                </div>
                <div class="nav-item">
                    <span>Reports</span>
                    <i class="fas fa-caret-down"></i>
                </div>
                <div class="nav-item">
                    <span>Communications</span>
                    <i class="fas fa-caret-down"></i>
                </div>
                <button class="nav-grid-btn">
                    <i class="fas fa-th"></i>
                </button>
            </nav>
            <div class="left-actions">
                <div class="search-section">
                    <div class="search-container">
                        <input type="text" class="search-input" placeholder="Search...">
                        <button class="search-btn">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </div>
                <button class="add-new-btn">
                    <span>Add New</span>
                    <i class="fas fa-caret-down"></i>
                </button>
                <button class="action-btn calendar-btn">
                    <i class="fas fa-calendar-alt"></i>
                </button>
                <button class="action-btn calculator-btn">
                    <i class="fas fa-calculator"></i>
                </button>
            </div>
        </div>
        
        <div class="header-actions">
            <button class="action-btn star-btn">
                <i class="fas fa-star" style="font-size: 18px;"></i>
            </button>
            <button class="action-btn help-btn">
                <i class="fas fa-question-circle" style="font-size: 18px;"></i>
            </button>
            <button class="action-btn notification-btn">
                <i class="fas fa-bell" style="font-size: 18px;"></i>
            </button>
            <button class="action-btn settings-btn">
                <i class="fas fa-cog" style="font-size: 18px;"></i>
            </button>
            <div class="user-profile">
                <div class="user-avatar">ND</div>
            </div>
        </div>
    </div>
</header>`,

        'breadcrumb': `<!-- Breadcrumb Component -->
<div class="breadcrumb">
    <div class="breadcrumb-content" id="breadcrumb-content">
        <!-- Breadcrumb will be dynamically populated -->
    </div>
    <i class="fas fa-info-circle info-icon"></i>
</div>`,

        'page-header': `<!-- Page Header Component -->
<div class="page-header">
    <div class="title-section" id="page-header-title">
        <h1 class="page-title mr-0">Page Title</h1>
    </div>
    
    <div class="flex items-center gap-3" id="page-header-actions">
        <!-- Actions will be dynamically populated -->
    </div>
</div>`,

        'tabs': `<!-- Tabs Component -->
<div class="tabs-container">
    <div class="tabs" id="tabs-content">
        <!-- Tabs will be dynamically populated -->
    </div>
</div>`
    },

    /**
     * Load a component from embedded templates
     */
    loadComponent(componentName) {
        return this.templates[componentName] || null;
    },

    /**
     * Initialize the app header component
     */
    initAppHeader(containerId = 'app-header-container') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const html = this.loadComponent('app-header');
        if (html) {
            container.innerHTML = html;
        }
    },

    /**
     * Initialize the breadcrumb component
     * @param {string} containerId - Container element ID
     * @param {string} breadcrumbData - Pipe-separated breadcrumb items
     */
    initBreadcrumb(containerId = 'breadcrumb-container', breadcrumbData = null) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const html = this.loadComponent('breadcrumb');
        if (html) {
            container.innerHTML = html;

            // Parse breadcrumb data
            const data = breadcrumbData || container.dataset.breadcrumb || '';
            if (data) {
                const items = data.split('|');
                this.renderBreadcrumb(items);
            }
        }
    },

    /**
     * Render breadcrumb items
     */
    renderBreadcrumb(items) {
        const content = document.getElementById('breadcrumb-content');
        if (!content) return;

        const html = items.map((item, index) => {
            const isLast = index === items.length - 1;
            if (isLast) {
                return item;
            } else {
                return `<a href="#">${item}</a> <span class="breadcrumb-separator">/</span> `;
            }
        }).join('');

        content.innerHTML = html;
    },

    /**
     * Initialize the page header component
     * @param {Object} config - Configuration object
     */
    initPageHeader(config = {}) {
        const {
            containerId = 'page-header-container',
            title = 'Page Title',
            subtitle = null,
            badges = [],
            actionsHtml = '',
            hasBreadcrumb = false
        } = config;

        const container = document.getElementById(containerId);
        if (!container) return;

        const html = this.loadComponent('page-header');
        if (html) {
            container.innerHTML = html;

            // Add positioning class
            const pageHeader = container.querySelector('.page-header');
            if (pageHeader) {
                pageHeader.classList.add(hasBreadcrumb ? 'with-breadcrumb' : 'no-breadcrumb');
            }

            // Set title
            const titleSection = document.getElementById('page-header-title');
            if (titleSection) {
                let titleHtml = `<h1 class="page-title mr-0">${title}</h1>`;
                
                if (badges.length > 0) {
                    const badgesHtml = badges.map(badge => 
                        `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-${badge.color}-100 text-${badge.color}-800">${badge.text}</span>`
                    ).join('');
                    titleHtml = `
                        <div class="title-with-badges">
                            <h1 class="page-title mr-0">${title}</h1>
                            <div class="badges-container">${badgesHtml}</div>
                        </div>
                    `;
                }

                if (subtitle) {
                    titleHtml += `<div class="flex items-center gap-2 text-muted text-sm">${subtitle}</div>`;
                }

                titleSection.innerHTML = titleHtml;
            }

            // Set actions
            const actionsSection = document.getElementById('page-header-actions');
            if (actionsSection && actionsHtml) {
                actionsSection.innerHTML = actionsHtml;
            }
        }
    },

    /**
     * Initialize the tabs component
     * @param {Object} config - Configuration object
     */
    initTabs(config = {}) {
        const {
            containerId = 'tabs-container',
            tabs = [],
            activeIndex = 0,
            hasBreadcrumb = false,
            onChange = null
        } = config;

        const container = document.getElementById(containerId);
        if (!container) return;

        const html = this.loadComponent('tabs');
        if (html) {
            container.innerHTML = html;

            // Add positioning class
            const tabsContainer = container.querySelector('.tabs-container');
            if (tabsContainer) {
                tabsContainer.classList.add(hasBreadcrumb ? 'sticky-with-breadcrumb' : 'sticky-no-breadcrumb');
            }

            // Parse tabs from data attribute if not provided
            const tabData = tabs.length > 0 ? tabs : (container.dataset.tabs || '').split('|').filter(t => t);

            // Render tabs
            this.renderTabs(tabData, activeIndex, onChange);
        }
    },

    /**
     * Render tab buttons
     */
    renderTabs(tabs, activeIndex, onChange) {
        const content = document.getElementById('tabs-content');
        if (!content) return;

        const html = tabs.map((tab, index) => {
            const isActive = index === activeIndex;
            return `<button class="tab ${isActive ? 'active' : ''}" data-tab-index="${index}">${tab}</button>`;
        }).join('');

        content.innerHTML = html;

        // Add click handlers
        content.querySelectorAll('.tab').forEach((button, index) => {
            button.addEventListener('click', () => {
                // Remove active class from all tabs
                content.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                button.classList.add('active');
                
                // Call onChange callback if provided
                if (onChange && typeof onChange === 'function') {
                    onChange(index, tabs[index]);
                }
            });
        });
    },

    /**
     * Initialize all components on the page
     * @param {Object} config - Configuration for all components
     */
    initAll(config = {}) {
        const {
            appHeader = true,
            breadcrumb = null,
            pageHeader = null,
            tabs = null
        } = config;

        // Load components in order
        if (appHeader) {
            this.initAppHeader();
        }

        if (breadcrumb) {
            this.initBreadcrumb(breadcrumb.containerId, breadcrumb.data);
        }

        if (pageHeader) {
            this.initPageHeader(pageHeader);
        }

        if (tabs) {
            this.initTabs(tabs);
        }
    }
};

// Make available globally
window.CRMComponents = CRMComponents;


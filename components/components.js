/**
 * CRM IQ Components Loader
 * Dynamically loads and initializes reusable HTML components
 */

const CRMComponents = {
    /**
     * Load a component from the components directory
     */
    async loadComponent(componentName) {
        try {
            const response = await fetch(`components/${componentName}.html`);
            if (!response.ok) {
                throw new Error(`Failed to load component: ${componentName}`);
            }
            return await response.text();
        } catch (error) {
            console.error(`Error loading component ${componentName}:`, error);
            return null;
        }
    },

    /**
     * Initialize the app header component
     */
    async initAppHeader(containerId = 'app-header-container') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const html = await this.loadComponent('app-header');
        if (html) {
            container.innerHTML = html;
        }
    },

    /**
     * Initialize the breadcrumb component
     * @param {string} containerId - Container element ID
     * @param {string} breadcrumbData - Pipe-separated breadcrumb items
     */
    async initBreadcrumb(containerId = 'breadcrumb-container', breadcrumbData = null) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const html = await this.loadComponent('breadcrumb');
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
    async initPageHeader(config = {}) {
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

        const html = await this.loadComponent('page-header');
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
    async initTabs(config = {}) {
        const {
            containerId = 'tabs-container',
            tabs = [],
            activeIndex = 0,
            hasBreadcrumb = false,
            onChange = null
        } = config;

        const container = document.getElementById(containerId);
        if (!container) return;

        const html = await this.loadComponent('tabs');
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
    async initAll(config = {}) {
        const {
            appHeader = true,
            breadcrumb = null,
            pageHeader = null,
            tabs = null
        } = config;

        // Load components in order
        if (appHeader) {
            await this.initAppHeader();
        }

        if (breadcrumb) {
            await this.initBreadcrumb(breadcrumb.containerId, breadcrumb.data);
        }

        if (pageHeader) {
            await this.initPageHeader(pageHeader);
        }

        if (tabs) {
            await this.initTabs(tabs);
        }
    }
};

// Make available globally
window.CRMComponents = CRMComponents;



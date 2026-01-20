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
     * Initialize the side navigation component
     * @param {Object} config - Configuration object
     */
    async initSideNav(config = {}) {
        const {
            containerId = 'sidenav-container',
            items = [],
            collapsed = false,
            activeIndex = 0,
            onChange = null
        } = config;

        const container = document.getElementById(containerId);
        if (!container) return;

        const html = await this.loadComponent('sidenav');
        if (html) {
            container.innerHTML = html;

            // Get the sidenav element
            const sidenav = container.querySelector('.sidenav');
            if (sidenav && collapsed) {
                sidenav.classList.add('collapsed');
            }

            // Add toggle button if configured
            if (config.toggleButton !== false) {
                const toggleBtn = document.createElement('button');
                toggleBtn.className = 'sidenav-toggle';
                toggleBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
                toggleBtn.addEventListener('click', () => {
                    sidenav.classList.toggle('collapsed');
                    // Toggle main content margin
                    const mainContent = document.querySelector('.has-sidenav');
                    if (mainContent) {
                        mainContent.classList.toggle('sidenav-collapsed');
                    }
                });
                sidenav.appendChild(toggleBtn);
            }

            // Render navigation items
            if (items.length > 0) {
                this.renderSideNavItems(items, activeIndex, onChange);
            }

            // Add mobile overlay
            this.addSideNavMobileOverlay(container);
        }
    },

    /**
     * Render side navigation items
     */
    renderSideNavItems(items, activeIndex, onChange) {
        const content = document.getElementById('sidenav-content');
        if (!content) return;

        const html = items.map((item, index) => {
            if (item.type === 'divider') {
                return '<div class="sidenav-divider"></div>';
            }

            if (item.type === 'group') {
                const groupHtml = `
                    <div class="sidenav-group">
                        ${item.title ? `<div class="sidenav-group-title">${item.title}</div>` : ''}
                        ${item.items ? item.items.map((subItem, subIndex) => {
                            const isActive = subItem.active || (activeIndex === `${index}-${subIndex}`);
                            const badge = subItem.badge ? `<span class="sidenav-badge">${subItem.badge}</span>` : '';
                            const expandIcon = subItem.submenu ? '<i class="fas fa-chevron-right sidenav-item-expand"></i>' : '';
                            
                            let submenuHtml = '';
                            if (subItem.submenu) {
                                submenuHtml = `
                                    <div class="sidenav-submenu">
                                        ${subItem.submenu.map(submenuItem => `
                                            <a href="${submenuItem.href || '#'}" class="sidenav-item ${submenuItem.active ? 'active' : ''}" data-nav-id="${submenuItem.id || ''}">
                                                <i class="${submenuItem.icon || 'fas fa-circle'}"></i>
                                                <span class="sidenav-item-text">${submenuItem.label}</span>
                                            </a>
                                        `).join('')}
                                    </div>
                                `;
                            }
                            
                            return `
                                <a href="${subItem.href || '#'}" class="sidenav-item ${isActive ? 'active' : ''}" data-nav-id="${subItem.id || ''}" data-nav-index="${index}-${subIndex}">
                                    <i class="${subItem.icon}"></i>
                                    <span class="sidenav-item-text">${subItem.label}</span>
                                    ${badge}
                                    ${expandIcon}
                                </a>
                                ${submenuHtml}
                            `;
                        }).join('') : ''}
                    </div>
                `;
                return groupHtml;
            }

            // Regular item
            const isActive = item.active || (activeIndex === index);
            const badge = item.badge ? `<span class="sidenav-badge">${item.badge}</span>` : '';
            return `
                <a href="${item.href || '#'}" class="sidenav-item ${isActive ? 'active' : ''}" data-nav-id="${item.id || ''}" data-nav-index="${index}">
                    <i class="${item.icon}"></i>
                    <span class="sidenav-item-text">${item.label}</span>
                    ${badge}
                </a>
            `;
        }).join('');

        content.innerHTML = html;

        // Add click handlers
        content.querySelectorAll('.sidenav-item').forEach((item) => {
            item.addEventListener('click', (e) => {
                // Handle submenu expansion
                if (item.querySelector('.sidenav-item-expand')) {
                    e.preventDefault();
                    item.classList.toggle('expanded');
                    const submenu = item.nextElementSibling;
                    if (submenu && submenu.classList.contains('sidenav-submenu')) {
                        submenu.classList.toggle('expanded');
                    }
                    return;
                }

                // Remove active class from all items
                content.querySelectorAll('.sidenav-item').forEach(i => i.classList.remove('active'));
                // Add active class to clicked item
                item.classList.add('active');
                
                // Call onChange callback if provided
                if (onChange && typeof onChange === 'function') {
                    const navIndex = item.dataset.navIndex;
                    const navId = item.dataset.navId;
                    onChange(navIndex, navId, item);
                }
            });
        });
    },

    /**
     * Add mobile overlay for sidenav
     */
    addSideNavMobileOverlay(container) {
        const overlay = document.createElement('div');
        overlay.className = 'sidenav-overlay';
        overlay.addEventListener('click', () => {
            const sidenav = container.querySelector('.sidenav');
            if (sidenav) {
                sidenav.classList.remove('mobile-open');
                overlay.classList.remove('active');
            }
        });
        document.body.appendChild(overlay);
    },

    /**
     * Toggle mobile sidenav
     */
    toggleMobileSideNav(containerId = 'sidenav-container') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const sidenav = container.querySelector('.sidenav');
        const overlay = document.querySelector('.sidenav-overlay');
        
        if (sidenav) {
            sidenav.classList.toggle('mobile-open');
        }
        if (overlay) {
            overlay.classList.toggle('active');
        }
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
            tabs = null,
            sideNav = null
        } = config;

        // Load components in order
        if (appHeader) {
            await this.initAppHeader();
        }

        if (breadcrumb) {
            await this.initBreadcrumb(breadcrumb.containerId, breadcrumb.data);
        }

        if (sideNav) {
            await this.initSideNav(sideNav);
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


